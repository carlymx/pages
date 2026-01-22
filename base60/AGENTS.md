# AGENTS.md - Base Converter Project

This document provides comprehensive guidelines for AI agents working on this codebase.

## Project Overview

A single-page web-based number base converter supporting Decimal (10), Binary (2), Octal (8), Duodecimal (12), Hexadecimal (16), and Base 60 conversions. Features real-time conversion with automatic base detection, manual base selection, bilingual interface (Spanish/English), dark/light theme support, conversion history with CSV export, and offline PWA capability.

**Technology Stack**: Vanilla HTML5, CSS3, JavaScript (ES6+), Service Worker API, Web App Manifest
**Architecture**: Single-page application with no build system or external dependencies
**Storage**: localStorage for user preferences and conversion history

## Build/Lint/Test Commands

This project uses vanilla HTML/CSS/JS with no build system, making it extremely lightweight and deployable anywhere.

### Development Server

```bash
# Start local development server (Python 3)
python3 -m http.server 8080

# Alternative using Node.js (if available)
npx http-server -p 8080

# Open in browser
# http://localhost:8080
```

### Testing

**Current State**: No automated tests exist. Manual testing is performed by opening `index.html` in a browser.

**Recommended Testing Setup** (for future implementation):
```bash
# Install testing dependencies (if adding automated tests)
npm init -y
npm install --save-dev jest jsdom

# Run all tests
npm test

# Run single test file
npm test -- conversion.test.js

# Run tests in watch mode
npm run test:watch
```

**Manual Testing Checklist**:
- [ ] Open `index.html` in Chrome, Firefox, Safari, and Edge
- [ ] Test all base conversions (decimal, binary, octal, duodecimal, hex, base60)
- [ ] Test automatic base detection with various inputs
- [ ] Test manual base selection when multiple options available
- [ ] Test language switching (ES/EN)
- [ ] Test theme switching (light/dark)
- [ ] Test copy-to-clipboard functionality
- [ ] Test history saving and CSV export
- [ ] Test PWA installation and offline functionality
- [ ] Test responsive design on mobile devices
- [ ] Test input validation with invalid characters and negative numbers

### Linting

**Current State**: No linting configured.

**Recommended Linting Setup**:
```bash
# Install ESLint for JavaScript
npm install --save-dev eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise

# Create .eslintrc.js
# Run linting
npx eslint index.html  # Note: ESLint doesn't natively support inline scripts

# For future modularization
npx eslint js/*.js
```

**Code Quality Checks**:
- Validate HTML5 compliance: `npx html-validator index.html`
- Check CSS validity: Manual review or online validators
- Test accessibility: `npx lighthouse http://localhost:8080 --view`

## Code Style Guidelines

### General Principles

- **Simplicity First**: Keep code readable and maintainable. Avoid over-engineering.
- **Single Responsibility**: Each function should do one thing well.
- **Progressive Enhancement**: Core functionality works without JavaScript.
- **Performance**: Optimize for fast initial load and responsive interactions.
- **Accessibility**: Ensure WCAG 2.1 AA compliance.
- **Cross-browser**: Support modern browsers (last 2 versions).

### HTML Structure

**Semantic HTML**:
- Use semantic elements: `<header>`, `<main>`, `<section>`, `<button>`, `<label>`
- Include proper `lang` attribute on root element
- Add `aria-label` or `aria-labelledby` for screen readers
- Use `data-*` attributes for JavaScript hooks instead of classes

**Best Practices**:
- Include viewport meta tag for responsive design
- Add proper title and meta descriptions
- Structure logically: header → main content → footer
- Keep HTML clean; avoid inline styles and scripts in production

### CSS Architecture

**CSS Variables (Custom Properties)**:
- Prefix with `--` (e.g., `--bg-color`, `--text-color`, `--accent-color`)
- Group related variables (colors, spacing, typography)
- Use CSS custom properties for theming support

**Selectors and Specificity**:
- Prefer classes over IDs for styling
- Use BEM-like naming: `.component__element--modifier`
- Avoid `!important` declarations
- Use attribute selectors for state: `[data-theme="dark"]`

**Layout and Responsive Design**:
- Mobile-first approach with `min-width` media queries
- Use `rem` for font sizes, `px` for borders, `em` for spacing
- Implement fluid typography with `clamp()` where supported
- Test on multiple screen sizes: 320px, 768px, 1024px, 1440px

**Animations and Transitions**:
- Use `transition` for state changes (0.2-0.3s duration)
- Prefer CSS animations over JavaScript for performance
- Respect `prefers-reduced-motion` media query
- Use `will-change` sparingly for performance-critical animations

### JavaScript Architecture

**Language Features**:
- Use ES6+ features: `const`/`let`, arrow functions, template literals
- Prefer `const` by default; use `let` only for reassignment
- Use async/await for asynchronous operations (when applicable)

**Variable Naming**:
- Use camelCase for variables and functions: `conversionCount`, `selectedBase`
- Use PascalCase for constructor functions: `ConversionResult`
- Use UPPER_SNAKE_CASE for constants: `MAX_HISTORY_LENGTH`
- Be descriptive: `inputValue` over `val`, `processConversion` over `convert`

