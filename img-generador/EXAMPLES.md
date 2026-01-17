# Ejemplos de Configuración para Generación de Imágenes

## Tamaños Populares para NFTs

### Pixel Art
```json
{
  "width": 16,
  "height": 16
}
```

### Estándar NFT
```json
{
  "width": 512,
  "height": 512
}
```

### Alta Resolución
```json
{
  "width": 1024,
  "height": 1024
}
```

### Panorámica
```json
{
  "width": 1920,
  "height": 1080
}
```

## Algoritmos con Colores Personalizados

### Mandelbrot con tonos morados
```json
{
  "algorithm": "mandelbrot",
  "bgColor": "#1a0033",
  "fgColor": "#ff00ff",
  "width": 256,
  "height": 256
}
```

### Julia con tonos azules
```json
{
  "algorithm": "julia",
  "bgColor": "#000033",
  "fgColor": "#00ffff",
  "width": 256,
  "height": 256
}
```

### Perlin Noise con tonos verdes
```json
{
  "algorithm": "perlin",
  "bgColor": "#001a00",
  "fgColor": "#00ff00",
  "width": 256,
  "height": 256
}
```

## Modo Básico con Formas y Patrones

### Círculos con puntos
```json
{
  "algorithm": "basic",
  "shapes": ["circle"],
  "patterns": ["dots"],
  "bgColor": "#000000",
  "fgColor": "#ffffff",
  "width": 256,
  "height": 256
}
```

### Cuadrados y líneas con rayas
```json
{
  "algorithm": "basic",
  "shapes": ["square", "line"],
  "patterns": ["stripes"],
  "bgColor": "#1a1a2e",
  "fgColor": "#667eea",
  "width": 256,
  "height": 256
}
```

### Todas las formas y gradientes
```json
{
  "algorithm": "basic",
  "shapes": ["circle", "square", "line"],
  "patterns": ["gradient"],
  "bgColor": "#16213e",
  "fgColor": "#e94560",
  "width": 256,
  "height": 256
}
```

## Fractales Clásicos

### Sierpinski Triangle
```json
{
  "algorithm": "sierpinski",
  "bgColor": "#000000",
  "fgColor": "#ffffff",
  "width": 512,
  "height": 512
}
```

### Koch Snowflake
```json
{
  "algorithm": "koch",
  "bgColor": "#000000",
  "fgColor": "#00ffff",
  "width": 512,
  "height": 512
}
```

## Temas de Colores

### Cyberpunk
```json
{
  "bgColor": "#0d001a",
  "fgColor": "#ff00ff",
  "algorithm": "mandelbrot"
}
```

### Océano
```json
{
  "bgColor": "#000022",
  "fgColor": "#00ccff",
  "algorithm": "julia"
}
```

### Bosque
```json
{
  "bgColor": "#001100",
  "fgColor": "#00ff00",
  "algorithm": "perlin"
}
```

### Fuego
```json
{
  "bgColor": "#1a0000",
  "fgColor": "#ff4400",
  "algorithm": "mandelbrot"
}
```