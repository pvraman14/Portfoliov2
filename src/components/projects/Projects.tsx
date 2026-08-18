import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import { projects } from '../../data/projects'
import Reveal from '../reveal/Reveal'
import './Projects.scss'

const Projects = () => (
  <div className="work">
    <div className="work__grid">
      {projects.map((project, i) => (
        <Reveal as="article" className="work__card" key={project.id} delay={i * 60}>
          <div className="work__top">
            <span className="work__kind">{project.kind}</span>
            <span className="work__when">{project.when}</span>
          </div>

          <h3 className="work__title">
            {project.href ? (
              <a href={project.href} target="_blank" rel="noopener noreferrer">
                {project.title}
                <FiArrowUpRight aria-hidden="true" />
              </a>
            ) : (
              project.title
            )}
          </h3>

          <p className="work__summary">{project.summary}</p>

          {project.points && (
            <ul className="work__points">
              {project.points.map(point => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          )}

          <ul className="work__stack">
            {project.stack.map(tech => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>

          {project.repo && (
            <a
              className="work__repo"
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGithub aria-hidden="true" />
              View source
            </a>
          )}
        </Reveal>
      ))}
    </div>
  </div>
)

export default Projects
