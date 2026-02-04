# 📋 LISTA DE TAREAS: Corrección de Gráficos

## 🎯 Objetivo
Hacer que TODOS los tipos de ejercicios muestren gráficos grandes, centrados, con texto legible dentro de arcos amarillos.

---

## ✅ TIPOS DE EJERCICIOS (8 Total)

### 1. ✅ **Identificar Ángulo** (`identificar-angulo`)
- **Método**: `drawAngle(degrees)`
- **Estado**: ✅ CORREGIDO
- **Elementos**: Ángulo simple con arco amarillo y grados dentro

### 2. ✅ **Medir Ángulo** (`medir-angulo`)
- **Método**: `drawAngle(degrees)`
- **Estado**: ✅ CORREGIDO (usa el mismo método que #1)
- **Elementos**: Igual que identificar ángulo

### 3. ✅ **Complementario** (`complementario`)
- **Método**: `drawComplementaryAngle(given, 'complementario')`
- **Estado**: ✅ CORREGIDO
- **Elementos**: Ángulo recto (90°) dividido en dos, con "x" para el desconocido

### 4. ✅ **Suplementario** (`suplementario`)
- **Método**: `drawComplementaryAngle(given, 'suplementario')`
- **Estado**: ✅ CORREGIDO
- **Elementos**: Línea recta (180°) dividida en dos, con "x" para el desconocido

### 5. ✅ **Clasificar Triángulo por Lados** (`clasificar-triangulo-lados`)
- **Método**: `drawTriangleBySides(sides)`
- **Estado**: ✅ CORREGIDO
- **Tarea**: 
  - [x] Verificar que el triángulo se vea centrado
  - [x] Verificar que el tamaño sea apropiado (escala 350)

### 6. ✅ **Clasificar Triángulo por Ángulos** (`clasificar-triangulo-angulos`)
- **Método**: `drawTriangleBySides(sides, angles)`
- **Estado**: ✅ CORREGIDO
- **Tarea**:
  - [x] Verificar que los ángulos se muestren dentro de arcos amarillos
  - [x] Verificar que no se superpongan los textos

### 7. ✅ **Ángulo Faltante** (`angulo-faltante`)
- **Método**: `drawTriangleBySides(sides, labels)` donde labels incluye 'x'
- **Estado**: ✅ CORREGIDO
- **Tarea**:
  - [x] Verificar que la "x" se vea claramente dentro del arco
  - [x] Verificar que los demás ángulos se vean correctamente

### 8. ✅ **Líneas Paralelas** (`lineas-paralelas`)
- **Método**: `drawParallelLines(given, type)`
- **Estado**: ✅ IMPLEMENTADO
- **Tarea**:
  - [x] Crear método `drawParallelLines(given, type)`
  - [x] Los types son: 'alterno-interno', 'correspondiente', 'alterno-externo', 'conjugado'
  - [x] Dibujar dos líneas paralelas horizontales
  - [x] Dibujar una línea transversal que las cruce
  - [x] Marcar el ángulo dado con arco amarillo y grados
  - [x] Marcar el ángulo incógnita con arco amarillo y "x"
  - [x] Mostrar el tipo de relación en el gráfico

---

## 📐 ESPECIFICACIONES TÉCNICAS

### ViewBox
- **Tamaño**: `600x600`
- **Centro**: `(300, 300)`

### Ángulos Simples (drawAngle)
- Centro: `(300, 300)`
- Longitud líneas: `220px`
- Radio arco: `60px`
- Grosor líneas: `6px`
- Grosor arco: `5px`
- Fuente grados: `48px`

### Ángulos Complementarios/Suplementarios
- Centro: `(300, 300)`
- Longitud líneas: `220px`
- Radio arcos: `60px`
- Fuente ángulo dado: `36px` (verde #388E3C)
- Fuente "x": `44px` (rojo #D32F2F, bold)
- Cuadradito 90°: `40x40px`

### Triángulos
- Escala: `350 / maxSide`
- Centro: `(300, 300)`
- Radio arcos ángulos: ajustar según el tipo

---

## 🚀 PRIORIDAD DE TAREAS

### 🥳 ¡TODO COMPLETADO!
Todas las tareas de renderizado han sido implementadas y verificadas.

---

## 📝 NOTAS DE IMPLEMENTACIÓN

### Para Líneas Paralelas:
```javascript
drawParallelLines(given, type) {
    const cx = 300;
    const cy = 300;
    const lineLength = 400;
    const separation = 120; // Separación entre paralelas
    
    // Líneas paralelas horizontales
    // Línea superior: y = cy - separation/2
    // Línea inferior: y = cy + separation/2
    
    // Línea transversal con ángulo
    
    // Marcar ángulos según el tipo:
    // - alterno-interno: iguales, opuestos
    // - correspondiente: iguales, misma posición
    // - alterno-externo: iguales, exteriores
    // - conjugado: suman 180°
}
```

---

## ✨ RESULTADO ESPERADO

Cuando todo esté corregido:
- ✅ Todos los ejercicios tienen gráficos claros y grandes
- ✅ Todos los textos están dentro de arcos amarillos
- ✅ No hay superposiciones ni amontonamientos
- ✅ Todo está centrado en (300, 300)
- ✅ Se usa "x" para incógnitas, no "?"
