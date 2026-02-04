/**
 * ═══════════════════════════════════════════════════════════
 * 🎨 IMAGE RENDERER - NANO BANANA ENGINE 🍌
 * Generador Dinámico de Geometría SVG
 * Crea gráficos matemáticamente exactos en tiempo real
 * ═══════════════════════════════════════════════════════════
 */

export class ImageRenderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.width = 400;
        this.height = 350;
    }

    updateForExercise(activityType, exercise) {
        this.render(activityType, exercise);
    }

    render(activityType, exercise) {
        if (!this.container) return;

        let svgContent = '';

        switch (activityType) {
            case 'identificar-angulo':
            case 'medir-angulo':
                svgContent = this.drawAngle(exercise.angle);
                break;
            case 'complementario':
                svgContent = this.drawComplementary(exercise.given);
                break;
            case 'suplementario':
                svgContent = this.drawSupplementary(exercise.given);
                break;
            case 'clasificar-triangulo-lados':
                svgContent = this.drawTriangleBySides(exercise.sides);
                break;
            case 'clasificar-triangulo-angulos':
            case 'angulo-faltante':
                // Para simplificar, si tenemos ángulos, podemos usar la lógica de dibujo
                // genérico o asumir lados aproximados para visualización.
                // Si tenemos lados definidos en el ejercicio (aunque sea de ángulos) los usamos
                if (exercise.sides) {
                    svgContent = this.drawTriangleBySides(exercise.sides, exercise.angles);
                } else if (exercise.angles) {
                    // Generar un triángulo genérico con esos ángulos
                    svgContent = this.drawTriangleByAngles(exercise.angles);
                }
                break;
            case 'lineas-paralelas':
                svgContent = this.drawParallelLines(exercise.given, exercise.type);
                break;
            default:
                svgContent = `<text x="50%" y="50%" text-anchor="middle" font-size="20">Figura no disponible</text>`;
        }

        this.container.innerHTML = `
            <svg width="100%" height="100%" viewBox="0 0 ${this.width} ${this.height}" 
                 style="background: white; border-radius: 15px;">
                <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L9,3 z" fill="#D32F2F" />
                    </marker>
                </defs>
                ${svgContent}
            </svg>
        `;
    }

    // ═══════════════════════════════════════════════════════════
    // 📐 Primitivas Geométricas
    // ═══════════════════════════════════════════════════════════

    drawAngle(degrees) {
        const cx = this.width / 2;
        const cy = this.height * 0.8;
        const length = 120;
        const rad = degrees * (Math.PI / 180);

        const x2 = cx + length * Math.cos(0); // Línea base horizontal (0°) - NO, mejor empezando en 0
        const y2 = cy;

        // Coordenadas línea base (derecha)
        const bx = cx + length;
        const by = cy;

        // Coordenadas línea ángulo (rotada anti-horario)
        const ax = cx + length * Math.cos(-rad);
        const ay = cy + length * Math.sin(-rad);

        // Arco del ángulo
        const arcRadius = 40;
        const arcX = cx + arcRadius * Math.cos(-rad);
        const arcY = cy + arcRadius * Math.sin(-rad);

        // Flag para arco grande (>180) - no usaremos >180 aquí comúnmente pero por si acaso
        const largeArc = degrees > 180 ? 1 : 0;

        const pathData = `M ${cx + arcRadius} ${cy} A ${arcRadius} ${arcRadius} 0 ${largeArc} 0 ${arcX} ${arcY}`;

        let box = '';
        if (degrees === 90) {
            box = `<rect x="${cx}" y="${cy - 20}" width="20" height="20" fill="none" stroke="#D32F2F" stroke-width="2"/>
                   <circle cx="${cx + 10}" cy="${cy - 10}" r="2" fill="#D32F2F"/>`;
        }

        return `
            <!-- Líneas -->
            <line x1="${cx}" y1="${cy}" x2="${bx}" y2="${by}" stroke="#2C3E50" stroke-width="4" marker-end="url(#arrow)" />
            <line x1="${cx}" y1="${cy}" x2="${ax}" y2="${ay}" stroke="#2C3E50" stroke-width="4" marker-end="url(#arrow)" />
            
            <!-- Vértice -->
            <circle cx="${cx}" cy="${cy}" r="6" fill="#D32F2F" />
            
            <!-- Arco -->
            ${degrees !== 90 ? `<path d="${pathData}" fill="rgba(211, 47, 47, 0.1)" stroke="#D32F2F" stroke-width="2"/>` : ''}
            ${box}
            
            <!-- Etiqueta -->
            <text x="${cx + 60}" y="${cy - 60}" font-family="Orbitron" font-size="24" fill="#D32F2F">${degrees}°</text>
        `;
    }

    drawComplementary(given) {
        const cx = this.width / 2;
        const cy = this.height * 0.8;
        const length = 120;

        // Dibuja el ángulo recto base
        const bx = cx + length;
        const by = cy;
        const tx = cx;
        const ty = cy - length;

        // Línea divisoria
        const rad = given * (Math.PI / 180);
        const mx = cx + length * Math.cos(-rad);
        const my = cy + length * Math.sin(-rad);

        return `
            <!-- Base Recto -->
            <line x1="${cx}" y1="${cy}" x2="${bx}" y2="${by}" stroke="#2C3E50" stroke-width="4" />
            <line x1="${cx}" y1="${cy}" x2="${tx}" y2="${ty}" stroke="#2C3E50" stroke-width="4" />
            
            <!-- Cuadradito 90 -->
            <rect x="${cx}" y="${cy - 20}" width="20" height="20" fill="none" stroke="#2C3E50" stroke-width="1"/>

            <!-- Rayo divisor -->
            <line x1="${cx}" y1="${cy}" x2="${mx}" y2="${my}" stroke="#D32F2F" stroke-width="3" stroke-dasharray="8,4" />

            <!-- Texto -->
            <text x="${cx + 40}" y="${cy - 10}" font-family="Orbitron" font-size="18" fill="#388E3C">${given}°</text>
            <text x="${cx + 10}" y="${cy - 50}" font-family="Orbitron" font-size="24" fill="#D32F2F" font-weight="bold">?</text>
        `;
    }

    drawSupplementary(given) {
        const cx = this.width / 2;
        const cy = this.height * 0.7;
        const length = 140;

        // Línea base (180°)
        const lx = cx - length;
        const rx = cx + length;

        // Línea divisoria
        const rad = given * (Math.PI / 180);
        // Ajuste: si given es agudo, sale hacia derecha. Si es obtuso, hacia izquierda.
        // Pero suplementario siempre suma 180. Dibujamos desde la derecha (0°) hacia la izquierda (180°).
        const mx = cx + length * Math.cos(-rad);
        const my = cy + length * Math.sin(-rad);

        return `
            <!-- Base Llana -->
            <line x1="${lx}" y1="${cy}" x2="${rx}" y2="${cy}" stroke="#2C3E50" stroke-width="4" marker-end="url(#arrow)" marker-start="url(#arrow)" />
            <circle cx="${cx}" cy="${cy}" r="6" fill="#2C3E50" />

            <!-- Rayo divisor -->
            <line x1="${cx}" y1="${cy}" x2="${mx}" y2="${my}" stroke="#D32F2F" stroke-width="3" />

            <!-- Arco y Texto -->
            <text x="${cx + 40}" y="${cy - 10}" font-family="Orbitron" font-size="18" fill="#388E3C">${given}°</text>
            <text x="${cx - 40}" y="${cy - 10}" font-family="Orbitron" font-size="24" fill="#D32F2F" font-weight="bold">?</text>
        `;
    }

    drawTriangleBySides(sides, labels = []) {
        // Algoritmo para dibujar triángulo dados 3 lados (SSS)
        // Centrar en el canvas
        let [a, b, c] = sides;
        // Escalar para que quepa
        const maxSide = Math.max(a, b, c);
        const scale = 200 / maxSide;
        a *= scale; b *= scale; c *= scale;

        // Coordenadas
        // A en (0,0) relativo -> luego trasladamos
        // B en (c, 0)
        // C calculado por ley de cosenos: a^2 = b^2 + c^2 - 2bc cos(A) -> cos(A) = (b^2 + c^2 - a^2) / 2bc
        // Espera, el ángulo en A opuesto al lado a.
        // Usaremos: C está en (x, y). Base es c.
        // x = (c^2 + b^2 - a^2) / (2c)
        // y = sqrt(b^2 - x^2)

        const Ax = 0; const Ay = 0;
        const Bx = c; const By = 0;
        const Cx = (c * c + b * b - a * a) / (2 * c);
        const Cy = Math.sqrt(Math.abs(b * b - Cx * Cx)); // Abs por seguridad float

        // Centroide para centrar en SVG
        const centX = (Ax + Bx + Cx) / 3;
        const centY = (Ay + By + Cy) / 3;

        const offX = this.width / 2 - centX;
        const offY = this.height / 2 + centY / 2; // Invertir Y luego

        // Función transformación coordenadas
        const tr = (x, y) => [offX + x, offY - y];

        const [pAx, pAy] = tr(Ax, Ay);
        const [pBx, pBy] = tr(Bx, By);
        const [pCx, pCy] = tr(Cx, Cy);

        // Etiquetas de lados (valores originales)
        const [oa, ob, oc] = sides.map(s => Math.round(s / scale));

        return `
            <polygon points="${pAx},${pAy} ${pBx},${pBy} ${pCx},${pCy}" 
                     fill="rgba(56, 142, 60, 0.1)" stroke="#2C3E50" stroke-width="4" strok-join="round"/>
            
            <!-- Vértices -->
            <circle cx="${pAx}" cy="${pAy}" r="4" fill="#D32F2F"/>
            <circle cx="${pBx}" cy="${pBy}" r="4" fill="#D32F2F"/>
            <circle cx="${pCx}" cy="${pCy}" r="4" fill="#D32F2F"/>

            <!-- Lados Etiquetas (Aprox mitad de cada lado) -->
            <text x="${(pBx + pCx) / 2}" y="${(pBy + pCy) / 2 - 10}" fill="#D32F2F" font-weight="bold" font-size="16">${sides[0] / scale}</text>
            <text x="${(pAx + pCx) / 2 - 20}" y="${(pAy + pCy) / 2}" fill="#D32F2F" font-weight="bold" font-size="16">${sides[1] / scale}</text>
            <text x="${(pAx + pBx) / 2}" y="${(pAy + pBy) / 2 + 20}" fill="#D32F2F" font-weight="bold" font-size="16">${sides[2] / scale}</text>
        `;
    }

    drawTriangleByAngles(angles) {
        // Construir triángulo dados ángulos y una base fija
        // Si tenemos [A, B, C], asumimos base c = 200
        const scale = 200;
        const rad = deg => deg * Math.PI / 180;

        const A = angles[0];
        const B = angles[1];
        // Ley de senos: a/sinA = b/sinB = c/sinC
        // Asumiendo c (base AB) = scale
        const c = scale;
        const C_angle = 180 - A - B;
        const a = c * Math.sin(rad(A)) / Math.sin(rad(C_angle));
        const b = c * Math.sin(rad(B)) / Math.sin(rad(C_angle));

        // Usamos la misma lógica de lados ahora que los tenemos
        return this.drawTriangleBySides([a, b, c]);
    }

    drawParallelLines(given, type) {
        const cx = this.width / 2;
        const cy = this.height / 2;

        // Líneas paralelas
        const lineLen = 300;
        const gap = 80;

        // Transversal
        // Ángulo de la transversal (arbitrario visualmente agradable, pero consistente con 'given' si es agudo/obtuso)
        // Si 'given' es el ángulo agudo, calculamos inclinación.
        // Simplificación: dibujamos transversal fija a 60 grados y etiquetamos según corresponda
        const transAngle = 60 * Math.PI / 180;
        const dx = (gap * 1.5) / Math.tan(transAngle); // proyección x

        return `
            <!-- Paralelas -->
            <line x1="${cx - 150}" y1="${cy - gap}" x2="${cx + 150}" y2="${cy - gap}" stroke="#2C3E50" stroke-width="4" />
            <line x1="${cx - 150}" y1="${cy + gap}" x2="${cx + 150}" y2="${cy + gap}" stroke="#2C3E50" stroke-width="4" />
            
            <!-- Flechitas paralelas -->
            <path d="M${cx},${cy - gap} l10,-5 l-10,-5" fill="none" stroke="#2C3E50" />
            <path d="M${cx},${cy + gap} l10,-5 l-10,-5" fill="none" stroke="#2C3E50" />

            <!-- Transversal -->
            <line x1="${cx - 80}" y1="${cy + gap + 40}" x2="${cx + 80}" y2="${cy - gap - 40}" stroke="#D32F2F" stroke-width="3" />

            <!-- Etiquetas según tipo -->
            <!-- Esto es complejo dinámicamente, pondremos el valor 'given' en una posición y '?' en la otra -->
            <!-- Hardcodeamos posiciones visuales para simplificar por ahora -->
            <circle cx="${cx + 30}" cy="${cy - gap - 10}" r="20" fill="rgba(66, 165, 245, 0.3)" />
            <text x="${cx + 20}" y="${cy - gap - 5}" font-size="14">${given}°</text>
        `;
    }
}
