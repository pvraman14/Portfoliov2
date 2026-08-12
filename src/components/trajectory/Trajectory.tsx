import { roles } from '../../data/experience'
import Reveal from '../reveal/Reveal'
import './Trajectory.scss'

const Trajectory = () => (
  <ol className="trajectory">
    {roles.map((role, i) => (
      <Reveal
        as="li"
        key={role.id}
        delay={i * 70}
        className={`trajectory__stop ${role.current ? 'is-current' : ''}`}
      >
        <span className="trajectory__marker" aria-hidden="true" />

        <div className="trajectory__content">
          <div className="trajectory__head">
            <h3 className="trajectory__role">
              {role.title}
              {role.current && <em className="trajectory__now">Current</em>}
            </h3>
            <p className="trajectory__meta">
              <span className="trajectory__company">{role.company}</span>
              <span className="trajectory__when">{role.when}</span>
            </p>
          </div>

          <p className="trajectory__blurb">{role.blurb}</p>

          <ul className="trajectory__points">
            {role.highlights.map(point => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </Reveal>
    ))}
  </ol>
)

export default Trajectory
