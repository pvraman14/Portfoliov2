import { useState } from 'react'
import { caseStudies, type CaseStudy } from '../../data/caseStudies'
import CaseStudyCard from './CaseStudyCard'
import './CaseStudies.scss'

type Filter = 'all' | CaseStudy['kind']

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Everything' },
  { key: 'feature', label: 'Features' },
  { key: 'architecture', label: 'Architecture' },
  { key: 'diagnosis', label: 'Diagnoses' },
]

const CaseStudies = () => {
  const [filter, setFilter] = useState<Filter>('all')

  const shown = filter === 'all' ? caseStudies : caseStudies.filter(s => s.kind === filter)

  return (
    <div className="studies">
      <div className="studies__filters" role="group" aria-label="Filter case studies by kind">
        {FILTERS.map(f => {
          const count =
            f.key === 'all' ? caseStudies.length : caseStudies.filter(s => s.kind === f.key).length
          return (
            <button
              key={f.key}
              type="button"
              className={`studies__filter ${filter === f.key ? 'is-active' : ''}`}
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
            >
              {f.label}
              <span>{count}</span>
            </button>
          )
        })}
      </div>

      <div className="studies__list">
        {shown.map(study => (
          <CaseStudyCard study={study} key={study.id} />
        ))}
      </div>
    </div>
  )
}

export default CaseStudies
