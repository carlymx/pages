# Problemas Conocidos

## Bugs

### 1. Números negativos no funcionan

**Estado**: Corregido  
**Severidad**: Media  
**Descripción**: El sistema no procesaba números con signo negativo. Un input como `-10` o `-1A` retornaba `null`.  
**Causa**: La función `getPossibleBases()` no manejaba el carácter `-` al inicio del string.  
**Solución aplicada**: Detectar y manejar el signo negativo/positivo antes de analizar la base, convertir el valor absoluto y aplicar el signo al resultado.

### 2. Overflow visual con demasiadas opciones

**Estado**: Corregido  
**Severidad**: Baja (UX)  
**Descripción**: Para números simples como `10`, el sistema mostraba 59 opciones de bases (2-60), lo cual resultaba abrumador para el usuario.  
**Causa**: La lógica anterior añadía todas las bases desde la más restrictiva hasta 60 sin límite.  
**Solución aplicada**: Limitar las opciones solo a bases comunes (2, 8, 10, 12, 16, 60).

### 3. Selección por defecto puede ser confusa

**Estado**: Accepted (por diseño)  
**Severidad**: Baja (documentado)  
**Descripción**: Para el input `10`, el sistema selecciona Base 2 (binario) por defecto porque es la base más restrictiva válida. Los usuarios pueden esperar que sea Decimal (10).  
**Causa**: La lógica de detección prioriza la base más restrictiva para evitar ambigüedad.  
**Workaround**: El usuario puede hacer clic en cualquier otra opción para cambiar la base.

## Limitaciones Conocidas

### 4. Solo caracteres ASCII

**Descripción**: Solo se soportan caracteres A-Z, a-z y 0-9. No hay soporte para caracteres especiales de base 60 de sistemas históricos (como numeración sumeria/babilónica).  
**Estado**: Por diseño (para mantener simplicidad)

### 5. Sin soporte para fracciones

**Descripción**: Solo se procesan números enteros. No hay conversión de fracciones/decimales.  
**Estado**: Por diseño

### 6. Rendimiento con números muy largos

**Descripción**: Números extremadamente largos (>100 dígitos) pueden causar lentitud debido al uso de BigInt.  
**Estado**: Por diseño, límite práctico de ~1000 dígitos

## Mejoras Futuras Posibles

- [x] Soporte para números negativos (implementado)
- [x] Límite de opciones de bases mostradas (implementado: solo bases comunes)
- [x] Opción para elegir base por defecto preferida (implementado: selector en header)
- [ ] Detección inteligente basada en contexto
- [ ] Animaciones suaves al cambiar opciones
- [ ] Atajos de teclado (ej: Tab para siguiente base)

## Historial de Bugs Corregidos

| Bug                             | Estado    | Fecha      | Solución                             |
| ------------------------------- | --------- | ---------- | ------------------------------------ |
| `isNaN(BigInt)` lanzaba error   | Corregido | 2026-01-22 | Eliminado check redundante           |
| Base 60 no aparecía en opciones | Corregido | 2026-01-22 | Añadida función `stringToDecimal()`  |
| Duplicados en lista de bases    | Corregido | 2026-01-22 | Añadido `Set` para evitar duplicados |
| Overflow de opciones de bases   | Corregido | 2026-01-22 | Limitado a bases comunes             |
| Soporte a números negativos     | Corregido | 2026-01-22 | Añadido manejo de signo              |
| Base por defecto preferida      | Corregido | 2026-01-22 | Añadido selector y lógica            |
| Historial no se actualizaba     | Corregido | 2026-01-21 | Corregido `renderHistory()`          |
| Botón borrar no funcionaba      | Corregido | 2026-01-21 | Corregido `localStorage.setItem()`   |
