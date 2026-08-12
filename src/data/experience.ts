export type Role = {
  id: string
  title: string
  company: string
  when: string
  current?: boolean
  blurb: string
  highlights: string[]
}

export const roles: Role[] = [
  {
    id: 'se2',
    title: 'Software Engineer II',
    company: 'Aera Technology',
    when: 'May 2025 — Present',
    current: true,
    blurb:
      'Cognitive Workbench configuration surfaces, the agentic AI authoring platform, and the self-registration funnel — plus platform-wide migrations spanning the whole micro-frontend fleet.',
    highlights: [
      'Built the Action Item schema authoring surface end to end, following the repo’s feature-scoped createContext + useReducer store pattern rather than reaching for Redux.',
      'Extended the shared component library’s GuidedForm primitives, then consumed them from two host apps — the library-first approach that keeps micro-frontends consistent instead of each app growing its own variant.',
      'Shipped the signup funnel from static screens through API integration: consent gating, OTP verification with resend cooldown and attempt limits, and account setup — each step with accompanying tests.',
    ],
  },
  {
    id: 'se1',
    title: 'Software Engineer I',
    company: 'Aera Technology',
    when: 'Jun 2022 — May 2025',
    blurb:
      'The shared UI library used across the Aera product suite, and analytics capability work on the Discovery canvas.',
    highlights: [
      'Designed and maintained a centralized component library consumed across the entire Aera product suite, reducing UI code duplication by 40% and accelerating delivery across 5+ teams.',
      'Built full clipboard semantics for the analytics canvas — multi-object copy and paste with positions, titles and bound filter cards intact, including cross-sheet persistence.',
      'Delivered Quick Actions, a feature spanning three independently published repositories, threading an isQuickAction flag through three app boundaries so the shortcut path could not collide with the normal creation flow.',
      'Analytics capability work: freeze/unfreeze columns, Top-N filters on attributes not present in the visual, legend fields in advanced sort, and blank/not-blank measure operators.',
    ],
  },
  {
    id: 'coditas',
    title: 'Frontend Developer',
    company: 'Coditas',
    when: 'Jan 2022 — May 2022',
    blurb:
      'Angular work under real delivery constraints — where the fundamentals of reactive data flow and design-to-UI fidelity were built.',
    highlights: [
      'Built dynamic, data-driven web pages using Angular, Angular Material and SCSS, delivering interactive UI experiences.',
      'Used Angular Services and RxJS Observables to manage asynchronous data streams and improve UI responsiveness.',
      'Optimised API performance by restructuring data-fetch logic, resulting in 15% faster load times.',
      'Worked in Agile teams on feature enhancements, peer code review, and bug-bash sessions.',
      'Partnered with designers and backend engineers to keep UI/UX integration faithful to the design.',
    ],
  },
]
