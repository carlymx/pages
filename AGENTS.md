# AGENTS.md - Guidelines for Agentic Coding

This document provides comprehensive guidelines for AI agents working on this multi-project codebase. The repository contains several independent web projects deployed to GitHub Pages.

## Repository Overview

**Structure**: Collection of interactive web projects and applications
**Deployment**: GitHub Pages (static hosting)
**Languages**: HTML5, CSS3, JavaScript (ES6+), React, Node.js/Express
**Projects**:
- `base60/` - Number base converter (vanilla JS)
- `img-generador/` - NFT gallery generator (React/Node.js full-stack)
- `arena/` - WebArena color theme explorer
- `esfera-3d/` - Interactive 3D sphere (Three.js)
- `sudoku-nord/` - Sudoku game with Nord theme
- `caotic_pendulum/` - Chaotic double pendulum simulation
- `themes/` - Color palette and theme tools

## Build/Lint/Test Commands

### Global Commands
```bash
# Install all dependencies across projects
find . -name "package.json" -execdir npm install \;

# Run all lints
find . -name "package.json" -execdir sh -c 'cd "$(dirname "{}")" && npm run lint 2>/dev/null || true' \;

# Development server for static projects
python3 -m http.server 8080  # or npx http-server -p 8080
```

### NFT Gallery Generator (img-generador/)
```bash
cd img-generador

# Full stack development
npm start              # Start both backend (port 5000) and frontend (port 5173)
npm run install:all    # Install all dependencies

# Backend only
npm run backend        # Production server
npm run backend:dev    # Development with nodemon

# Frontend only
npm run frontend       # Vite dev server
npm run frontend:build # Production build
npm run lint           # ESLint check

# Testing (when implemented)
npm test               # Run tests
npm test -- path/to/test.js  # Single test file
```

### Static Projects (base60/, arena/, etc.)
```bash
# No build process - serve directly
python3 -m http.server 8080

# For base60 PWA development
cd base60 && python3 -m http.server 8080
# Test PWA: http://localhost:8080/manifest.json
```

### Recommended Testing Setup
```bash
# Install testing for React projects
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Run tests
npm test                    # All tests
npm test -- --watch         # Watch mode
npm test -- --coverage      # With coverage
npm test path/to/test.js     # Single test

# For static projects - manual testing checklist
# - Open index.html in multiple browsers
# - Test responsive design (320px, 768px, 1024px)
# - Test accessibility with screen readers
# - Test PWA functionality (if applicable)
```

## Code Style Guidelines

### General Principles
- **Consistency**: Follow existing patterns in each project
- **Simplicity**: Prefer readable, maintainable code over complex solutions
- **Performance**: Optimize for fast initial load and smooth interactions
- **Accessibility**: WCAG 2.1 AA compliance where applicable
- **Cross-browser**: Support modern browsers (last 2 versions)

### Language-Specific Guidelines

#### JavaScript (All Projects)
```javascript
// Naming conventions
const camelCaseVariable = 'value';
const CONSTANT_VALUE = 'constant';
function camelCaseFunction() { /* ... */ }

// Modern ES6+ features
const { prop1, prop2 } = object;
const result = await asyncFunction();
const template = `Hello ${name}!`;

// Error handling
try {
  const result = riskyOperation();
  return result;
} catch (error) {
  console.error('Error:', error);
  throw new Error('User-friendly message');
}
```

#### React Components (img-generador/frontend/)
```javascript
// Functional components with hooks
import { useState, useEffect } from 'react';

function GalleryItem({ image, onSelect }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Component logic
  }, []);

  return (
    <div className="gallery-item">
      {loading && <div>Loading...</div>}
    </div>
  );
}

export default GalleryItem;
```

#### Node.js/Express (img-generador/backend/)
```javascript
// CommonJS modules
const express = require('express');
const cors = require('cors');

// Async/await for API routes
app.post('/api/generate', async (req, res) => {
  try {
    const { params } = req.body;
    const result = await generateImage(params);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
```

### Formatting Standards
- **Indentation**: 2 spaces (all projects)
- **Line Length**: <100 characters preferred
- **Semicolons**: Required
- **Quotes**: Single quotes for JS (`'string'`), double for JSX (`"string"`)
- **Braces**: Same line for functions, new line for classes
- **Trailing Commas**: Include in multiline objects/arrays

