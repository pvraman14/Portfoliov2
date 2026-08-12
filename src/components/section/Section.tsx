import Reveal from '../reveal/Reveal'
import './Section.scss'

type SectionProps = {
  id: string
  eyebrow: string
  title: string
  lede?: string
  children: React.ReactNode
}

const Section = ({ id, eyebrow, title, lede, children }: SectionProps) => (
  <section className="section" id={id}>
    <Reveal as="header" className="section__head">
      <p className="section__eyebrow">{eyebrow}</p>
      <h2 className="section__title">{title}</h2>
      {lede && <p className="section__lede">{lede}</p>}
    </Reveal>
    {children}
  </section>
)

export default Section
