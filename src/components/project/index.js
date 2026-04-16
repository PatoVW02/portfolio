const Project = ({ project }) => (
    <div className="project-card">
        <div className="project-card-image">
            <img src={require(`../../assets/projects/project${project.id}.png`)} alt={project.name} />
        </div>

        <div className="project-card-body">
            <h3 className="project-card-title">{project.name}</h3>

            <ul className="project-tech-list">
                {project.technologies.map((tech, index) => (
                    <li key={index} className="project-tech-badge">
                        <img src={require(`../../assets/icons/${tech.icon}`)} alt={tech.name} />
                        {tech.name}
                    </li>
                ))}
            </ul>

            <p className="project-card-description">{project.description}</p>

            <div className="project-card-links">
                {project.links.map((link, index) => (
                    <a
                        key={index}
                        className="project-link-btn"
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src={require(`../../assets/icons/${link.icon}`)} alt={link.name} />
                        {link.name}
                    </a>
                ))}
            </div>
        </div>
    </div>
)

export default Project;
