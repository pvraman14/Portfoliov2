import React from 'react';
import { FaReact, FaNodeJs, FaJava, FaPython, FaHtml5, FaCss3, FaSass, FaGitAlt, FaDocker, FaNpm } from 'react-icons/fa';
import { FaJs } from 'react-icons/fa6';
import { SiNextdotjs, SiTypescript, SiRedux, SiFramer, SiExpress, SiMongodb, SiPostgresql, SiPostman, SiWebpack, SiVite, SiJest } from 'react-icons/si';
import { motion } from 'framer-motion';
import { type IconType } from 'react-icons';
import './Skills.scss';

// Icon map to convert string names to actual components
const iconMap: Record<string, IconType> = {
    FaReact,
    SiNextdotjs,
    SiRedux,
    SiFramer,
    SiExpress,
    FaHtml5,
    FaCss3,
    FaSass,
    SiTypescript,
    FaJs,
    FaNodeJs,
    FaJava,
    FaPython,
    FaGitAlt,
    FaDocker,
    FaNpm,
    SiMongodb,
    SiPostgresql,
    SiPostman,
    SiWebpack,
    SiVite,
    SiJest
};

type TSkillsJson = {
    name: string;
    icon: string;
    color?: string;
};

type TSkillCategory = {
    category: string;
    skills: TSkillsJson[];
};

const skillsData: TSkillCategory[] = [
    {
        category: "Libraries",
        skills: [
            {
                name: "React",
                icon: "FaReact",
                color: '#61DAFB'
            },
            {
                name: "Next.js",
                icon: "SiNextdotjs"
            },
            {
                name: "Redux",
                icon: "SiRedux",
                color: '#764ABC'
            },
            {
                name: "Framer Motion",
                icon: "SiFramer",
                color: '#0055FF'
            },
            {
                name: "Express",
                icon: "SiExpress"
            }
        ]
    },
    {
        category: "Languages",
        skills: [
            {
                name: "JavaScript",
                icon: "FaJs",
                color: '#f0b100'
            },
            {
                name: "TypeScript",
                icon: "SiTypescript",
                color: '#2b7fff'
            },
            {
                name: "Java",
                icon: "FaJava",
                color: '#5382a1'
            },
            {
                name: "Python",
                icon: "FaPython",
                color: '#4584B6'
            },
            {
                name: "HTML",
                icon: "FaHtml5",
                color: '#ff6900'
            },
            {
                name: "CSS",
                icon: "FaCss3",
                color: '#4584B6'
            },
            {
                name: "SASS",
                icon: "FaSass",
                color: '#CD6799'
            }
        ]
    },
    {
        category: "Tools",
        skills: [
            {
                name: "Git",
                icon: "FaGitAlt",
                color: '#F05032'
            },
            {
                name: "Docker",
                icon: "FaDocker",
                color: '#2496ED'
            },
            {
                name: "MongoDB",
                icon: "SiMongodb",
                color: '#47A248'
            },
            {
                name: "PostgreSQL",
                icon: "SiPostgresql",
                color: '#4169E1'
            },
            {
                name: "Postman",
                icon: "SiPostman",
                color: '#FF6C37'
            },
            {
                name: "Webpack",
                icon: "SiWebpack",
                color: '#8DD6F9'
            },
            {
                name: "Vite",
                icon: "SiVite",
                color: '#646CFF'
            },
            {
                name: "Jest",
                icon: "SiJest",
                color: '#C21325'
            },
            {
                name: "npm",
                icon: "FaNpm",
                color: '#CB3837'
            }
        ]
    }
];

/**
 * A component that displays skills organized into categories.
 *
 * It contains three sections: Libraries, Languages, and Tools.
 * Each section displays skill icons with labels.
 */
const Skills = () => {
    return (
        <div className="skills-section">
            <motion.h2
                className="skills-main-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Skills
            </motion.h2>

            <motion.div
                className="skills-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {skillsData.map((category, categoryIndex) => (
                    <div
                        key={category.category}
                        className="skills-category"
                    >
                        <h3 className="category-title">{category.category}</h3>
                        <div className="skills-icons">
                            {category.skills.map((skill, index) => {
                                const IconComponent = iconMap[skill.icon];

                                return (
                                    <motion.article
                                        key={index}
                                        className="skill-card"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: 0.3 + (index * 0.03) }}
                                        whileHover={{ scale: 1.1, y: -5 }}
                                    >
                                        <div className="skill-icon">
                                            <IconComponent
                                                className={skill.name}
                                                color={skill.color}
                                                size={40}
                                            />
                                            <p>{skill.name}</p>
                                        </div>
                                    </motion.article>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default Skills;