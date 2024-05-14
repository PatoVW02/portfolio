import Typewriter from 'typewriter-effect';
import { ArrowDownCircle } from 'react-bootstrap-icons';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import Projects from './projects';
import Contact from './contact';

import "../../styles/Home.css"

const Home = ({ projectsRef, contactRef }) => {
    const executeProjectsScroll = () => {
        projectsRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <LazyMotion features={domAnimation}>
            <div className="home-container">
                <div className="main-content">
                    <div className="greetings">
                        <m.h1
                            initial={{
                                opacity: 0
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            transition={{ duration: 2 }}
                        >
                            {'<'} Patricio Villarreal {'/>'}
                        </m.h1>
                    </div>

                    <div className="description-container">
                        <Typewriter
                            id="typewriter"
                            options={{
                                strings: ["I'm a fullstack developer", "Building websites and applications", "Based in Monterrey, Mexico"],
                                autoStart: true,
                                loop: true,
                            }}
                        />

                        <div className="descriptions-container">
                            <p className="description-1">
                                I have experience working with different technologies and frameworks such as <b>React</b>, <b>Node.js</b>, <b>Express</b>, <b>MongoDB</b>, <b>Swift</b>, <b>Python</b>, <b>.NET</b> and <b>C#</b>.
                            </p>
                            <p className="description-2">
                                I'm always looking for new challenges and opportunities to learn and grow as a developer.
                            </p>
                        </div>

                        <m.div
                            className="arrow-down"
                            onClick={executeProjectsScroll}
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.5 }
                            }}
                            whileTap={{
                                scale: 0.9,
                            }}
                        >
                            <ArrowDownCircle />
                            <p>Scroll down</p>
                        </m.div>
                    </div>
                </div>

                <Projects projectsRef={projectsRef} />
                <Contact contactRef={contactRef} />
            </div>
        </LazyMotion>
    );
};

export default Home;
