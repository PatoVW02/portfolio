const Project = ({ project, index }) => (
    <article className="project-card">
        <a
            className="project-card-image"
            href={project.links[0]?.url}
            target="_blank"
            rel="noreferrer"
            tabIndex={project.links[0] ? 0 : -1}
            aria-label={project.links[0] ? `Open ${project.name}` : undefined}
        >
            <img
                src={require(`../../assets/projects/project${project.id}.png`)}
                alt={project.name}
                loading="lazy"
            />
        </a>

        <div className="project-card-body">
            <div className="project-card-meta">
                <span className="project-card-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="project-card-date">{project.date}</span>
            </div>

            <h3 className="project-card-title">{project.name}</h3>

            <ul className="project-tech-list">
                {project.technologies.map((tech) => (
                    <li key={tech.name} className="project-tech-badge">
                        <img src={require(`../../assets/icons/${tech.icon}`)} alt="" />
                        {tech.name}
                    </li>
                ))}
            </ul>

            <p className="project-card-description">{project.description}</p>

            {project.links.length > 0 && (
                <div className="project-card-links">
                    {project.links.map((link) => (
                        <a
                            key={link.name + link.url}
                            className="project-link"
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src={require(`../../assets/icons/${link.icon}`)} alt="" />
                            {link.name}
                            <span className="project-link-arrow" aria-hidden="true">↗</span>
                        </a>
                    ))}
                </div>
            )}
        </div>
    </article>
)

export default Project;
