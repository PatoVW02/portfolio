import { useScroll, useTransform, m, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import useWindowDimensions from '../../hooks/useWindowDimensions';

const Project = ({ project }) => {
    const ref = useRef(null);

    const controls = useAnimation();

    const { width } = useWindowDimensions();
    const { scrollYProgress } = useScroll({ target: ref });

    const useParallax = (value, distance) => {
        return useTransform(value, [0, 1], [-distance, distance]);
    }

    const y = useParallax(scrollYProgress, 300);

    useEffect(() => {
        if (width >= 1024) {
            controls.start({
                y: [0, -10, 10, 0], // Add a floating animation
                transition: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 4,
                },
            });
        }
    }, [width, controls]);

    return (
        <section>
            {width >= 1024 && (
                <m.div className="repos" animate={controls}>
                    {project.repositories.website && (
                        <a href={project.repositories.website} target="_blank" rel="noreferrer">
                            <img src={require('../../assets/website-94.png')} alt="Project" />
                            <span className="tooltip-text">Website</span>
                        </a>
                    )}

                    {project.repositories.code && (
                        <a href={project.repositories.code} target="_blank" rel="noreferrer">
                            <img src={require('../../assets/github-188.png')} alt="Project" />
                            <span className="tooltip-text">Code</span>
                        </a>
                    )}

                    {project.repositories.frontend && (
                        <a href={project.repositories.frontend} target="_blank" rel="noreferrer">
                            <img src={require('../../assets/github-188.png')} alt="Frontend" />
                            <span className="tooltip-text">Frontend</span>
                        </a>
                    )}

                    {project.repositories.backend && (
                        <a href={project.repositories.backend} target="_blank" rel="noreferrer">
                            <img src={require('../../assets/github-188.png')} alt="Backend" />
                            <span className="tooltip-text">Backend</span>
                        </a>
                    )}
                </m.div>
            )}

            <m.div ref={ref} className="project-card" whileHover={{
                scale: 1.05,
                transition: { duration: 0.5 }
            }}>
                <div className="project-content">
                    <div className="project-image">
                        <img src={require(`../../assets/project${project.id}.png`)} alt="Project" />
                    </div>
                    <div className="project-description">
                        {project.description}
                    </div>
                </div>

                <div className="project-footer">
                    <div className="project-date">
                        <b>{project.date}</b>
                    </div>
                    <div className="project-technologies">
                        {project.technologies}
                    </div>
                </div>

                {width < 1024 && (
                    <div className="project-link">
                        <a
                            href={project.repositories.website ? project.repositories.website : project.repositories.code ? project.repositories.code : project.repositories.frontend ? project.repositories.frontend : project.repositories.backend}
                            target="_blank"
                            rel="noreferrer">
                            View Project
                        </a>
                    </div>
                )}
            </m.div>

            <m.h2 className="project-title" style={{ y }}>{project.name}</m.h2>
        </section>
    )
}

export default Project;
