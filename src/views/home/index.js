import Typewriter from 'typewriter-effect';
import { ArrowDownCircle } from 'react-bootstrap-icons';
import { SocialIcon } from 'react-social-icons';

import Project from '../../components/project';
import projectsData from "../../data/projects.json";

import "../../styles/Home.css"
import "../../styles/Projects.css"
import "../../styles/Contact.css"

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const Home = ({ projectsRef, contactRef }) => {
    const executeProjectsScroll = () => {
        projectsRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="home-container">
            <div className="main-content">
                <div className="greetings">
                    <h1>{'<'} Patricio Villarreal {'/>'}</h1>
                </div>

                <div className="description-container">
                    <Typewriter
                        id="typewriter"
                        options={{
                            strings: ["I'm a fullstack web and iOS developer", "Building websites and applications", "Based in Monterrey, Mexico"],
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

                    <div className="arrow-down" onClick={executeProjectsScroll}>
                        <ArrowDownCircle />
                        <p>Scroll down</p>
                    </div>
                </div>
            </div>

            <h3 className="secondary-title" ref={projectsRef}>My Work</h3>
            <div className="projects-content">
                {projectsData.map(project => (
                    <Project project={project} />
                ))}
            </div>

            <h3 className="secondary-title">Contact Me</h3>
            <div className="contact-content" ref={contactRef}>
                <div className="contact-info">
                    <p>Email: <a href="mailto:patovw@gmail.com">patovw@gmail.com</a></p>
                    <p>Phone: <a href="tel:+528115914144">+52 81 1591 4144</a></p>

                    <div className="social-media">
                        <SocialIcon url="https://www.linkedin.com/in/patricio-villarreal-welsh-a786901b4" target="_blank" bgColor="transparent" fgColor='white' />
                        <SocialIcon url="https://github.com/PatoVW02" target="_blank" bgColor="transparent" fgColor='white' />
                        <SocialIcon url="https://www.instagram.com/patovw02" target="_blank" bgColor="transparent" fgColor='white' />
                    </div>

                    <p>Location: Monterrey, Mexico</p>

                    <div className="contact-form">
                        <form>
                            <input type="text" placeholder="Name" />
                            <input type="email" placeholder="Email" />
                            <textarea placeholder="Message"></textarea>
                            <button type="submit" onClick={(e) => e.preventDefault()}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