**Function Design**:
- Keep functions small (< 30 lines when possible)
- Use named functions for better debugging
- Pure functions preferred when possible
- Return early for error conditions

**State Management**:
- Centralize state in a single object: `const state = { lang, theme, history }`
- Use localStorage for persistence with clear key names
- Validate state on load and provide defaults
- History saves only when base is manually selected via options

**Error Handling**:
- Validate inputs before processing
- Return `null` or empty objects for invalid states
- Use try-catch for external API calls (navigator.clipboard)
- Show user-friendly feedback via toast notifications
- Log errors to console in development

**Performance Optimizations**:
- No debounce on input handlers for immediate response
- Use `BigInt` for large numbers to avoid precision loss
- Cache DOM queries when used multiple times
- Use event delegation for dynamically created elements

### Event Handling

**Best Practices**:
- Use `addEventListener` instead of inline handlers
- Store timeout references on `window` for cleanup: `window.debounceTimeout`
- Remove event listeners when components are destroyed
- Use passive listeners for scroll/touch events

**Accessibility**:
- Ensure all interactive elements are keyboard accessible
- Add proper ARIA attributes for dynamic content
- Support keyboard navigation (Tab, Enter, Space, Escape)
- Announce dynamic changes to screen readers

### Internationalization (i18n)

**Translation Structure**:
- Store translations in nested object: `const T = { es: { key: 'value' }, en: { key: 'value' } }`
- Use data attributes for translatable content: `<div data-i18n="title">`
- Update all text when language changes
- Fall back to English if translation missing

**Locale-Specific Formatting**:
- Use `toLocaleString()` for numbers and dates
- Respect user locale for time/date formatting
- Test with RTL languages if expanding support

### Security Considerations

**Input Validation**:
- Sanitize all user inputs before processing
- Validate number formats and base ranges
- Prevent code injection through DOM manipulation
- Use `innerText` or `textContent` over `innerHTML`

**Storage Security**:
- Never store sensitive data in localStorage
- Validate data from localStorage before using
- Clear sensitive data on logout (if applicable)

### Code Organization

**File Structure**:
```
base60/
├── index.html           # Main application (HTML + CSS + JS)
├── sw.js                # Service Worker for PWA
├── manifest.json        # Web App Manifest
├── README.md            # User documentation
├── AGENTS.md           # Agent guidelines (this file)
├── KNOWN_ISSUES.md     # Bug tracking and limitations
└── icons/
    ├── generate-icons.html  # Icon generation tool
    ├── icon-192.png     # PWA icons
    └── icon-512.png
```

**Inline Scripts**: For this single-file application, JavaScript is embedded in `<script>` tags within `index.html`. Future modularization should separate concerns:

```
js/
├── app.js              # Main application logic
├── conversion.js       # Number conversion utilities
├── ui.js               # DOM manipulation and events
├── storage.js          # localStorage management
├── i18n.js             # Internationalization
└── theme.js            # Theme management
```

### Testing Strategy

**Unit Tests** (when implemented):
- Test conversion functions with various inputs
- Test base detection logic with edge cases
- Test validation functions
- Mock localStorage and navigator APIs

**Integration Tests**:
- Test complete conversion workflows
- Test theme and language switching
- Test history management
- Test PWA functionality

**Manual Testing**:
- Cross-browser compatibility
- Mobile responsiveness
- Accessibility with screen readers
- Performance on low-end devices

### Deployment and Maintenance

**Version Control**:
- Use semantic versioning: major.minor.patch
- Update CACHE_NAME in sw.js for PWA cache invalidation
- Tag releases in git

**Performance Monitoring**:
- Monitor Core Web Vitals
- Test on slow connections (3G simulation)
- Profile JavaScript execution time

**Browser Support**:
- Target modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Graceful degradation for older browsers
- Use feature detection over browser detection

## Common Tasks

### Adding a New Base

1. Update `CHARS60` if needed for new character set
2. Add conversion logic in `convert()` function
3. Add result display in HTML template
4. Update `T` object with translations
5. Add to CSV export headers
6. Test with various inputs and edge cases

### Adding a New Language

1. Add new key to `T` object with all translations
2. Update language toggle logic
3. Add flag emoji or language indicator
4. Test date/time formatting for locale
5. Update manifest.json descriptions if needed

### Modifying Base Detection

1. Update `getPossibleBases()` function logic
2. Consider performance impact on large inputs
3. Test with ambiguous inputs (e.g., "10")
4. Update documentation and examples
5. Ensure backward compatibility

### Performance Optimization

1. Profile with browser dev tools
2. Optimize conversion algorithms for large numbers
3. Implement virtual scrolling for long histories
4. Lazy load non-critical features
5. Minimize DOM manipulations

### Accessibility Improvements

1. Add ARIA labels and descriptions
2. Implement keyboard navigation
3. Test with screen readers
4. Ensure sufficient color contrast
5. Add focus management for modals

## Quality Assurance Checklist

- [ ] Code follows style guidelines
- [ ] All functions have single responsibility
- [ ] Error handling implemented
- [ ] Accessibility features added
- [ ] Cross-browser tested
- [ ] Performance optimized
- [ ] Documentation updated
- [ ] Manual testing completed
- [ ] No console errors in production
