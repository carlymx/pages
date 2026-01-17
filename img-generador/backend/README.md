# Backend - Generador de Galería NFT

API Node.js/Express para generación de imágenes pixel art con algoritmos matemáticos.

## Instalación

```bash
cd backend
npm install
```

## Ejecutar servidor

Desarrollo (con autoreload):
```bash
npm run dev
```

Producción:
```bash
npm start
```

El servidor iniciará en el puerto 5000 por defecto.

## API Endpoints

### POST /api/generate

Genera una imagen basada en los parámetros proporcionados.

**Cuerpo de la solicitud:**
```json
{
  "width": 256,
  "height": 256,
  "bgColor": "#000000",
  "fgColor": "#ffffff",
  "shapes": ["circle"],
  "patterns": ["dots"],
  "algorithm": "basic"
}
```

**Parámetros:**
- `width`: Ancho de la imagen (16-1000)
- `height`: Alto de la imagen (16-1000)
- `bgColor`: Color de fondo en formato HEX
- `fgColor`: Color frontal en formato HEX
- `shapes`: Array de formas (["circle", "square", "line"])
- `patterns`: Array de patrones (["dots", "stripes", "gradient"])
- `algorithm`: Algoritmo de generación (["basic", "mandelbrot", "julia", "perlin", "sierpinski", "koch"])

**Respuesta:**
```json
{
  "success": true,
  "image": "data:image/png;base64,..."
}
```

## Algoritmos Disponibles

- **basic**: Generación básica con formas y patrones
- **mandelbrot**: Conjunto de Mandelbrot
- **julia**: Conjunto de Julia
- **perlin**: Ruido Perlin para texturas orgánicas
- **sierpinski**: Triángulo de Sierpinski fractal
- **koch**: Curva de Koch fractal

## Dependencias

- express: Framework web
- cors: Middleware de CORS
- jimp: Procesamiento de imágenes
- simplex-noise: Generación de ruido procedural