import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'
import { profile } from '../data/profile'
import './Footer.scss'

const Footer = () => (
  <footer className="footer">
    <div className="footer__inner">
      <div className="footer__social">
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
          aria-label="LinkedIn profile"
        >
          <FaLinkedin />
        </a>
        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
          aria-label="GitHub profile"
        >
          <FaGithub />
        </a>
        <a
          href={`mailto:${profile.links.email}`}
          className="footer__link"
          aria-label="Send an email"
        >
          <FaEnvelope />
        </a>
      </div>

      <p className="footer__meta">
        React · TypeScript · SCSS · Framer Motion
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
      </p>
    </div>
  </footer>
)

export default Footer
