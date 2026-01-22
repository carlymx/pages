# Conversor de Bases

Convierte números entre diferentes bases numéricas en tiempo real.

## Características

- **Conversión universal**: Escribe un número y ve sus equivalentes en todas las bases simultáneamente

- **Detección automática**: Reconoce automáticamente la base del número introducido, incluyendo números negativos

- **Selección manual**: Si un número puede interpretarse en varias bases, elige la que prefieras o configura una base por defecto

- **Bases soportadas**:
  
  - Decimal (10)
  - Binario (2)
  - Octal (8)
  - Duodecimal (12)
  - Hexadecimal (16)
  - Base 60

- **Interfaz bilingüe**: Español / Inglés

- **Tema claro/oscuro**: Compatible con la preferencia del sistema

- **Historial**: Guarda todas las conversiones

- **Exportar CSV**: Descarga tu historial de conversiones

- **Offline**: Funciona sin conexión a internet (PWA)

- **Responsive**: Diseñado para móviles y escritorio

## Uso

### Detección automática de bases

El sistema detecta automáticamente la base de tu número:

| Prefijo     | Base             |
| ----------- | ---------------- |
| `0x` o `0X` | Hexadecimal (16) |
| `0b` o `0B` | Binario (2)      |
| `0t` o `0T` | Duodecimal (12)  |
| `0s` o `0S` | Base 60          |

Sin prefijo, analiza los caracteres y muestra las bases comunes válidas (2, 8, 10, 12, 16, 60).

### Ejemplos

```
Input: 1A     → Base 16 detectada: 26, 10010, 32, 22, 1A
Input: 255    → Decimal: 255, 11111111, 377, 213, FF, 45
Input: 0xFF   → Hexadecimal: 255, 11111111, 377, 213, FF, 45
Input: 10     → Múltiples opciones: 2(2), 10(10)
Input: -10    → Múltiples opciones: 2(-2), 10(-10)
```

## Instalación

### Opción 1: Abrir directamente

Simplemente abre el archivo `index.html` en tu navegador.

### Opción 2: Servidor local

```bash
python3 -m http.server 8080
```

Luego abre [http://localhost:8080](http://localhost:8080) en tu navegador.

### Opción 3: Instalar como app (PWA)

1. Abre la aplicación en Chrome/Edge
2. Haz clic en el botón "Instalar" que aparece
3. La app se instalará y funcionará sin conexión

## Archivos

```
base60/
├── index.html           # Aplicación principal
├── sw.js                # Service Worker (offline)
├── manifest.json        # Manifest PWA
└── icons/
    ├── icon-192.png     # Icono 192x192
    └── icon-512.png     # Icono 512x512
```

## Tecnología

- HTML5, CSS3, JavaScript (vanilla)
- Sin dependencias externas
- PWA con Service Worker
- localStorage para persistencia

## Licencia

MIT
