import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiPlus } from 'react-icons/fi'
import Reveal from '../reveal/Reveal'
import type { CaseStudy } from '../../data/caseStudies'

const kindLabel: Record<CaseStudy['kind'], string> = {
  feature: 'Feature',
  architecture: 'Architecture',
  diagnosis: 'Diagnosis',
}

const CaseStudyCard = ({ study }: { study: CaseStudy }) => {
  const [open, setOpen] = useState(false)
  const panelId = `reveal-${study.id}`

  return (
    <Reveal as="article" className={`study study--${study.kind}`}>
      <div className="study__top">
        <span className={`study__kind study__kind--${study.kind}`}>{kindLabel[study.kind]}</span>
        <span className="study__when">{study.when}</span>
      </div>

      <h3 className="study__title">{study.title}</h3>

      <p className="study__summary">{study.summary}</p>

      <ul className="study__points">
        {study.points.map(point => (
          <li key={point}>{point}</li>
        ))}
      </ul>

      <button
        type="button"
        className={`study__toggle ${open ? 'is-open' : ''}`}
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <FiPlus aria-hidden="true" />
        {study.reveal.label}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            className="study__reveal"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 0.8, 0.28, 1] }}
          >
            <p>{study.reveal.body}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {study.footnote && <p className="study__footnote">{study.footnote}</p>}
    </Reveal>
  )
}

export default CaseStudyCard
