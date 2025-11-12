# Personal Portfolio - P Venkat Raman

A modern, interactive portfolio website built with React, TypeScript, and Framer Motion. Features a CLI-style terminal, theme switching, smooth animations, and a clean, professional design.

[Live Demo](#) | [LinkedIn](https://www.linkedin.com/in/p-venkat-raman-3083b9195/) | [GitHub](https://github.com/pvraman14)

## Overview

This portfolio showcases my work as a Full-stack Engineer specializing in Frontend Technologies. The project demonstrates proficiency in modern web development practices, including:

- Component-based architecture with React
- Type-safe development with TypeScript
- Smooth animations and transitions with Framer Motion
- Theme management with Context API
- Interactive CLI-style terminal interface
- Responsive design with SCSS

## Features

### Interactive Terminal
- Full-screen terminal interface activated via button or keyboard shortcut (Ctrl/Cmd + `)
- Command-line interface with built-in commands (help, about, projects, contact, clear)
- Smooth enter/exit animations
- Auto-focus on input for seamless interaction

### Theme System
- Light/Dark mode toggle
- Persistent theme preference using localStorage
- Smooth theme transitions
- CSS custom properties for easy theming

### Social Media Integration
- Animated social media icons (LinkedIn, GitHub, Email)
- Hover effects with brand-specific color gradients
- Spring-based animations for interactive feedback
- Accessible with proper ARIA labels

### Skills & Experience
- Tabbed interface for organizing content
- Skills showcase with visual presentation
- Experience timeline with company details
- Smooth tab transitions

### Projects Showcase
- Grid-based layout (responsive: 1/2/3 columns)
- Project cards with descriptions and tech stack tags
- Hover effects and smooth animations
- Easy to update project data

## Tech Stack

### Core Technologies
- **React 18.2.0** - UI library for building component-based interfaces
- **TypeScript 5.3.2** - Type-safe JavaScript for better development experience
- **Vite 5.3.8** - Fast build tool and development server
- **SCSS/Sass 1.93.0** - CSS preprocessor for advanced styling

### Libraries & Tools
- **Framer Motion 10.12.5** - Animation library for smooth, physics-based animations
- **React Icons 5.5.0** - Icon library for social media and UI icons
- **React Router DOM 6.14.0** - Client-side routing (if needed for future expansion)

### Development Tools
- **ESLint 8.54.0** - Code linting for maintaining code quality
- **Prettier 3.6.2** - Code formatting for consistent style
- **TypeScript ESLint** - TypeScript-specific linting rules

## Project Architecture

```
Portfoliov2/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Terminal.tsx      # Full-screen terminal interface
│   │   ├── Terminal.scss     # Terminal styles
│   │   ├── ThemeToggle.tsx   # Light/Dark theme switcher
│   │   ├── ThemeToggle.scss
│   │   ├── Projects.tsx      # Projects grid container
│   │   ├── ProjectCard.tsx   # Individual project card
│   │   ├── ProjectCard.scss
│   │   ├── skills/           # Skills section
│   │   │   ├── Skills.tsx
│   │   │   └── Skills.scss
│   │   └── tabs/             # Tabbed content section
│   │       ├── Tabs.tsx
│   │       ├── Tabs.scss
│   │       ├── Experience.tsx
│   │       └── Aera.scss
│   │
│   ├── contexts/             # React Context providers
│   │   └── ThemeContext.tsx  # Theme state management
│   │
│   ├── styles/               # Global styles and variables
│   │   ├── app.scss          # Main app styles
│   │   ├── global.scss       # Global CSS resets and base styles
│   │   └── _variables.scss   # SCSS variables and theme tokens
│   │
│   ├── assets/               # Images and static files
│   │   ├── profile.png
│   │   ├── profile2.png
│   │   ├── logo_aera.svg
│   │   └── coditas_logo.webp
│   │
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Application entry point
│   └── vite-env.d.ts         # Vite type definitions
│
├── public/                   # Static assets served at root
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
├── eslint.config.js          # ESLint configuration
└── README.md                 # This file
```

## Key Components

### App.tsx
Main application component that orchestrates the entire portfolio. Manages:
- Terminal open/closed state
- Conditional rendering of content vs. terminal
- Keyboard shortcuts for terminal toggle
- Layout structure (header, main content, sections)

### Terminal.tsx
Interactive CLI-style terminal component with:
- Command parsing and execution
- Command history display
- Built-in commands (help, about, projects, contact, clear)
- Full-screen mode with smooth animations
- Auto-focus input handling

### ThemeContext.tsx
React Context provider for theme management:
- Light/Dark mode state
- localStorage persistence
- Theme toggle functionality
- Mounted state to prevent hydration mismatches

### Social Links (App.tsx)
Animated social media icon links with:
- Framer Motion spring animations
- Hover effects (scale, lift, rotate)
- Brand-specific gradient backgrounds
- Accessible link attributes

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn package manager

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/pvraman14/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```
   Production files will be in the `dist/` directory

5. **Preview production build**
   ```bash
   npm run preview
   ```

### Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build production-ready bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run format` - Format code with Prettier

## Customization Guide

### Personal Information
Update personal details in [App.tsx](src/App.tsx):
- Name and title (line 34)
- Social media links (lines 66, 78, 90)
- About section (lines 115-118)

### Projects
Modify the `PROJECTS` array in [Projects.tsx](src/components/Projects.tsx):
```typescript
const PROJECTS = [
  {
    id: 'unique-id',
    title: 'Project Name',
    desc: 'Project description',
    tags: ['Tech', 'Stack', 'Tags'],
  },
  // Add more projects...
]
```

### Terminal Commands
Add custom commands in [Terminal.tsx](src/components/Terminal.tsx):
```typescript
const COMMANDS: Record<string, string> = {
  help: `Your help text`,
  custom: `Your custom command output`,
  // Add more commands...
}
```

### Theme Colors
Customize colors in [_variables.scss](src/styles/_variables.scss):
```scss
:root {
  --primary: #your-color;
  --background: #your-color;
  // Add more custom properties...
}
```

### Profile Image
Replace the profile image in [src/assets/](src/assets/) and update the path in [App.tsx](src/App.tsx#L57).

## Performance Optimizations

- **Code Splitting**: React.lazy() for route-based code splitting (ready for expansion)
- **Tree Shaking**: Vite automatically removes unused code
- **Asset Optimization**: Images optimized for web (WebP format)
- **CSS Modules**: Scoped styling prevents CSS conflicts
- **Production Build**: Minified and optimized bundle

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility

- Semantic HTML5 elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader friendly
- Color contrast compliant with WCAG guidelines

## Future Enhancements

- [ ] Blog section with MDX support
- [ ] Project filtering by technology
- [ ] Contact form with backend integration
- [ ] Analytics integration
- [ ] PWA support
- [ ] Multi-language support
- [ ] More terminal commands and Easter eggs

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

**P Venkat Raman**
- Email: [pvenkatraman1400@gmail.com](mailto:pvenkatraman1400@gmail.com)
- LinkedIn: [P Venkat Raman](https://www.linkedin.com/in/p-venkat-raman-3083b9195/)
- GitHub: [@pvraman14](https://github.com/pvraman14)

---

Built with ❤️ using React, TypeScript, and Framer Motion
