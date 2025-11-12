import React from 'react'
import { FaLinkedin, FaGithub, FaEnvelope, FaHeart } from 'react-icons/fa'
import './Footer.scss'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__social">
          <a
            href="https://www.linkedin.com/in/p-venkat-raman-3083b9195/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/pvraman14"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="mailto:pvenkatraman1400@gmail.com"
            className="footer__link"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        </div>
        
        <div className="footer__text">
          <p>
            Built with <FaHeart className="heart" /> using React, TypeScript, and Framer Motion
          </p>
          <p className="footer__copyright">
            © {currentYear} P Venkat Raman. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
