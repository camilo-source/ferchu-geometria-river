# ⚽ Academia de Arqueros River - Geometría para Ferchu

> 🎓 Plataforma educativa interactiva de geometría con temática de River Plate, optimizada para estudiantes con TDAH.

![River Plate](https://img.shields.io/badge/River_Plate-Educación-D32F2F?style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?style=for-the-badge&logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)

## 🎯 Descripción

**Academia de Arqueros River** es una aplicación educativa diseñada específicamente para Ferchu, combinando el aprendizaje de geometría con la pasión por River Plate. La interfaz está optimizada para estudiantes con TDAH, siguiendo principios de diseño inclusivo.

### ✨ Características Principales

- 🎨 **Interfaz TDAH-Friendly**: Layout de dos columnas para reducir carga cognitiva
- ⚽ **Temática River Plate**: Diseño con escudo, colores y referencias al club
- 📐 **8 Actividades de Geometría**: Ángulos, triángulos, líneas paralelas
- 🎮 **Sistema de Breaks**: Mini-juego de penales cada 3 ejercicios
- 📊 **Reportes Detallados**: Exportación en TXT y JSON
- 🏆 **Gamificación**: Sistema de rachas y feedback positivo
- 🎭 **Pulpo Armani**: Guía virtual motivacional

## 🚀 Demo en Vivo

🌐 **[Ver Demo](https://tu-app.vercel.app)** _(próximamente)_

## 📸 Capturas de Pantalla

### Layout de Dos Columnas
```
┌───────────────────┬──────────────────┐
│   OPCIONES        │    FIGURA        │
│   (Izquierda)     │   (Derecha)      │
│                   │                  │
│ • Instrucciones   │   📐 Ángulo     │
│ • Botones         │   Geométrico    │
│   verticales      │                  │
│ • Confirmar       │   (Sticky)      │
└───────────────────┴──────────────────┘
```

## 🛠️ Tecnologías

- **Frontend**: Vanilla JavaScript (ES6+)
- **Build Tool**: Vite 7.3.1
- **Estilos**: CSS3 con Variables
- **Fuentes**: Google Fonts (Fredoka One, Poppins, Orbitron)
- **Renderizado**: Gráficos 2D (imágenes PNG optimizadas)

## 📦 Instalación Local

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/ferchu-geometria.git

# Entrar al directorio
cd ferchu-geometria

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La app estará disponible en `http://localhost:5173`

## 🏗️ Estructura del Proyecto

```
FERCHU/
├── public/
│   └── assets/
│       └── images/          # Figuras geométricas PNG
├── src/
│   ├── components/          # Componentes React-like
│   │   ├── PulpoArmani.js
│   │   └── RiverHeader.js
│   ├── games/
│   │   └── PenalesGame.js   # Mini-juego de breaks
│   ├── render/
│   │   └── ImageRenderer.js # Renderizador 2D
│   ├── systems/
│   │   ├── ActivityManager.js
│   │   └── BreakManager.js
│   ├── ui/
│   │   └── UIManager.js     # Controlador principal UI
│   ├── main.js              # Entry point
│   └── style.css            # Estilos globales
├── docs/                    # Documentación
├── index.html
├── package.json
└── vite.config.js
```

## 🎓 Actividades Incluidas

1. **Identificar Ángulos** - Agudo, recto, obtuso
2. **Medir Ángulos** - Lectura de grados
3. **Ángulos Complementarios** - Suma 90°
4. **Ángulos Suplementarios** - Suma 180°
5. **Ángulo Faltante en Triángulo** - Suma 180°
6. **Clasificar por Lados** - Equilátero, isósceles, escaleno
7. **Clasificar por Ángulos** - Acutángulo, rectángulo, obtusángulo
8. **Líneas Paralelas** - Ángulos correspondientes

## 🧠 Diseño TDAH-Friendly

### Principios Aplicados

- ✅ **Reducción de estímulos**: Fondo blanco limpio
- ✅ **Feedback inmediato**: Respuestas en <1 segundo
- ✅ **Chunks pequeños**: Ejercicios cortos y concretos
- ✅ **Breaks frecuentes**: Pausas cada 3 ejercicios
- ✅ **Gamificación**: Rachas, estrellas, reportes
- ✅ **Elementos sticky**: Figura siempre visible
- ✅ **Navegación clara**: Progreso visual constante

## 🎨 Paleta de Colores

```css
--primary: #D32F2F        /* Rojo River */
--secondary: #388E3C      /* Verde césped */
--accent: #42A5F5         /* Azul calmado */
--success: #2E7D32        /* Verde oscuro */
--warning: #F57C00        /* Naranja */
```

## 📱 Responsive Design

- **Desktop (>1024px)**: Layout de 2 columnas
- **Tablet/Móvil (<1024px)**: Stack vertical con figura arriba

## 🚀 Deployment

### Vercel (Recomendado)

1. Conecta tu repositorio de GitHub
2. Vercel detectará automáticamente Vite
3. Deploy automático en cada push

### Build de Producción

```bash
npm run build
```

Los archivos optimizados se generarán en `/dist`

## 📝 Roadmap

- [ ] Más actividades de geometría
- [ ] Sistema de login/guardado de progreso
- [ ] Modo multijugador
- [ ] Leaderboard
- [ ] Más mini-juegos temáticos
- [ ] Versión móvil nativa

## 👨‍💻 Autor

Creado con ❤️ para Ferchu

## 📄 Licencia

Este proyecto es privado y está destinado exclusivamente para uso educativo personal.

---

**⚽ ¡Vamos River! 🔴⚪**
