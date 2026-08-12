import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'
import { ledger, profile } from '../../data/profile'
import OrbitSystem from '../orbit/OrbitSystem'
import './Hero.scss'

const rise = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
}

const Hero = () => (
  <section className="hero" id="top">
    <div className="hero__body">
      <motion.p className="hero__tag" {...rise} transition={{ duration: 0.5, ease: 'easeOut' }}>
        <span className="hero__pulse" aria-hidden="true" />
        {profile.role} · {profile.company}
      </motion.p>

      <motion.h1
        className="hero__thesis"
        {...rise}
        transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
      >
        I build the platforms other engineers <span>build on</span>.
      </motion.h1>

      <motion.p
        className="hero__bio"
        {...rise}
        transition={{ duration: 0.6, delay: 0.16, ease: 'easeOut' }}
      >
        {profile.bio}
      </motion.p>

      <motion.div
        className="hero__links"
        {...rise}
        transition={{ duration: 0.6, delay: 0.24, ease: 'easeOut' }}
      >
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hero__link"
          aria-label="LinkedIn profile"
        >
          <FaLinkedin />
        </a>
        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hero__link"
          aria-label="GitHub profile"
        >
          <FaGithub />
        </a>
        <a href={`mailto:${profile.links.email}`} className="hero__link" aria-label="Send an email">
          <FaEnvelope />
        </a>
        <span className="hero__where">{profile.location}</span>
      </motion.div>

      <motion.dl
        className="hero__ledger"
        {...rise}
        transition={{ duration: 0.6, delay: 0.32, ease: 'easeOut' }}
      >
        {ledger.map(item => (
          <div className="hero__cell" key={item.label}>
            <dt>{item.label}</dt>
            <dd>
              {item.unit === '~' && <em>~</em>}
              {item.value}
              {item.unit && item.unit !== '~' && <small>{item.unit}</small>}
            </dd>
          </div>
        ))}
      </motion.dl>

      <p className="hero__provenance">
        Counted from local git history across all branches, August 2026.
      </p>
    </div>

    <motion.div
      className="hero__orbit"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
    >
      <OrbitSystem />
    </motion.div>
  </section>
)

export default Hero
