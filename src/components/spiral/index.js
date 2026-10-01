import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    m,
    useMotionValue,
    useMotionValueEvent,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
} from 'framer-motion';

import projectsData from '../../data/projects.json';
import { sortNewestFirst } from '../../utils/projects';
import useWindowDimensions from '../../hooks/useWindowDimensions';

import '../../styles/Spiral.css';

const PROJECTS = sortNewestFirst(projectsData);
const COUNT = PROJECTS.length;
const STEP = 60;                       // degrees between neighbouring cards: 6 per turn, so 12 cards make two turns
const ELEVATION = 0.2;                // how far the camera sits above the ring: back cards rise by z * ELEVATION
const RUNWAY_PER_CARD_VH = 42;         // scroll distance that moves the spiral by one card

const DEG = Math.PI / 180;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const lerp = (a, b, mix) => a + (b - a) * mix;

// Geometry per breakpoint: helix radius, vertical rise per card, card size.
const geometryFor = (width) => {
    if (width < 640) return { radius: 210, rise: 36, cardWidth: 220, cardHeight: 138, perspective: 900 };
    if (width < 1024) return { radius: 330, rise: 48, cardWidth: 300, cardHeight: 188, perspective: 1100 };
    return { radius: 460, rise: 60, cardWidth: 380, cardHeight: 238, perspective: 1400 };
};

const SpiralCard = ({ project, index, progress, mix, geometry, isActive, onSelect }) => {
    const { radius, rise, cardHeight } = geometry;

    // Everything derives from `t`: how many cards this one sits from the active position.
    const stepsFromActive = (p) => index - p * (COUNT - 1);

    const transform = useTransform([progress, mix], ([p, listMix]) => {
        const t = stepsFromActive(p);
        const theta = t * STEP;
        const rad = theta * DEG;

        // Helix placement: front card at z = 0, others wind up and back around the axis.
        // Seen from slightly above, so cards at the back of the ring sit higher on screen.
        const depth = Math.cos(rad) * radius - radius;
        const spiral = {
            x: Math.sin(rad) * radius,
            y: -t * rise + depth * ELEVATION,
            z: depth,
            rotate: theta,
            scale: 1 + 0.06 * Math.max(0, 1 - Math.abs(t)) - 0.04 * Math.min(Math.abs(t), 3),
        };

        // List placement: a vertical filmstrip that shrinks away from the centre.
        const list = {
            x: 0,
            y: t * (cardHeight * 0.9 + 24),
            z: 0,
            rotate: 0,
            scale: 1 - Math.min(Math.abs(t), 4) * 0.1,
        };

        const x = lerp(spiral.x, list.x, listMix);
        const y = lerp(spiral.y, list.y, listMix);
        const z = lerp(spiral.z, list.z, listMix);
        const rotate = lerp(spiral.rotate, list.rotate, listMix);
        const scale = lerp(spiral.scale, list.scale, listMix);

        const tilt = -6 * (1 - listMix);
        return `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotate}deg) rotateX(${tilt}deg) scale(${scale})`;
    });

    const opacity = useTransform([progress, mix], ([p, listMix]) => {
        const t = stepsFromActive(p);
        const depth = Math.cos(t * STEP * DEG) * radius - radius;      // 0 at the front, -2R at the back
        // Cards dim as they go round the back but never vanish; only very distant turns fade out.
        const depthFade = lerp(1, 0.72, -depth / (2 * radius));
        const farFade = Math.abs(t) <= 5 ? 1 : clamp(1 - (Math.abs(t) - 5) / 2, 0, 1);
        const spiralOpacity = depthFade * farFade;
        // In list mode the cards above (already seen) fade faster than the ones still to come.
        const listOpacity = t < 0
            ? clamp(1 - (Math.abs(t) - 0.6) / 0.8, 0, 1)
            : clamp(1 - (t - 0.9) / 1.1, 0, 1);
        return lerp(spiralOpacity, listOpacity, listMix);
    });

    const filter = useTransform([progress, mix], ([p, listMix]) => {
        const t = stepsFromActive(p);
        const depth = Math.cos(t * STEP * DEG) * radius - radius;
        const brightness = lerp(lerp(1, 0.7, -depth / (2 * radius)), clamp(1 - Math.abs(t) * 0.15, 0.5, 1), listMix);
        return `brightness(${brightness})`;
    });

    const visibility = useTransform(opacity, (value) => (value <= 0.01 ? 'hidden' : 'visible'));

    // Cards are stacked as flat layers ordered by depth, so a tilted neighbour never cuts through the front card.
    const zIndex = useTransform([progress, mix], ([p, listMix]) => {
        const t = stepsFromActive(p);
        const spiralDepth = Math.cos(t * STEP * DEG) * radius - radius;
        const listDepth = -Math.abs(t) * 40;
        return Math.round(1000 + lerp(spiralDepth, listDepth, listMix));
    });

    const link = project.links[0];

    const number = String(index + 1).padStart(2, '0');

    return (
        <m.div
            className={`spiral-card ${isActive ? 'active' : ''}`}
            style={{
                transform,
                visibility,
                zIndex,
                width: geometry.cardWidth,
                height: cardHeight,
                marginLeft: -geometry.cardWidth / 2,
                marginTop: -cardHeight / 2,
            }}
            onClick={() => onSelect(index)}
            role="button"
            tabIndex={-1}
            aria-label={isActive && link ? `Open ${project.name}` : `Show ${project.name}`}
            aria-hidden={!isActive}
        >
            {/* Opacity and filter live on the faces: on the wrapper they would flatten its 3D context and break backface-visibility. */}
            <m.div className="spiral-face spiral-face-front" style={{ opacity, filter }}>
                <img
                    src={require(`../../assets/projects/project${project.id}.png`)}
                    alt=""
                    draggable="false"
                />
                <span className="spiral-card-index">{number}</span>
                <span className="spiral-card-year">{project.date.split(',')[0]}</span>
                <span className="spiral-card-name">{project.name}</span>
            </m.div>

            <m.div className="spiral-face spiral-face-back" style={{ opacity, filter }}>
                <span className="spiral-back-wordmark">PV<span>.</span></span>
                <span className="spiral-card-index">{number}</span>
                <span className="spiral-back-name">{project.name}</span>
            </m.div>
        </m.div>
    );
};

