# 🎮 GUÍA RÁPIDA - GEOMETRÍA ANTI-GRAVEDAD
## Para Ferchu - Entrenamiento River Plate

---

## ✅ **TODO LISTO PARA USAR**

La aplicación está completamente funcional con todas las optimizaciones TDAH implementadas.

---

## 🚀 **CÓMO USAR LA APP**

### 1. Iniciar la Aplicación

**La app ya está corriendo en:**
```
http://localhost:5173
```

**Desde otro dispositivo en la misma red:**
```
http://[TU-IP-LOCAL]:5173
```

### 2. Flujo de Uso

**Paso 1: Pantalla de Bienvenida**
- Ingresá el nombre (ej: "Ferchu")
- Click en "¡Al Campo! 🧤"

**Paso 2: Selector de Actividades**
- 8 actividades de geometría
- Temática de arquero River
- Títulos cortos y claros

**Paso 3: Ejercicios**
- Máximo 3 ejercicios por actividad
- Instrucciones de ≤7 palabras
- Feedback inmediato (<1 seg)

**Paso 4: Breaks Automáticos**
- Cada 3 ejercicios = break obligatorio
- Mini-juego de penales (60 seg)
- Continúa automáticamente

**Paso 5: Resultados**
- Estadísticas completas
- Reporte descargable (.txt y .json)

---

## 🎯 **ACTIVIDADES DISPONIBLES**

| # | Nombre | Instrucción | Ejercicios |
|---|--------|-------------|------------|
| 1 | Ángulos del Arco | "¿Qué ángulo es?" | 5 |
| 2 | Medí el Tiro | "¿Cuántos grados mide el ángulo?" | 5 |
| 3 | Completá los 90° | "¿Qué ángulo falta para 90°?" | 5 |
| 4 | Completá los 180° | "¿Qué ángulo suma 180°?" | 5 |
| 5 | Formaciones | "¿Qué triángulo es por sus lados?" | 5 |
| 6 | Tipos de Cobertura | "¿Qué triángulo es por sus ángulos?" | 5 |
| 7 | Ángulo Faltante | "¿Qué ángulo falta? (suman 180°)" | 5 |
| 8 | Tiros Paralelos | "¿Cuánto mide el ángulo marcado?" | 5 |

---

## 🧠 **CARACTERÍSTICAS TDAH**

### ✅ Implementadas

**Visual:**
- ✅ Fondo verde césped estático (sin animaciones)
- ✅ Colores River suavizados (no neón)
- ✅ Máximo 3 opciones por pregunta
- ✅ Espacios generosos, sin clutter

**Temporal:**
- ✅ Feedback en <1 segundo
- ✅ Breaks cada 3 ejercicios
- ✅ Sesiones cortas (3-5 min)

**Cognitivo:**
- ✅ Instrucciones ≤7 palabras
- ✅ 1 pregunta a la vez
- ✅ Feedback positivo siempre

**Interactivo:**
- ✅ Mini-juego de penales
- ✅ Sin penalización por error
- ✅ Recompensas inmediatas

---

## 🐙 **EL PULPO ARMANI**

**Estado:** Componente creado y listo

**Ubicación:** `src/components/PulpoArmani.js`

**Frases incluidas:**
- 🎉 Bienvenida (3 frases)
- ✅ Correcto (7 frases)
- ❌ Error (5 frases)
- 💪 Motivación (5 frases)
- 🏆 Completado (4 frases)
- ⏸️ Break (3 frases)

**Imagen:** `/public/assets/images/armani/pulpo-armani.png`

---

## 🎮 **MINI-JUEGO: PENALES**

**Cómo funciona:**
1. Aparece cada 3 ejercicios
2. 3 intentos de penal
3. Click en zona del arco (izq/centro/der)
4. El Pulpo Armani ataja 40% de las veces
5. Feedback positivo siempre
6. Continúa automáticamente

**Sin estrés:** No afecta la puntuación de geometría

---

