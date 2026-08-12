export type Project = {
  id: string
  title: string
  kind: string
  when: string
  summary: string
  points?: string[]
  stack: string[]
  href?: string
}

export const projects: Project[] = [
  {
    id: 'terminus',
    title: 'Numerical-methods evaluation tasks',
    kind: 'Scientific computing',
    when: 'Jul 2026',
    summary:
      'Authored evaluation tasks in scientific computing and statistics, each requiring both the implementation and a defensible difficulty calibration — then iterated on them under review.',
    points: [
      'QR / Gram–Schmidt orthogonality loss — classical vs. modified, and where orthogonality degrades numerically.',
      'Wampler polynomial regression via normal equations — the canonical ill-conditioning benchmark.',
      'Bessel Jₙ downward recurrence — stability direction in recurrence relations.',
      'Polynomial resultants (Sylvester matrix, Bareiss algorithm) — fraction-free elimination.',
      'Staggered difference-in-differences with conditional trends, and conjoint AMCE under restricted randomisation.',
      'Mixture cure models with a standardised cure fraction — survival analysis.',
    ],
    stack: ['Python', 'NumPy', 'Statistics'],
  },
  {
    id: 'resume-chat',
    title: 'Resume chat site',
    kind: 'Full stack · AI',
    when: 'Feb 2026',
    summary:
      'A conversational interface over resume content: PDF parsing to extract structured data, OpenAI integration for semantic search, and a manual-entry fallback for when parsing cannot recover a document.',
    stack: ['React', 'OpenAI', 'PDF parsing'],
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
    href: 'https://github.com/pvraman14',
  },
]

// early JS builds — kept as a footnote rather than a feature
export const playground = {
  label: 'Early JavaScript builds',
  note: '10 small interactive apps — canvas drawing, API clients, DOM utilities.',
  href: 'https://projects-portfolio-pi-opal.vercel.app/',
}