### Import/Export Patterns
```javascript
// ES Modules (React/frontend)
import React, { useState } from 'react';
import { generateImage } from '../utils/imageGenerator';
import './App.css';

// CommonJS (Node.js/backend)
const express = require('express');
const { generateImage } = require('./imageGenerator');

// Import order: React → External packages → Local modules → CSS
```

### CSS Architecture
```css
/* CSS Variables for theming */
:root {
  --primary-color: #007bff;
  --bg-color: #ffffff;
  --text-color: #333333;
}

/* BEM-like naming */
.component__element {
  /* styles */
}

.component__element--modifier {
  /* modifier styles */
}

/* Mobile-first responsive design */
@media (min-width: 768px) {
  .component {
    /* tablet+ styles */
  }
}
```

### File Organization

#### Static Projects (base60/, arena/, etc.)
```
project/
├── index.html      # Main HTML with inline CSS/JS
├── README.md       # Project documentation
└── assets/         # Images, icons, additional files
```

#### Full-Stack Project (img-generador/)
```
img-generador/
├── backend/
│   ├── server.js           # Express server
│   ├── imageGenerator.js   # Core image logic
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Main React component
│   │   ├── App.css         # Component styles
│   │   └── main.jsx        # React entry point
│   ├── index.html          # HTML template
│   └── package.json
└── package.json            # Workspace config
```

### Error Handling Patterns

#### Frontend (React)
```javascript
const [error, setError] = useState(null);

const handleSubmit = async () => {
  try {
    setError(null);
    const response = await fetch('/api/generate');
    if (!response.ok) throw new Error('API request failed');
    const data = await response.json();
    // Handle success
  } catch (err) {
    setError(err.message);
    console.error('Submit error:', err);
  }
};
```

#### Backend (Express)
```javascript
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : error.message
  });
});
```

### Performance Considerations
- **Images**: Optimize for web (WebP, lazy loading, responsive images)
- **JavaScript**: Minimize bundle size, use code splitting
- **API**: Implement proper caching, limit request rates
- **PWA**: Cache critical resources, provide offline functionality
- **Animations**: Use CSS transforms, respect `prefers-reduced-motion`

### Git Workflow
```bash
# Branch naming
feature/add-dark-mode
bugfix/fix-mobile-layout
refactor/cleanup-imports

# Commit messages (English)
feat: add dark mode toggle
fix: resolve mobile layout issue
refactor: clean up import statements
docs: update README with new features

# Before committing
npm run lint    # For projects with linting
npm test        # For projects with tests
```

### Testing Strategy

#### Unit Tests (Jest/React Testing Library)
```javascript
// Component test
import { render, screen, fireEvent } from '@testing-library/react';
import GalleryItem from './GalleryItem';

test('renders gallery item', () => {
  render(<GalleryItem image={mockImage} />);
  expect(screen.getByAltText('Generated image')).toBeInTheDocument();
});
```

#### Integration Tests
- Test complete user workflows
- API request/response cycles
- Form submissions and validation
- Cross-browser compatibility

#### Manual Testing Checklist
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Accessibility with keyboard navigation
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] Performance on slow connections
- [ ] PWA functionality (if applicable)
- [ ] Error handling with invalid inputs

### Security Best Practices
- **Input Validation**: Sanitize all user inputs
- **CORS**: Configure appropriately for production
- **Dependencies**: Keep packages updated, audit for vulnerabilities
- **API Keys**: Never commit secrets to repository
- **HTTPS**: Ensure secure connections in production

### Internationalization
- **Language Support**: Spanish/English where applicable
- **Date/Time**: Use `toLocaleString()` for locale-aware formatting
- **Numbers**: Respect locale-specific number formatting

### Documentation
- **README.md**: Project overview, installation, usage
- **Code Comments**: Spanish for user-facing text, English for technical
- **API Docs**: Document endpoints, parameters, responses
- **AGENTS.md**: This file - update when guidelines change</content>
<parameter name="filePath">/home/carly/Documentos/GitHub/pages/AGENTS.md