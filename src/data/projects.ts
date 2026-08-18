export type Project = {
  id: string
  title: string
  kind: string
  when: string
  summary: string
  points?: string[]
  stack: string[]
  href?: string
  repo?: string
}

export const projects: Project[] = [
  {
    id: 'resume-chat',
    title: 'Resume chat site',
    kind: 'Full stack · AI',
    when: 'Feb 2026',
    summary:
      'A conversational interface over resume content: PDF parsing to extract structured data, OpenAI integration for semantic search, and a manual-entry fallback for when parsing cannot recover a document.',
    stack: ['React', 'OpenAI', 'PDF parsing'],
    repo: 'https://github.com/pvraman14/ResumeParserQnA',
  },
  {
    id: 'claude-toolkit',
    title: 'claude-toolkit',
    kind: 'Developer tooling',
    when: 'Mar 2026',
    summary:
      'A set of custom agents and skills — including the domain-specific agents used day to day across the Aera repositories for micro-frontend tracing, local multi-app setup, and release cherry-picking.',
    stack: ['TypeScript', 'Agent tooling'],
  },
  {
    id: 'portfolio',
    title: 'This portfolio',
    kind: 'Full stack',
    when: 'Oct 2025 — Present',
    summary:
      'Built front to back: an interactive terminal component, an orbital skills system rendered to canvas, a theme system with three-way system/light/dark resolution, and a serverless contact function.',
    stack: ['React', 'TypeScript', 'SCSS', 'Framer Motion'],
    repo: 'https://github.com/pvraman14/Portfoliov2',
  },
  {
    id: 'early-js',
    title: 'Early JavaScript builds',
    kind: 'Foundations',
    when: '2021 — 2022',
    summary:
      'Ten small interactive apps written before reaching for a framework — canvas drawing, API clients, and DOM utilities built directly against the platform.',
    stack: ['JavaScript', 'Canvas', 'DOM APIs'],
    href: 'https://projects-portfolio-pi-opal.vercel.app/',
    repo: 'https://github.com/pvraman14/projects-portfolio',
  },
]
