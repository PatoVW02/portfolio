const Project = ({ project }) => (
    <div className="project-container">
        <div className="project-image">
            <img src={require(`../../assets/projects/project${project.id}.png`)} alt="Project" />
        </div>

        <div className="project-content">
            <h3>{project.name}</h3>

            <ul>
                {project.technologies.map((tech, index) => (
                    <li key={index}>
                        <img src={require(`../../assets/icons/${tech.icon}`)} alt={tech.name} />
                        {tech.name}
                    </li>
                ))}
            </ul>

            <p>{project.description}</p>


            <div className="project-links">
                {project.links.map(link => (
                    <a className="button-link" href={link.url} target="_blank" rel="noreferrer">
                        <img src={require(`../../assets/icons/${link.icon}`)} alt={link.name} />
                        {link.name}
                    </a>
                ))}
            </div>
        </div>
    </div>
)

export default Project;
