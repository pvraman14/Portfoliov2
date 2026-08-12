import {
  FaReact,
  FaNodeJs,
  FaJava,
  FaPython,
  FaHtml5,
  FaCss3,
  FaSass,
  FaGitAlt,
  FaDocker,
  FaNpm,
} from 'react-icons/fa'
import { FaJs } from 'react-icons/fa6'
import {
  SiNextdotjs,
  SiTypescript,
  SiRedux,
  SiFramer,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiPostman,
  SiWebpack,
  SiVite,
  SiJest,
  SiAngular,
  SiReactivex,
} from 'react-icons/si'
import type { IconType } from 'react-icons'
import { orbitLabels, skills, type Orbit } from '../../data/skills'
import Reveal from '../reveal/Reveal'
import './Systems.scss'

const iconMap: Record<string, IconType> = {
  FaReact,
  FaNodeJs,
  FaJava,
  FaPython,
  FaHtml5,
  FaCss3,
  FaSass,
  FaGitAlt,
  FaDocker,
  FaNpm,
  FaJs,
  SiNextdotjs,
  SiTypescript,
  SiRedux,
  SiFramer,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiPostman,
  SiWebpack,
  SiVite,
  SiJest,
  SiAngular,
  SiReactivex,
}

const ORDER: Orbit[] = ['core', 'adjacent', 'outer']

const Systems = () => (
  <div className="systems">
    {ORDER.map((orbit, groupIndex) => {
      const members = skills.filter(s => s.orbit === orbit)

      return (
        <Reveal className="systems__group" key={orbit} delay={groupIndex * 70}>
          <h3 className="systems__label">
            <span className={`systems__dot systems__dot--${orbit}`} aria-hidden="true" />
            {orbitLabels[orbit]}
            <span className="systems__count">{members.length}</span>
          </h3>

          <ul className="systems__row">
            {members.map(skill => {
              const Icon = iconMap[skill.icon]
              return (
                <li className="systems__chip" key={skill.name}>
                  {Icon && (
                    <Icon
                      aria-hidden="true"
                      style={skill.brand ? { color: skill.brand } : undefined}
                    />
                  )}
                  <span>{skill.name}</span>
                </li>
              )
            })}
          </ul>
        </Reveal>
      )
    })}
  </div>
)

export default Systems
