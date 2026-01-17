# Generador de Galería NFT - Full Stack

Aplicación web full-stack para generar y visualizar galerías de imágenes pixel art NFT con algoritmos matemáticos de fractales y efectos procedurales.

## 🚀 Características

- **Generación de imágenes personalizadas**: Crea imágenes pixel art de tamaño variable (16x16 hasta 1000x1000 px)
- **Algoritmos matemáticos**: Mandelbrot, Julia, Perlin Noise, Sierpinski, Koch Snowflake
- **Variables configurables**: Colores, formas, patrones y dimensiones
- **Galería interactiva**: Visualización en grid de todas las imágenes generadas
- **Exportación**: Descarga imágenes como PNG
- **Diseño moderno**: Interfaz responsiva con tema oscuro

## 🏗️ Arquitectura

- **Frontend**: React con Vite
- **Backend**: Node.js con Express
- **Procesamiento de imágenes**: JIMP (JavaScript Image Processing)
- **Ruido procedural**: Simplex Noise

## 📦 Estructura del Proyecto

```
generador/
├── backend/           # Servidor API
│   ├── server.js          # Servidor Express
│   ├── imageGenerator.js  # Lógica de generación de imágenes
│   ├── package.json
│   └── README.md
├── frontend/          # Aplicación React
│   ├── src/
│   │   ├── App.jsx       # Componente principal
│   │   ├── App.css       # Estilos
│   │   ├── main.jsx      # Entry point
│   │   └── index.css     # Estilos globales
│   ├── package.json
│   └── README.md
├── PLAN.md            # Plan de desarrollo
└── README.md          # Este archivo
```

## 🛠️ Instalación y Uso

### Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn

### Configuración del Backend

```bash
cd backend
npm install
npm start
```

El backend estará corriendo en `http://localhost:5000`

### Configuración del Frontend

```bash
cd frontend
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🎨 Algoritmos Disponibles

1. **Basic**: Generación con formas y patrones personalizables
2. **Mandelbrot**: Conjunto fractal icónico
3. **Julia**: Variante del Mandelbrot
4. **Perlin Noise**: Texturas orgánicas con ruido coherente
5. **Sierpinski**: Triángulo fractal recursivo
6. **Koch**: Copo de nieve fractal

## 📋 Parámetros de Generación

- **Tamaño**: Campos separados para ancho (X) y alto (Y)
- **Colores**: Fondo y frontal en formato HEX
- **Formas**: Círculos, cuadrados, líneas (modo basic)
- **Patrones**: Puntos, rayas, gradientes (modo basic)
- **Algoritmo**: Selección del método de generación

## 🔧 API Endpoints

### POST /api/generate

Genera una imagen basada en los parámetros proporcionados.

Ejemplo de solicitud:

```json
{
  "width": 256,
  "height": 256,
  "bgColor": "#000000",
  "fgColor": "#ffffff",
  "shapes": ["circle"],
  "patterns": ["dots"],
  "algorithm": "mandelbrot"
}
```

Respuesta:

```json
{
  "success": true,
  "image": "data:image/png;base64,..."
}
```

## 🌐 Tecnologías

### Frontend

- React 18
- Vite 5
- CSS3 (Flexbox/Grid)
- Fetch API

### Backend

- Express.js
- Node.js
- JIMP
- Simplex Noise
- CORS

## 📝 Plan de Desarrollo

Para ver el plan detallado de desarrollo, consulta el archivo [PLAN.md](PLAN.md).

## 🤝 Contribución

Este proyecto fue creado como generador de imágenes NFT con algoritmos matemáticos.

## 📄 Licencia

ISC

## 👨‍💻 Autor

Creado con propósito educativo y de experimentación con generación procedural de imágenes.