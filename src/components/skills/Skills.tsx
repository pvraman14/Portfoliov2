
import React from 'react';
import { FaReact, FaNodeJs, FaJava, FaPython, FaHtml5, FaCss3, FaSass } from 'react-icons/fa';
import { FaJs } from 'react-icons/fa6';
import { SiNextdotjs } from 'react-icons/si';
import { motion } from 'framer-motion';
import './Skills.scss'

/**
 * A component that displays a list of skills icons.
 *
 * It contains a heading and a container with skill icons.
 * Each skill icon contains an icon and a label.
 */
const Skills = () => {
    return (
        <div className="skills-section">
            <h2>Skills</h2>
            <div className="skills-icons">
                <motion.article
                    className="project-card"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    // viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="skill-icon">
                        <FaReact className='react-icon' />
                        <p>React</p>
                    </div>
                </motion.article>
                <div className="skill-icon">
                    <FaJs className='javascript' />
                    <p>JavaScript</p>
                </div>
                {/* Add more skill icons as needed */}
                <div className="skill-icon">
                    <SiNextdotjs />
                    <p>NextJs</p>
                </div>
                <div className="skill-icon">
                    <FaNodeJs />
                    <p>NodeJs</p>
                </div>
                <div className="skill-icon">
                    <FaJava />
                    <p>Java</p>
                </div>
                <div className="skill-icon">
                    <FaPython />
                    <p>Python</p>
                </div>
                <div className="skill-icon">
                    <FaCss3 />
                    <p>CSS</p>
                </div>
                <div className="skill-icon">
                    <FaHtml5 />
                    <p>HTML</p>
                </div>
                <div className="skill-icon">
                    <FaSass />
                    <p>SaSS</p>
                </div>
            </div>
        </div>
    );
};

export default Skills;