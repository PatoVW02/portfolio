import Typewriter from 'typewriter-effect';
import { LazyMotion, domAnimation, m } from 'framer-motion';

import Spiral from '../../components/spiral';
import Projects from './projects';
import Contact from './contact';
import CVDoc from '../../assets/Patricio Villarreal Welsh.pdf';

import "../../styles/Home.css"

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
});

const Home = ({ projectsRef, contactRef }) => {
    const executeProjectsScroll = () => {
        projectsRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <LazyMotion features={domAnimation}>
            <section className="hero">
                <Spiral />

                <div className="container hero-inner">
                    <m.span className="eyebrow" {...fadeUp(0.1)}>
                        Fullstack developer · Monterrey, MX
                    </m.span>

                    <m.h1 className="hero-title" {...fadeUp(0.25)}>
                        Patricio
                        <br />
                        Villarreal
                    </m.h1>

                    <m.div className="hero-typewriter" {...fadeUp(0.4)}>
                        <Typewriter
                            options={{
                                strings: [
                                    "Building seamless digital experiences",
                                    "Websites, apps and products, end to end",
                                    "From the first sketch to the last deploy",
                                    "Based in Monterrey, Mexico",
                                ],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                    </m.div>

                    <m.p className="hero-bio" {...fadeUp(0.55)}>
                        I'm a 23-year-old Computer Science graduate who likes shipping the whole thing:
                        the interface, the backend, and the parts in between. Always learning, always building.
                    </m.p>

                    <m.div className="hero-actions" {...fadeUp(0.7)}>
                        <button className="btn btn-primary" onClick={executeProjectsScroll}>
                            See projects
                        </button>
                        <a
                            className="btn btn-ghost"
                            href={CVDoc}
                            download="Patricio Villarreal Welsh"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Download CV
                        </a>
                    </m.div>
                </div>

                <m.button
                    className="scroll-cue"
                    onClick={executeProjectsScroll}
                    aria-label="Scroll to projects"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                >
                    <span className="scroll-cue-line" />
                    <span className="scroll-cue-label">Scroll</span>
                </m.button>
            </section>

            <Projects projectsRef={projectsRef} />
            <Contact contactRef={contactRef} />
        </LazyMotion>
    );
};

export default Home;
