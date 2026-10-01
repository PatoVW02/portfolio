import { useState } from 'react';
import { m } from 'framer-motion';

import Project from '../../components/project';
import projectsData from "../../data/projects.json";

import "../../styles/Projects.css"

// Order here is the order shown on the Featured tab.
const FEATURED_IDS = [11, 12, 6, 7];

const parseDate = (dateStr) => {
    const [year, month] = dateStr.split(', ');
    return new Date(`${month} 1, ${year}`);
};

const Projects = ({ projectsRef }) => {
    const [activeTab, setActiveTab] = useState('featured');

    const visibleProjects = activeTab === 'featured'
        ? projectsData
            .filter(p => FEATURED_IDS.includes(p.id))
            .sort((a, b) => FEATURED_IDS.indexOf(a.id) - FEATURED_IDS.indexOf(b.id))
        : [...projectsData].sort((a, b) => parseDate(b.date) - parseDate(a.date));

    return (
        <section className="section projects" ref={projectsRef} id="projects">
            <div className="container">
                <div className="section-head">
                    <span className="eyebrow">01 / Projects</span>
                    <h2 className="section-title">Selected <em>work</em></h2>
                </div>

                <div className="projects-tabs" role="tablist">
                    <button
                        role="tab"
                        aria-selected={activeTab === 'featured'}
                        className={`projects-tab ${activeTab === 'featured' ? 'active' : ''}`}
                        onClick={() => setActiveTab('featured')}
                    >
                        Featured
                    </button>
                    <button
                        role="tab"
                        aria-selected={activeTab === 'all'}
                        className={`projects-tab ${activeTab === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveTab('all')}
                    >
                        All projects
                        <span className="projects-tab-count">{projectsData.length}</span>
                    </button>
                </div>

                <div className="projects-grid" key={activeTab}>
                    {visibleProjects.map((project, index) => (
                        <m.div
                            key={project.id}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10% 0px' }}
                            transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Project project={project} index={index} />
                        </m.div>
                    ))}
                </div>
            </div>
        </section>
    )
};

export default Projects;
