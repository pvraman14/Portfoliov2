# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with React, TypeScript, Vite, and SCSS. It features an interactive CLI-style terminal, dark/light theme support, and animated UI components using Framer Motion.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint TypeScript/TSX files
npm run lint

# Format code with Prettier
npm run format
```

## Architecture

### Core Application Structure

- **Entry Point**: `src/main.tsx` - Sets up React app with BrowserRouter and StrictMode
- **Root Component**: `src/App.tsx` - Main app layout wrapped in ThemeProvider with AnimatePresence
- **Main Layout**: Single-page application with header, hero section, skills, experience tabs, projects, and about sections

### Key Components

#### Theme System
- **ThemeContext** (`src/contexts/ThemeContext.tsx`): Global theme state management
  - Supports 'light' and 'dark' modes
  - Persists theme preference to localStorage with key `'portfolio-theme'`
  - Respects system preference on first load via `prefers-color-scheme`
  - Sets `data-theme` attribute on document root for CSS variable switching
  - Exports `useTheme()` hook for consuming theme state

#### Terminal Component
- **Terminal** (`src/components/Terminal.tsx`): Interactive CLI-style terminal overlay
  - Toggle with Ctrl/Cmd + ` keyboard shortcut
  - Available commands: `help`, `about`, `projects`, `contact`, `clear`
  - Uses forwardRef to expose `toggleOpen()` method to parent
  - Animated entrance/exit with Framer Motion

#### Skills Section
- **Skills** (`src/components/skills/Skills.tsx`): Grid of technology icons
  - Uses react-icons for icon components
  - Icon string names mapped to actual components via `iconMap`
  - Hover animation with Framer Motion scale effect

#### Experience Tabs
- **Tabs** (`src/components/tabs/Tabs.tsx`): Company experience viewer
  - Tab-based UI for switching between different companies
  - Company data includes logo, name, and description component
  - Animated transitions between tabs using Framer Motion variants
  - Experience details in `Experience.tsx` component

### Styling Architecture

- **SCSS with CSS Variables**: Theme-aware styling using CSS custom properties
- **Theme Variables** (`src/styles/_variables.scss`):
  - Light theme: `--bg`, `--text`, `--muted`, `--accent`, `--card`, `--tab`
  - Dark theme: Defined under `[data-theme='dark']` selector
- **Component Styles**: Co-located SCSS files alongside components
- **Global Styles**: `src/styles/global.scss` imported in main.tsx

### Animation Strategy

- **Framer Motion** is used throughout for:
  - Page/section entrance animations (opacity + y-axis)
  - Component transitions (AnimatePresence for enter/exit)
  - Hover effects (scale transforms)
  - Tab content switching with custom variants

## Important Implementation Details

### Theme Implementation
When adding new themed elements:
1. Add CSS variables to `src/styles/_variables.scss` under both `:root` and `[data-theme='dark']`
2. Reference variables in SCSS with `var(--variable-name)`
3. Theme changes automatically via `data-theme` attribute on document root

### Terminal Commands
To add new terminal commands:
1. Add command and response to `COMMANDS` object in `src/components/Terminal.tsx:11`
2. Update help text in the same file

### Asset References
Assets are referenced with relative paths from src: `"../src/assets/filename"`

### Keyboard Shortcuts
- Ctrl/Cmd + ` toggles terminal (defined in both App.tsx:17-25 and Terminal.tsx:26-34)

## Technology Stack

- **Build Tool**: Vite 5.3.8
- **Framework**: React 18.2.0 with TypeScript 5.3.2
- **Router**: React Router DOM 6.14.0
- **Animation**: Framer Motion 10.12.5
- **Icons**: React Icons 5.5.0
- **Styling**: SCSS (Sass 1.93.0) with CSS custom properties
- **Code Quality**: ESLint + Prettier
