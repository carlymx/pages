# Frontend - Generador de Galería NFT

Aplicación React para visualizar y generar imágenes pixel art NFT.

## Instalación

```bash
cd frontend
npm install
```

## Ejecutar aplicación

Desarrollo:
```bash
npm run dev
```

Producción (build):
```bash
npm run build
npm run preview
```

La aplicación estará disponible en `http://localhost:5173`

## Características

- **Controles interactivos**: Modifica colores, tamaño, formas, patrones y algoritmos
- **Galería dinámica**: Visualiza imágenes generadas en tiempo real
- **Exportación**: Descarga imágenes como PNG
- **Algoritmos matemáticos**: Mandelbrot, Julia, Perlin, Sierpinski, Koch
- **Diseño responsivo**: Funciona en diferentes tamaños de pantalla

## Tecnologías

- React
- Vite
- CSS moderno (Flexbox/Grid)

## Uso

1. Ajusta los parámetros de generación en el panel de controles
2. Selecciona el algoritmo deseado
3. Haz clic en "Generar Imagen" para crear una imagen
4. La imagen aparecerá en la galería
5. Haz clic en "Descargar" para guardar la imagen en tu dispositivo
6. Usa "Limpiar Galería" para reiniciar la colección

## Parámetros Disponibles

- **Tamaño X e Y**: Ancho y alto de la imagen (16-1000 px)
- **Color Fondo**: Color de fondo en formato HEX
- **Color Frontal**: Color principal para formas y patrones
- **Algoritmo**: Método de generación (basic, mandelbrot, julia, perlin, sierpinski, koch)
- **Formas**: Círculos, cuadrados, líneas (solo para algoritmo basic)
- **Patrones**: Puntos, rayas, gradientes (solo para algoritmo basic)

## Estructura de Componentes

- `App.jsx`: Componente principal con toda la lógica
- `App.css`: Estilos de la aplicación
- `index.css`: Estilos globales