## 📊 **REPORTES**

Al finalizar la sesión, se puede descargar:

**Formato TXT:**
- Resumen visual ASCII
- Detalle por actividad
- Estadísticas generales

**Formato JSON:**
- Datos estructurados
- Timestamps
- Respuestas individuales

---

## 🔧 **AJUSTES POSIBLES**

Si Ferchu necesita cambios, se pueden modificar fácilmente:

### Tiempo de Feedback
**Archivo:** `src/ui/UIManager.js` línea ~526
```javascript
setTimeout(() => {
    this.nextExercise();
}, 800); // Cambiar este número (en milisegundos)
```

### Frecuencia de Breaks
**Archivo:** `src/systems/BreakManager.js` línea ~14
```javascript
this.exercisesPerSet = 3; // Cambiar este número
```

### Instrucciones
**Archivo:** `src/systems/ActivityManager.js` líneas 28-148
Modificar el texto de cada `instructions`

---

## 🎨 **PALETA DE COLORES**

**River Plate TDAH-Friendly:**
- Rojo: `#D32F2F` (suavizado)
- Verde: `#388E3C` (césped)
- Azul: `#42A5F5` (calmado)
- Éxito: `#388E3C` (natural)
- Error: `#E57373` (suave, no punitivo)

---

## 📝 **NOTAS PARA TUTORES**

### Uso Recomendado

**Sesiones:**
- 15-20 minutos máximo
- Mismas hora y lugar cada día
- Sin distracciones externas

**Acompañamiento:**
- Sentarse cerca pero no sobre
- Celebrar esfuerzo, no solo aciertos
- Permitir pausas si lo necesita

**No Forzar:**
- Si está disperso: parar y retomar después
- No castigar por errores
- Enfocarse en el proceso, no el resultado

### Qué Observar

✅ **Buenas señales:**
- Completa 3 ejercicios sin distraerse
- Disfruta los breaks
- Pide hacer otra actividad

⚠️ **Señales de ajuste necesario:**
- Se frustra con instrucciones
- Pide saltar los breaks
- Responde muy rápido sin pensar

---

## 🚀 **PRÓXIMOS PASOS OPCIONALES**

### Si Ferchu lo disfruta:

1. **Agregar más mini-juegos:**
   - Reflejos del Arquero
   - Respiración del Pulpo
   - Timing Challenge

2. **Sonidos tematizados:**
   - Silbatos para feedback
   - Hinchada suave de fondo
   - Locuciones de Armani

3. **Sistema de progreso:**
   - Niveles (Inferiores → Primera)
   - Trofeos desbloqueables
   - Racha de días

---

## 📚 **DOCUMENTACIÓN COMPLETA**

**Archivos de referencia creados:**

1. `ANALISIS_TDAH_COMPLETO.md` - Research + principios
2. `TEMATIZACION_RIVER_ARQUERO.md` - Diseño River
3. `RESUMEN_IMPLEMENTACION_TDAH.md` - Todo implementado
4. `PLAN_IMPLEMENTACION_FASES.md` - Roadmap
5. `GUIA_RAPIDA.md` - Este documento

---

## ⚽ **A JUGAR!**

La app está lista. Solo queda:

1. ✅ Abrir el navegador
2. ✅ Ir a `localhost:5173`
3. ✅ Ingresar nombre
4. ✅ ¡Entrenar geometría con River!

---

## 🆘 **TROUBLESHOOTING**

**Si no carga:**
```bash
# Reiniciar el servidor
cd C:\Users\54383\Desktop\FERCHU
npm run dev -- --host
```

**Si hay errores en consola:**
- Verificar que todas las carpetas existan
- Refrescar la página (F5)
- Borrar caché (Ctrl+Shift+R)

**Si Ferchu se distrae mucho:**
- Reducir ejercicios por set a 2
- Aumentar frecuencia de breaks
- Probar en sesiones más cortas

---

**¡Éxito con el entrenamiento!** 💚🔴⚽🐙
