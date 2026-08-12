import { useMemo, useState } from 'react'
import { diagramSkills, type Orbit } from '../../data/skills'
import './OrbitSystem.scss'

const VIEW = 340
const CENTER = VIEW / 2

const RINGS: Record<Orbit, { radius: number; dot: number; duration: number; reverse?: boolean }> = {
  core: { radius: 72, dot: 20, duration: 34 },
  adjacent: { radius: 118, dot: 17, duration: 52, reverse: true },
  outer: { radius: 160, dot: 14, duration: 76 },
}

const ORDER: Orbit[] = ['core', 'adjacent', 'outer']

type Placed = {
  name: string
  orbit: Orbit
  x: number
  y: number
  r: number
}

const OrbitSystem = () => {
  const [active, setActive] = useState<string | null>(null)

  // positions are deterministic: evenly spaced around each ring
  const placed = useMemo(() => {
    const out: Record<Orbit, Placed[]> = { core: [], adjacent: [], outer: [] }

    for (const orbit of ORDER) {
      const members = diagramSkills.filter(s => s.orbit === orbit)
      const ring = RINGS[orbit]
      members.forEach((skill, i) => {
        // offset each ring's start angle so nodes don't line up radially
        const offset = orbit === 'adjacent' ? Math.PI / members.length : 0
        const angle = (i / members.length) * Math.PI * 2 - Math.PI / 2 + offset
        out[orbit].push({
          name: skill.short ?? skill.name,
          orbit,
          x: CENTER + Math.cos(angle) * ring.radius,
          y: CENTER + Math.sin(angle) * ring.radius,
          r: ring.dot,
        })
      })
    }

    return out
  }, [])

  return (
    <div className="orbit">
      <svg
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        role="img"
        aria-label="Skills arranged by how central they are to my daily work: core stack innermost, tooling outermost."
      >
        {ORDER.map(orbit => (
          <circle
            key={`ring-${orbit}`}
            className={`orbit__ring orbit__ring--${orbit}`}
            cx={CENTER}
            cy={CENTER}
            r={RINGS[orbit].radius}
          />
        ))}

        {ORDER.map(orbit => {
          const ring = RINGS[orbit]
          return (
            <g
              key={`grp-${orbit}`}
              className="orbit__spin"
              style={{
                animationDuration: `${ring.duration}s`,
                animationDirection: ring.reverse ? 'reverse' : 'normal',
                transformOrigin: `${CENTER}px ${CENTER}px`,
              }}
            >
              {placed[orbit].map(node => (
                <g
                  key={node.name}
                  className={`orbit__node orbit__node--${orbit} ${active === node.name ? 'is-active' : ''}`}
                  onMouseEnter={() => setActive(node.name)}
                  onMouseLeave={() => setActive(null)}
                >
                  <circle cx={node.x} cy={node.y} r={node.r} />
                  {/* counter-rotate the label so text stays upright */}
                  <g
                    className="orbit__label"
                    style={{
                      transformOrigin: `${node.x}px ${node.y}px`,
                      animationDuration: `${ring.duration}s`,
                      animationDirection: ring.reverse ? 'normal' : 'reverse',
                    }}
                  >
                    <text x={node.x} y={node.y}>
                      {node.name}
                    </text>
                  </g>
                </g>
              ))}
            </g>
          )
        })}

        <circle className="orbit__core" cx={CENTER} cy={CENTER} r={34} />
        <text className="orbit__core-text" x={CENTER} y={CENTER}>
          CORE
        </text>
      </svg>
    </div>
  )
}

export default OrbitSystem