const ProjectSpiral = ({ projectsRef, children }) => {
    const sectionRef = useRef(null);
    const stageRef = useRef(null);
    const { width } = useWindowDimensions();
    const geometry = useMemo(() => geometryFor(width), [width]);
    const reducedMotion = useReducedMotion();

    const [mode, setMode] = useState('spiral');
    const [active, setActive] = useState(0);

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.5 });
    const progress = reducedMotion ? scrollYProgress : smoothProgress;

    // 0 = spiral layout, 1 = list layout; animated so the cards glide between the two.
    const modeValue = useMotionValue(0);
    const smoothMode = useSpring(modeValue, { stiffness: 120, damping: 22 });
    const mix = reducedMotion ? modeValue : smoothMode;

    useEffect(() => {
        modeValue.set(mode === 'list' ? 1 : 0);
    }, [mode, modeValue]);

    useMotionValueEvent(scrollYProgress, 'change', (value) => {
        setActive(clamp(Math.round(value * (COUNT - 1)), 0, COUNT - 1));
    });

    const scrollToIndex = useCallback((index) => {
        const section = sectionRef.current;
        if (!section) return;
        const top = section.getBoundingClientRect().top + window.scrollY;
        const runway = section.offsetHeight - window.innerHeight;
        const target = top + (clamp(index, 0, COUNT - 1) / (COUNT - 1)) * runway;
        window.scrollTo({ top: target, behavior: reducedMotion ? 'auto' : 'smooth' });
    }, [reducedMotion]);

    const handleSelect = useCallback((index) => {
        if (index === active) {
            const link = PROJECTS[index].links[0];
            if (link) window.open(link.url, '_blank', 'noopener,noreferrer');
            return;
        }
        scrollToIndex(index);
    }, [active, scrollToIndex]);

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            event.preventDefault();
            scrollToIndex(active + 1);
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            event.preventDefault();
            scrollToIndex(active - 1);
        }
    };

    const current = PROJECTS[active];
    const currentLink = current.links[0];

    return (
        <section
            className={`spiral-section mode-${mode}`}
            ref={sectionRef}
            style={{ height: `calc(100vh + ${COUNT * RUNWAY_PER_CARD_VH}vh)` }}
        >
            <div className="spiral-sticky">
                <div className="container spiral-layout">
                    <div className="spiral-copy">{children}</div>

                    <div className="spiral-stage-wrap">
                        <div className="spiral-toggle" role="tablist" aria-label="Layout">
                            <button
                                role="tab"
                                aria-selected={mode === 'spiral'}
                                className={mode === 'spiral' ? 'active' : ''}
                                onClick={() => setMode('spiral')}
                            >
                                Spiral
                            </button>
                            <button
                                role="tab"
                                aria-selected={mode === 'list'}
                                className={mode === 'list' ? 'active' : ''}
                                onClick={() => setMode('list')}
                            >
                                List
                            </button>
                        </div>

                        <div
                            className="spiral-stage"
                            ref={stageRef}
                            style={{ perspective: geometry.perspective }}
                            tabIndex={0}
                            onKeyDown={handleKeyDown}
                            aria-label="Project carousel. Use arrow keys to rotate."
                        >
                            <div className="spiral-scene">
                                <div
                                    className="spiral-spine"
                                    style={{
                                        transform: `translate3d(-50%, -50%, ${-geometry.radius}px)`,
                                        zIndex: Math.round(1000 - geometry.radius),
                                    }}
                                >
                                    <span className="spiral-spine-glow" />
                                    <span className="spiral-spine-line" />
                                </div>

                                {[-3, 0, 3].map((offset) => (
                                    <div
                                        key={offset}
                                        className="spiral-ring"
                                        style={{
                                            width: geometry.radius * 2,
                                            height: geometry.radius * 2,
                                            transform: `translate3d(-50%, calc(-50% + ${-offset * geometry.rise}px), ${-geometry.radius}px) rotateX(78deg)`,
                                            zIndex: Math.round(1000 - geometry.radius) + 1,
                                        }}
                                    />
                                ))}

                                {PROJECTS.map((project, index) => (
                                    <SpiralCard
                                        key={project.id}
                                        project={project}
                                        index={index}
                                        progress={progress}
                                        mix={mix}
                                        geometry={geometry}
                                        isActive={index === active}
                                        onSelect={handleSelect}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="spiral-caption" aria-live="polite">
                            <span className="spiral-caption-meta">
                                {String(active + 1).padStart(2, '0')} — {current.date}
                            </span>
                            <h2 className="spiral-caption-title">{current.name}</h2>
                            <div className="spiral-caption-actions">
                                {currentLink && (
                                    <a className="btn btn-primary btn-sm" href={currentLink.url} target="_blank" rel="noreferrer">
                                        Visit {current.name} ↗
                                    </a>
                                )}
                                <button
                                    className="btn btn-ghost btn-sm"
                                    onClick={() => projectsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    All details ↓
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="spiral-hud">
                    <span className="spiral-hud-hint">
                        {mode === 'spiral' ? 'Scroll to rotate' : 'Scroll to browse'}
                    </span>
                    <span className="spiral-hud-count">
                        {String(active + 1).padStart(2, '0')} / {String(COUNT).padStart(2, '0')}
                    </span>
                </div>
            </div>
        </section>
    );
};

export default ProjectSpiral;
