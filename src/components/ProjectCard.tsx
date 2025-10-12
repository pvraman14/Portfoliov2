import React from 'react'
import { motion } from 'framer-motion'
import './ProjectCard.scss'

type ProjectProps = {
  id: string
  title: string
  desc: string
  tags: string[]
}

const ProjectCard: React.FC<ProjectProps> = ({ title, desc, tags }) => {
  return (
    <motion.article
      className="project-card"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="project-card__media" aria-hidden>
        <div className="placeholder-image">Image</div>
      </div>
      <div className="project-card__content">
        <h4 className="project-card__title">{title}</h4>
        <p className="project-card__desc">{desc}</p>
        <div className="project-card__tags">
          {tags.map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
        <div className="project-card__actions">
          <button className="btn">GitHub</button>
          <button className="btn btn--ghost">Live</button>
        </div>
      </div>
    </motion.article>
  )
}

export default ProjectCard
