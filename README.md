# Portfolio — P Venkat Raman

Personal portfolio site. React + TypeScript + Vite, SCSS for styling, Framer Motion for animation, and a Netlify Function behind the contact form.

[LinkedIn](https://www.linkedin.com/in/p-venkat-raman-3083b9195/) · [GitHub](https://github.com/pvraman14)

## Setup

Requires Node 18+ (Vite 5 uses syntax older runtimes cannot parse).

```bash
npm install
npm run dev
```

Runs at `http://localhost:5173`.

To work on the contact form, run the Netlify dev server instead so the function is available:

```bash
cp .env.example .env   # fill in EMAIL_USER and EMAIL_PASS
npm run dev:netlify
```

`EMAIL_PASS` is a Gmail App Password, not the account password. See `EMAIL_SETUP.md`.

## Scripts

| Command | Does |
|---|---|
| `npm run dev` | Dev server with HMR |
| `npm run dev:netlify` | Dev server plus Netlify Functions |
| `npm run build` | Type-check (`tsc -b`) then build to `dist/` |
| `npm run preview` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## Structure

```
src/
├── components/
│   ├── hero/           # landing block
│   ├── trajectory/     # career timeline
│   ├── casestudies/    # engineering record — expandable cards
│   ├── systems/        # tech the work runs on
│   ├── projects/       # independent project tiles
│   ├── orbit/          # canvas-rendered skills system
│   ├── section/        # shared section shell (eyebrow, title, lede)
│   ├── reveal/         # scroll-triggered entrance wrapper
│   ├── Terminal.tsx    # CLI overlay
│   ├── Starfield.tsx   # animated background
│   ├── Contact.tsx     # contact form
│   ├── ContactModal.tsx
│   ├── ThemeToggle.tsx
│   └── Footer.tsx
├── contexts/           # ThemeContext provider + context object
├── hooks/              # useTheme, useIsMobile
├── data/               # all page content lives here
│   ├── profile.ts
│   ├── experience.ts
│   ├── caseStudies.ts
│   ├── projects.ts
│   └── skills.ts
└── styles/             # global.scss, app.scss, _variables.scss, _breakpoints.scss

netlify/functions/contact.ts   # contact form handler (nodemailer)
```

Page sections are `#trajectory`, `#record`, `#systems`, and `#work`, assembled in `App.tsx`.

## Editing content

Content is separated from components — most updates are data-only, no JSX changes.

- **Projects** — `src/data/projects.ts`. Each entry takes `title`, `kind`, `when`, `summary`, `stack`, and optional `href` (title link) and `repo` (renders a "View source" link).
- **Engineering record** — `src/data/caseStudies.ts`. `points` are the bullets; `reveal` is the collapsed panel behind the toggle.
- **Experience / skills / profile** — `experience.ts`, `skills.ts`, `profile.ts` in the same folder.

## Theming

Three-way theme: system, light, dark. `ThemeContext` writes a `data-theme` attribute on the document root and persists the choice to localStorage under `portfolio-theme`; in system mode it follows `prefers-color-scheme` live.

Colors are CSS custom properties in `src/styles/_variables.scss`. Adding a themed value means declaring it under both `:root` and `[data-theme='dark']`, then referencing it as `var(--name)`.

## Terminal

Toggle with `Ctrl`/`Cmd` + `` ` `` or the terminal button in the header. Commands: `help`, `whoami`, `ledger`, `roles`, `record`, `work`, `contact`, `clear`. New commands go in the `switch` inside `buildOutput` in `src/components/Terminal.tsx`, with a matching line in `HELP`.

## Notes

- Import assets at the top of the file rather than referencing them by string path — relative string paths break in production builds.
- Deploys to Netlify: build `npm run build`, publish `dist`, with an SPA redirect to `index.html` (see `netlify.toml`).
