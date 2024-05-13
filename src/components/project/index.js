import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

const Project = ({ project }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useParallax(scrollYProgress, 300);

    function useParallax(value, distance) {
        return useTransform(value, [0, 1], [-distance, distance]);
      }

    return (
        <section>
            <div ref={ref}>
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
                        Date: <b>{project.date}</b>
                    </div>
                    <div className="project-technologies">
                        {project.technologies}
                    </div>
                </div>

                <div className="project-link">
                    <a href={project.url} target="_blank" rel="noreferrer">View Project</a>
                </div>
            </div>

            <motion.h2 className="project-title" style={{ y }}>{project.name}</motion.h2>
        </section>
    )
}

export default Project;
