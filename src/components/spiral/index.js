import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import '../../styles/Spiral.css';

const ACCENT = 0xffb347;
const BACKGROUND = 0x0b0b0c;

// Builds a helix whose radius tapers towards both ends so it reads as a coil, not a tube.
const buildHelix = ({ turns, points, radius, height, taper, phase = 0 }) => {
    const positions = new Float32Array(points * 3);

    for (let i = 0; i < points; i++) {
        const t = i / (points - 1);
        const angle = phase + t * turns * Math.PI * 2;
        const edge = Math.abs(t - 0.5) * 2;
        const r = radius * (1 - taper * edge * edge);

        positions[i * 3] = Math.cos(angle) * r;
        positions[i * 3 + 1] = (t - 0.5) * height;
        positions[i * 3 + 2] = Math.sin(angle) * r;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
};

// Picks every n-th vertex of a helix so small dots can sit on the wire.
const sampleVertices = (geometry, every) => {
    const source = geometry.getAttribute('position');
    const count = Math.floor(source.count / every);
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        positions[i * 3] = source.getX(i * every);
        positions[i * 3 + 1] = source.getY(i * every);
        positions[i * 3 + 2] = source.getZ(i * every);
    }

    const sampled = new THREE.BufferGeometry();
    sampled.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return sampled;
};

const Spiral = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return undefined;

        const container = canvas.parentElement;
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
        } catch (error) {
            // No WebGL: the hero simply renders without the spiral.
            return undefined;
        }

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setClearColor(0x000000, 0);

        const scene = new THREE.Scene();
        scene.fog = new THREE.Fog(BACKGROUND, 4.5, 9.5);

        const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
        camera.position.set(0, 0, 6.5);

        const group = new THREE.Group();
        scene.add(group);

        const outerGeometry = buildHelix({ turns: 6, points: 720, radius: 1.55, height: 5.2, taper: 0.55 });
        const innerGeometry = buildHelix({ turns: 6, points: 720, radius: 1.1, height: 5.2, taper: 0.55, phase: Math.PI });
        const dotsGeometry = sampleVertices(outerGeometry, 9);

        const outerMaterial = new THREE.LineBasicMaterial({
            color: ACCENT,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });
        const innerMaterial = new THREE.LineBasicMaterial({
            color: 0xf2f2f0,
            transparent: true,
            opacity: 0.18,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });
        const dotsMaterial = new THREE.PointsMaterial({
            color: ACCENT,
            size: 0.035,
            transparent: true,
            opacity: 0.9,
            sizeAttenuation: true,
            depthWrite: false,
        });

        const outer = new THREE.Line(outerGeometry, outerMaterial);
        const inner = new THREE.Line(innerGeometry, innerMaterial);
        const dots = new THREE.Points(dotsGeometry, dotsMaterial);
        group.add(outer, inner, dots);

        const BASE_LEAN = -0.55;
        group.rotation.z = BASE_LEAN;
        group.rotation.x = 0.15;

        const pointer = { x: 0, y: 0 };
        const target = { x: 0.15, z: BASE_LEAN };
        let spin = 0;
        let frame = 0;
        let visible = true;
        let lastTime = performance.now();

        const resize = () => {
            const width = container.clientWidth || window.innerWidth;
            const height = container.clientHeight || window.innerHeight;
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            // On wide screens the coil sits to the right of the text; on phones it sits behind it.
            const wide = width / height > 1;
            group.position.x = wide ? 1.7 : 0;
            group.scale.setScalar(wide ? 1 : 0.8);
            outerMaterial.opacity = wide ? 0.6 : 0.4;
            innerMaterial.opacity = wide ? 0.18 : 0.12;
        };

        const render = () => {
            renderer.render(scene, camera);
        };

        const step = (now) => {
            const delta = Math.min((now - lastTime) / 1000, 0.05);
            lastTime = now;

            const scroll = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);

            spin += delta * 0.32;
            group.rotation.y = spin + scroll * 1.4;

            target.x = 0.15 + pointer.y * 0.25;
            target.z = BASE_LEAN + pointer.x * 0.18;
            group.rotation.x += (target.x - group.rotation.x) * 0.045;
            group.rotation.z += (target.z - group.rotation.z) * 0.045;

            group.position.y = -scroll * 1.6;
            group.position.z = -scroll * 2.2;

            render();
            frame = requestAnimationFrame(step);
        };

        const start = () => {
            if (frame || reducedMotion) return;
            lastTime = performance.now();
            frame = requestAnimationFrame(step);
        };

        const stop = () => {
            if (!frame) return;
            cancelAnimationFrame(frame);
            frame = 0;
        };

        const onPointerMove = (event) => {
            pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
            pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
        };

        const onResize = () => {
            resize();
            if (reducedMotion) render();
        };

        const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible) start(); else stop();
        }, { threshold: 0 });

        resize();
        render();
        observer.observe(container);
        window.addEventListener('resize', onResize);
        if (!reducedMotion) window.addEventListener('pointermove', onPointerMove, { passive: true });

        return () => {
            stop();
            observer.disconnect();
            window.removeEventListener('resize', onResize);
            window.removeEventListener('pointermove', onPointerMove);

            outerGeometry.dispose();
            innerGeometry.dispose();
            dotsGeometry.dispose();
            outerMaterial.dispose();
            innerMaterial.dispose();
            dotsMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div className="spiral" aria-hidden="true">
            <canvas ref={canvasRef} className="spiral-canvas" />
        </div>
    );
};

export default Spiral;
