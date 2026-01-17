# Plan Completo: Aplicación Web Full-Stack para Galería de Imágenes NFT

## Objetivo

Crear una aplicación web full-stack que genere y muestre una galería de imágenes pixel art personalizables para NFTs. Las imágenes se crean modificando variables típicas del sector: colores, formas, patrones, tamaño personalizado y algoritmos matemáticos de fractales/efectos.

## Tecnología Elegida

- **Frontend:** React para interfaz interactiva de galería y controles.
- **Backend:** Node.js con Express para APIs y lógica de generación; node-canvas para renderizado server-side.
- **Librerías:** node-canvas (renderizado), potencialmente p5.js o noisejs para algoritmos específicos.

## Variables de Generación

- **Colores:** Fondo y frontal (selección RGB/HEX).
- **Formas:** Círculos, cuadrados, líneas (con parámetros como tamaño/posición).
- **Patrones:** Puntos, rayas, gradientes (densidad/dirección).
- **Tamaño:** Campos numéricos para ancho (X) y alto (Y), con validación (máx. 1000x1000).
- **Algoritmos Matemáticos (Lista Seleccionable):**
  - Mandelbrot set
  - Julia set
  - Perlin Noise
  - Sierpinski gasket
  - Koch snowflake

## Estructura del Proyecto

- `/backend`: Servidor Express con rutas API.
- `/frontend`: App React con componentes para galería y controles.

## Funcionalidades Clave

- Controles interactivos para modificar variables y regenerar imágenes en tiempo real.
- Galería en grid responsivo con vista previa de imágenes generadas.
- Opción de guardar/exportar imágenes como PNG/JPG.

## Pasos de Implementación

1. Inicializar proyecto Node.js y estructura de carpetas.
2. Configurar servidor Express con CORS y rutas básicas.
3. Instalar node-canvas para generación de imágenes.
4. Implementar lógica de generación combinando variables en canvas.
5. Crear endpoints API para recibir parámetros y retornar imágenes.
6. Configurar app React con componentes básicos.
7. Agregar controles UI (inputs/dropdowns para variables).
8. Implementar galería dinámica conectada a la API.
9. Añadir funcionalidad de exportación.
10. Testear y validar la aplicación completa.

## Consideraciones

- Rendimiento: Limitar iteraciones en algoritmos para evitar timeouts.
- Seguridad: Validar inputs para prevenir abusos.
- Extensibilidad: Estructura modular para futuras adiciones.