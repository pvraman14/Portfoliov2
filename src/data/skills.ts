// Orbit encodes centrality, not preference:
//   core     — what I reach for daily and would defend design decisions in
//   adjacent — used substantially on shipped work
//   outer    — tooling and infrastructure in regular rotation
export type Orbit = 'core' | 'adjacent' | 'outer'

export type Skill = {
  name: string
  icon: string
  orbit: Orbit
  brand?: string
  // shorter label for the orbit diagram, where long names collide
  short?: string
}

export const skills: Skill[] = [
  { name: 'React', icon: 'FaReact', orbit: 'core', brand: '#61DAFB' },
  { name: 'TypeScript', icon: 'SiTypescript', orbit: 'core', brand: '#3178C6' },
  { name: 'SCSS', icon: 'FaSass', orbit: 'core', brand: '#CC6699' },
  { name: 'Next.js', icon: 'SiNextdotjs', orbit: 'core' },

  { name: 'Redux', icon: 'SiRedux', orbit: 'adjacent', brand: '#764ABC' },
  { name: 'JavaScript', icon: 'FaJs', orbit: 'adjacent', brand: '#F7DF1E' },
  { name: 'Angular', icon: 'SiAngular', orbit: 'adjacent', brand: '#DD0031' },
  { name: 'RxJS', icon: 'SiReactivex', orbit: 'adjacent', brand: '#B7178C' },
  { name: 'Framer Motion', icon: 'SiFramer', orbit: 'adjacent', short: 'Framer' },
  { name: 'Node.js', icon: 'FaNodeJs', orbit: 'adjacent', brand: '#5FA04E' },
  { name: 'Express', icon: 'SiExpress', orbit: 'adjacent' },
  { name: 'HTML', icon: 'FaHtml5', orbit: 'adjacent', brand: '#E34F26' },
  { name: 'CSS', icon: 'FaCss3', orbit: 'adjacent', brand: '#1572B6' },

  { name: 'Git', icon: 'FaGitAlt', orbit: 'outer', brand: '#F05032' },
  { name: 'Jest', icon: 'SiJest', orbit: 'outer', brand: '#C21325' },
  { name: 'Webpack', icon: 'SiWebpack', orbit: 'outer', brand: '#8DD6F9' },
  { name: 'Vite', icon: 'SiVite', orbit: 'outer', brand: '#646CFF' },
  { name: 'Docker', icon: 'FaDocker', orbit: 'outer', brand: '#2496ED' },
  { name: 'npm', icon: 'FaNpm', orbit: 'outer', brand: '#CB3837' },
  { name: 'Python', icon: 'FaPython', orbit: 'outer', brand: '#3776AB' },
  { name: 'Java', icon: 'FaJava', orbit: 'outer', brand: '#E76F00' },
  { name: 'PostgreSQL', icon: 'SiPostgresql', orbit: 'outer', brand: '#4169E1' },
  { name: 'MongoDB', icon: 'SiMongodb', orbit: 'outer', brand: '#47A248' },
  { name: 'Postman', icon: 'SiPostman', orbit: 'outer', brand: '#FF6C37' },
]

export const orbitLabels: Record<Orbit, string> = {
  core: 'Core stack',
  adjacent: 'Substantial',
  outer: 'Tooling',
}

// The diagram reads as a system, so it shows a representative subset —
// crowding the outer ring past this makes labels collide. The Systems
// section below the fold carries the full list.
const DIAGRAM_LIMIT: Record<Orbit, number> = {
  core: 4,
  adjacent: 6,
  outer: 6,
}

export const diagramSkills = (['core', 'adjacent', 'outer'] as Orbit[]).flatMap(orbit =>
  skills.filter(s => s.orbit === orbit).slice(0, DIAGRAM_LIMIT[orbit])
)
