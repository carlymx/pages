# AGENTS.md - Guidelines for Agentic Coding

## Build/Lint/Test Commands

### Backend (Node.js/Express)
```bash
cd backend
npm start              # Start production server (port 5000)
npm run dev            # Start dev server with nodemon
```

### Frontend (React/Vite)
```bash
cd frontend
npm run dev            # Start dev server (port 5173)
npm run build          # Build for production
npm run preview        # Preview production build
npm run lint           # Run ESLint
```

### Full Stack
```bash
npm start              # Start both backend and frontend
npm run install:all    # Install dependencies for both
```

### Running Tests
**Note:** No test framework is currently configured. When adding tests:
- Use Jest for backend and React Testing Library/Vitest for frontend
- To run a single test once configured:
```bash
# Backend
cd backend && npm test -- path/to/test.js
# Frontend  
cd frontend && npm test -- path/to/test.jsx
```

## Code Style Guidelines

### Import Style

**Backend (CommonJS):**
```javascript
const express = require('express');
const cors = require('cors');
const { generateImage } = require('./imageGenerator');
```

**Frontend (ES Modules):**
```javascript
import { useState, useEffect } from 'react';
import './App.css';
```

**Import order:** Node.js/React core → External packages → Local modules → CSS files

### Naming Conventions

- **Variables/CamelCase:** `imageData`, `backgroundColor`, `handleGenerate`
- **Constants/UPPER_SNAKE_CASE:** `PORT`, `MAX_ITER`
- **Functions/CamelCase:** `generateImage()`, `hexToRgb()`, `drawCircle()`
- **Components/PascalCase:** `App`, `GalleryItem`, `ControlPanel`
- **Files:** kebab-case utilities (`image-generator.js`), PascalCase React components (`App.jsx`)

### Formatting

- **Indentation:** 2 spaces (backend and frontend)
- **Line length:** Prefer <100 characters
- **Semicolons:** Required (enforced by ESLint)
- **Quotes:** Single quotes (`'string'`)
- **Template literals:** Use backticks for interpolation (`` `${variable}` ``)

### Types & Variables

**Backend (JavaScript):** Use parameter destructuring with defaults:
```javascript
async function generateImage(params) {
  const { width = 256, height = 256, bgColor = '#000000' } = params;
}
```

**Frontend (React):** State with useState hooks:
```javascript
const [params, setParams] = useState({ width: 256 });
```

### Error Handling

**Backend:**
```javascript
app.post('/api/generate', async (req, res) => {
  try {
    const result = await operation();
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
```

**Frontend:**
```javascript
try {
  const response = await fetch(url);
  const data = await response.json();
  if (data.success) { /* handle success */ }
} catch (error) {
  console.error('Error:', error);
  alert('Error message for user');
}
```

### React Component Patterns

- Use functional components with hooks (no class components)
- Destructure props: `function MyComponent({ param1, param2 }) {}`
- Export default: `export default App;`
- Keep state simple; avoid context/Redux for simple apps

### API Responses

**Success:** `res.json({ success: true, image: imageData });`
**Error:** `res.status(500).json({ success: false, error: error.message });`

### Language Preference

**Spanish for:** User-facing text (UI, alerts, error messages), console logs, comments
**English acceptable for:** Variable/function names, API endpoints (`/api/generate`), technical docs

### File Organization

**Backend:** `server.js` (main Express), `imageGenerator.js` (core logic), `package.json`
**Frontend:** `src/App.jsx` (main), `src/App.css`, `src/main.jsx` (entry), `src/index.css`

### Performance Considerations

- Limit max iterations for fractals (currently 100)
- Max 1000x1000 pixels for generated images
- Use async/await for all API calls and image processing
- CORS configured for development (adjust for production)
- Use seeded random (`seededRandom`) for reproducible variations in algorithms

### Image Generation Specifics

**Color handling:** Convert between hex (`#000000`) and RGB objects (`{r: 0, g: 0, b: 0}`):
```javascript
const hexToRgb = (hex) => { /* convert hex to {r,g,b} */ };
const colorRGB = { r: 255, g: 255, b: 255 };
image.setPixelColor(Jimp.rgbaToInt(colorRGB.r, colorRGB.g, colorRGB.b, 255), x, y);
```

**Algorithms:** `basic`, `mandelbrot`, `julia`, `perlin`, `sierpinski`, `koch`
**Shapes:** `circle`, `square`, `line`
**Patterns:** `dots`, `stripes`, `gradient`

**Randomization:** Each image should receive a unique `seed` parameter (default `Date.now()`):
```javascript
async function generateImage({ seed = Date.now(), ...params }) {
  const rng = seededRandom(seed);
}
```

### Git Workflow

- This is NOT a git repository yet
- Initialize with `.gitignore`: `node_modules/`, `.DS_Store`, `dist/`, `build/`, `*.log`
- Use feature branches for new algorithms or UI changes
