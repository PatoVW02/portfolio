import { useState } from 'react';
import { m } from 'framer-motion';

import Project from '../../components/project';
import projectsData from "../../data/projects.json";

import "../../styles/Projects.css"

const FEATURED_IDS = [6, 7];

const Projects = ({ projectsRef }) => {
    const [activeTab, setActiveTab] = useState('featured');

    const visibleProjects = activeTab === 'featured'
        ? projectsData.filter(p => FEATURED_IDS.includes(p.id))
        : projectsData;

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

            <div className="projects-tabs">
                <button
                    className={`projects-tab ${activeTab === 'featured' ? 'active' : ''}`}
                    onClick={() => setActiveTab('featured')}
                >
                    Featured
                </button>
                <button
                    className={`projects-tab ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveTab('all')}
                >
                    All Projects
                </button>
            </div>

            <div className="projects-content">
                {visibleProjects.map(project => (
                    <Project key={project.id} project={project} />
                ))}
            </div>
        </>
    )
};

export default Projects;
