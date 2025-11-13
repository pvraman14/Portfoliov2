import './Aera.scss';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface CollapsibleProjectProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

const CollapsibleProject = ({ title, children, defaultExpanded = false }: CollapsibleProjectProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // On desktop, always show content
  if (!isMobile) {
    return (
      <section className="project">
        <h3 className="project-title">{title}</h3>
        {children}
      </section>
    );
  }

  // On mobile, make it collapsible
  return (
    <section className={`project collapsible ${isExpanded ? 'expanded' : ''}`}>
      <div className="project-header" onClick={toggleExpanded}>
        <h3 className="project-title">{title}</h3>
        <span className="project-icon">
          {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
        </span>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="project-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export const Aera = () => (
    <div className="experience-section">
        <h1 className="company-name">Aera Technology</h1>

        <div className="timeline">
            {/* Software Engineer 2 */}
            <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                    <div className="role-header">
                        <h2 className="role-title">Software Engineer 2</h2>
                        <span className="role-dates">May 2025 - Present</span>
                    </div>

                    <CollapsibleProject title="AgenticAI – Platform to Create and Run Agents" defaultExpanded={true}>
                        <ul className="achievements">
                            <li>
                                Designed and developed responsive UIs for Agent, Agent Teams, and Agent Function
                                modules, enhancing cross-device performance and contributing to a <strong>20% increase
                                in client adoption</strong>, directly supporting onboarding of <strong>3+ new enterprise
                                clients</strong>.
                            </li>
                            <li>
                                Developed an interactive typeahead text editor with dynamic prompt entry and parameter
                                insertion, incorporated color-coded syntax highlighting for selected parameters from a
                                dropdown, enhancing usability and readability.
                            </li>
                        </ul>
                    </CollapsibleProject>

                </div>
            </div>

            {/* Software Engineer 1 */}
            <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                    <div className="role-header">
                        <h2 className="role-title">Software Engineer 1</h2>
                        <span className="role-dates">June 2022 - May 2025</span>
                    </div>

                    <CollapsibleProject title="Aera React Library – UI Library for Aera" defaultExpanded={false}>
                        <ul className="achievements">
                            <li>
                                Designed, developed, and maintained a centralized UI component library used across
                                the entire Aera product suite, promoting design consistency and reducing UI code
                                duplication by <strong>40%</strong>, accelerating development velocity across
                                <strong> 5+ teams</strong>.
                            </li>
                            <li>
                                Engineered a diverse range of custom, high-performance UI components tailored for
                                both functionality and design consistency, including:
                                <ul className="sub-achievements">
                                    <li>
                                        <strong>Error Screen:</strong> Reusable fallback UI for application-level
                                        errors, improving error handling UX and reducing support tickets by
                                        <strong>15%</strong>.
                                    </li>
                                    <li>
                                        <strong>Main Header:</strong> Dynamic, responsive navigation component enabling
                                        quick integration of user actions and branding for multiple modules.
                                    </li>
                                    <li>
                                        <strong>Generic Grid:</strong> Configurable, data-driven grid supporting sorting,
                                        filtering, and pagination, reused across <strong>10+ views</strong> with minimal
                                        customization.
                                    </li>
                                    <li>
                                        <strong>Editable Label:</strong> An inline-editing component with validation,
                                        enabling seamless user interactions for editable text fields.
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </CollapsibleProject>

                    <CollapsibleProject title="Discovery – A Data Visualization Platform" defaultExpanded={false}>
                        <ul className="achievements">
                            <li>
                                Designed and implemented a Custom Attribute Creation dialog, allowing users to define
                                and manage custom dimensions or measures. Integrated dynamic form handling and validation,
                                enabling seamless attribute addition to specified data sources for real-time data analysis.
                            </li>
                            <li>
                                Integrated AG Grid to handle large-scale customer datasets with high performance,
                                implementing sorting, filtering, and pagination. Improved data accessibility and
                                exploration, leading to a <strong> 40% boost in analyst efficiency</strong> and enhanced
                                user satisfaction for power users.
                            </li>
                        </ul>
                    </CollapsibleProject>
                </div>
            </div>

            <div className="summary">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                    <div className="role-header">
                        <h2 className="role-title">Summary</h2>
                    </div>
                    <CollapsibleProject title="Key Achievements" defaultExpanded={false}>
                        <ul className='achievements'>
                            <li>
                                Successfully migrated a large-scale legacy codebase from ExtJS to React, leading to a
                                <strong> 40% improvement in performance</strong> and enhanced maintainability.
                            </li>
                            <li>
                                Led the design and implementation of Micro Frontends for modular scalability across
                                multiple platform modules.
                            </li>
                            <li>
                                Created and maintained extensive technical documentation and API references to improve
                                onboarding, knowledge transfer, and development workflows.
                            </li>
                            <li>
                                Collaborated with cross-functional teams to optimize core application performance by
                                <strong> 50%</strong>, implementing lazy loading, efficient state handling, and custom hooks.
                            </li>
                        </ul>
                    </CollapsibleProject>
                </div>
            </div>
        </div>
    </div>
);

export const Coditas = () => (
    <div className="experience-section">
        <h1 className="company-name">Coditas</h1>

        <div className="timeline">
            {/* Frontend Developer */}

            <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                    <div className="role-header">
                        <h2 className="role-title">Frontend Developer</h2>
                        <span className="role-dates">Jan 2022 - May 2022</span>
                    </div>
                    <CollapsibleProject title="Key Responsibilities & Achievements" defaultExpanded={true}>
                        <ul className='achievements'>
                            <li>
                                Built dynamic, data-driven web pages using Angular, Angular Material, and SCSS,
                                delivering interactive UI experiences.
                            </li>
                            <li>
                                Utilized Angular Services and RxJS Observables to manage asynchronous data streams
                                and enhance UI responsiveness.
                            </li>
                            <li>
                                Optimized API performance by restructuring data fetch logic, resulting in
                                <strong> 15% faster load times</strong> and better end-user experience.
                            </li>
                            <li>
                                Collaborated in Agile teams to implement feature enhancements, conduct peer code
                                reviews, and participate in bug bash sessions.
                            </li>
                            <li>
                                Worked closely with designers and backend engineers to ensure seamless UI/UX
                                integration and adherence to project deadlines.
                            </li>
                        </ul>
                    </CollapsibleProject>
                </div>
            </div>
        </div>
    </div>
)