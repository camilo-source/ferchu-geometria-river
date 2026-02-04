/**
 * ═══════════════════════════════════════════════════════════
 * 🎨 IMAGEN RENDERER - Sistema Simple 2D
 * Reemplaza Three.js con imágenes flat de River
 * ═══════════════════════════════════════════════════════════
 */

export class ImageRenderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentImage = null;
    }

    // Mapeo de ejercicios a imágenes
    getImageForExercise(activityType, exercise) {
        const imageMap = {
            'identificar-angulo': () => this.getAngleImage(exercise.angle),
            'medir-angulo': () => this.getAngleImage(exercise.angle),
            'complementario': () => '/assets/images/figuras/angulo-agudo.png',
            'suplementario': () => '/assets/images/figuras/angulo-obtuso.png',
            'clasificar-triangulo-lados': () => this.getTriangleImageByType(exercise),
            'clasificar-triangulo-angulos': () => this.getTriangleImageByType(exercise),
            'angulo-faltante': () => this.getTriangleImageByType(exercise),
            'lineas-paralelas': () => '/assets/images/figuras/angulo-agudo.png'
        };

        const getImage = imageMap[activityType];
        return getImage ? getImage() : '/assets/images/figuras/arco-geometrico.png';
    }

    // Seleccionar imagen de ángulo según grados
    getAngleImage(degrees) {
        if (degrees === 90) {
            return '/assets/images/figuras/angulo-90.png';
        } else if (degrees < 90) {
            return '/assets/images/figuras/angulo-agudo.png';
        } else {
            return '/assets/images/figuras/angulo-obtuso.png'; // ✨ NUEVO: Ángulo obtuso con arquero
        }
    }

    // Seleccionar imagen de triángulo según tipo
    getTriangleImageByType(exercise) {
        // Detectar tipo de triángulo según lados o ángulos
        if (exercise.sides) {
            const [a, b, c] = exercise.sides;

            // Equilátero: todos los lados iguales
            if (a === b && b === c) {
                return '/assets/images/figuras/triangulo-equilatero.png';
            }

            // Isósceles: dos lados iguales
            if (a === b || b === c || a === c) {
                return '/assets/images/figuras/triangulo-isosceles.png';
            }

            // Escaleno: todos diferentes
            return '/assets/images/figuras/triangulo-escaleno.png';
        }

        // Si no hay info de lados, usar triángulo genérico
        return '/assets/images/figuras/triangulo.png';
    }

    // Renderizar imagen
    render(activityType, exercise) {
        if (!this.container) return;

        const imageSrc = this.getImageForExercise(activityType, exercise);

        this.container.innerHTML = `
            <div class="geometry-display" style="
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 400px;
                background: #FFFFFF;
                border-radius: 20px;
                border: 2px solid rgba(211, 47, 47, 0.15);
                padding: 2rem;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            ">
                <img 
                    src="${imageSrc}" 
                    alt="Figura geométrica"
                    style="
                        max-width: 100%;
                        max-height: 100%;
                        object-fit: contain;
                        filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
                    "
                    onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\"font-size: 4rem;\\">📐</div>'"
                />
            </div>
        `;
    }

    // Limpiar
    clear() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }

    // Actualizar con animación suave
    update(activityType, exercise) {
        if (!this.container) return;

        // Fade out
        this.container.style.opacity = '0';
        this.container.style.transition = 'opacity 0.3s ease';

        setTimeout(() => {
            this.render(activityType, exercise);

            // Fade in
            setTimeout(() => {
                this.container.style.opacity = '1';
            }, 50);
        }, 300);
    }
}
