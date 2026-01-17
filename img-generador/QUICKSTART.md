# Guía de Inicio Rápido

## 📦 Instalación en 3 pasos

### Paso 1: Instalar dependencias
```bash
npm run install:all
```

### Paso 2: Iniciar servidores
```bash
npm start
```

### Paso 3: Abrir navegador
Visita `http://localhost:5173`

---

## 🎯 Uso Básico

1. **Selecciona tamaño**: Ingresa valores en los campos X e Y (ej: 256 x 256)
2. **Elige colores**: Usa los selectores de color para fondo y frontal
3. **Selecciona algoritmo**: Elige entre basic, mandelbrot, julia, perlin, sierpinski, koch
4. **Configura formas/patrónes**: Si seleccionaste "basic", elige las formas y patrones deseados
5. **Genera**: Haz clic en "Generar Imagen"
6. **Descarga**: Haz clic en "Descargar" bajo la imagen generada

---

## ⚡ Comandos Disponibles

```bash
npm start              # Inicia ambos servidores (backend y frontend)
npm run backend        # Solo backend
npm run backend:dev    # Backend con autoreload
npm run frontend       # Solo frontend
npm run frontend:build # Compila frontend para producción
```

---

## 🔧 Solución de Problemas

### Puerto 5000 ocupado
Cambia el puerto en `backend/server.js`:
```javascript
const PORT = process.env.PORT || 3001;
```

### Puerto 5173 ocupado
Cambia el puerto en `frontend/vite.config.js`:
```javascript
server: {
  port: 3000
}
```

### Error al conectar con el backend
Verifica que el servidor backend esté corriendo y que la URL sea correcta en `frontend/src/App.jsx`:
```javascript
fetch('http://localhost:5000/api/generate', ...)
```

---

## 📚 Recursos

- Documentación completa: `README.md`
- Ejemplos de configuración: `EXAMPLES.md`
- Plan de desarrollo: `PLAN.md`