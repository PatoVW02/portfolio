import { m } from 'framer-motion';

import Project from '../../components/project';
import projectsData from "../../data/projects.json";

import "../../styles/Projects.css"

const Projects = ({ projectsRef }) => {
    return (
        <>
            <m.h3
                className="secondary-title"
                ref={projectsRef}
                whileInView={{
                    scale: 1.1,
                    transition: { duration: 1 }
                }}
            >
                {'< '}Projects{' />'}
            </m.h3>
            <div className="projects-content">
                {projectsData.map(project => (
                    <Project project={project} />
                ))}
            </div>
        </>
    )
};

export default Projects;
