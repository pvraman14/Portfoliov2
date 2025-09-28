import React from 'react'
import ProjectCard from './ProjectCard'
// import './Projects.module.scss'

const PROJECTS = [
  {
    id: 'p1',
    title: 'Project One',
    desc: 'A short description about project one. Shows features and stack.',
    tags: ['React', 'TypeScript', 'SCSS'],
  },
  {
    id: 'p2',
    title: 'Project Two',
    desc: 'A short description about project two. Focus on UX and performance.',
    tags: ['Vite', 'Framer Motion'],
  },
  {
    id: 'p3',
    title: 'Project Three',
    desc: 'A demonstration of API usage and accessibility.',
    tags: ['Node', 'Express', 'Postgres'],
  },
]

const Projects: React.FC = () => (
  <div className="projects">
    {PROJECTS.map(p => (
      <ProjectCard key={p.id} {...p} />
    ))}
  </div>
)

export default Projects