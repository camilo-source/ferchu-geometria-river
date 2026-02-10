/**
 * ═══════════════════════════════════════════════════════════
 * 🎨 IMAGE RENDERER - NANO BANANA ENGINE 🍌
 * Generador Dinámico de Geometría SVG
 * Crea gráficos matemáticamente exactos en tiempo real
 * ═══════════════════════════════════════════════════════════
 */

export class ImageRenderer {
    constructor(containerId) {
        this.containerId = containerId;
        this.width = 400;
        this.height = 350;
    }

    updateForExercise(activityType, exercise) {
        this.render(activityType, exercise);
    }

    render(activityType, exercise) {
        // Re-fetch container in case DOM was updated
        this.container = document.getElementById(this.containerId);
        if (!this.container) return;

        let svgContent = '';

        try {
            switch (activityType) {
                case 'identificar-angulo':
                case 'medir-angulo':
                case 'clasificar-angulo':
                    svgContent = this.drawAngle(exercise.angle);
                    break;
                case 'complementario':
                case 'suplementario':
                    svgContent = this.drawComplementaryAngle(exercise.given, activityType);
                    break;
                case 'angulo-faltante':
                    svgContent = this.drawTriangleBySides(exercise.sides, exercise.labels);
                    break;
                case 'clasificar-triangulo-lados':
                case 'clasificar-triangulo-angulos':
                    svgContent = this.drawTriangleBySides(exercise.sides);
                    break;
                case 'lineas-paralelas':
                    svgContent = this.drawParallelLines(exercise.given, exercise.type);
                    break;
                default:
                    svgContent = `<text x="50%" y="50%" text-anchor="middle" font-size="20">Figura no disponible</text>`;
            }
        } catch (error) {
            console.error('Error renderizando ejercicio:', error);
            svgContent = `<text x="50%" y="50%" text-anchor="middle" fill="red" font-size="16">Error: ${error.message}</text>`;
        }

        // SVG MUCHO MÁS GRANDE - llena toda la columna derecha
        this.container.innerHTML = `
            <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet" style="width: 100%; height: auto; max-height: 450px; min-height: 300px; background: white; border-radius: 15px;">
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
        const cx = 300; // Centro REAL X
        const cy = 300; // Centro REAL Y
        const length = 220; // Líneas largas
        const rad = degrees * (Math.PI / 180);

        const x2 = cx + length * Math.cos(-rad);
        const y2 = cy + length * Math.sin(-rad);

        // Arco del ángulo
        const r = 60; // Radio moderado
        const arcEndX = cx + r * Math.cos(-rad);
        const arcEndY = cy + r * Math.sin(-rad);
        const largeArc = degrees > 180 ? 1 : 0;

        // Posición del texto DENTRO del arco (50% del radio)
        const textRad = rad / 2;
        const textR = r * 0.5;
        const textX = cx + textR * Math.cos(-textRad);
        const textY = cy + textR * Math.sin(-textRad);

        return `
            <line x1="${cx}" y1="${cy}" x2="${cx + length}" y2="${cy}" stroke="#2C3E50" stroke-width="6" />
            <line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="#D32F2F" stroke-width="6" />
            <path d="M ${cx + r},${cy} A ${r},${r} 0 ${largeArc},0 ${arcEndX},${arcEndY}" 
                  fill="none" stroke="#FBC02D" stroke-width="5" />
            <text x="${textX}" y="${textY}" font-family="Orbitron" font-size="48" fill="#D32F2F" 
                  font-weight="bold" text-anchor="middle" dominant-baseline="middle">${degrees}°</text>
        `;
    }

    drawComplementaryAngle(given, type) {
        const cx = 300; // Centro REAL X
        const cy = 300; // Centro REAL Y
        const length = 220; // Líneas largas

        if (type === 'complementario') {
            // Ángulo recto base
            const rad = given * (Math.PI / 180);
            const r = 80; // Radio MUY GRANDE

            // Arco para el ángulo "given"
            const arc1EndX = cx + r * Math.cos(-rad);
            const arc1EndY = cy + r * Math.sin(-rad);

            // Arco para el ángulo complementario (de given a 90°)
            const rad90 = 90 * (Math.PI / 180);
            const arc2StartX = arc1EndX;
            const arc2StartY = arc1EndY;
            const arc2EndX = cx + r * Math.cos(-rad90);
            const arc2EndY = cy + r * Math.sin(-rad90);

            // Texto del ángulo given (LEJOS - 65% del radio)
            const text1Rad = rad / 2;
            const text1R = r * 0.65;
            const text1X = cx + text1R * Math.cos(-text1Rad);
            const text1Y = cy + text1R * Math.sin(-text1Rad);

            // Texto del ángulo complementario (LEJOS - 65%)
            const text2Rad = (rad + rad90) / 2;
            const text2R = r * 0.65;
            const text2X = cx + text2R * Math.cos(-text2Rad);
            const text2Y = cy + text2R * Math.sin(-text2Rad);

            return `
                <line x1="${cx}" y1="${cy}" x2="${cx + length}" y2="${cy}" stroke="#2C3E50" stroke-width="6" />
                <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - length}" stroke="#2C3E50" stroke-width="6" />
                <line x1="${cx}" y1="${cy}" x2="${cx + length * Math.cos(-rad)}" y2="${cy + length * Math.sin(-rad)}" stroke="#D32F2F" stroke-width="5" stroke-dasharray="10,5" />
                
                <rect x="${cx}" y="${cy - 40}" width="40" height="40" fill="none" stroke="#2C3E50" stroke-width="3"/>
                
                <!-- Arco del ángulo given -->
                <path d="M ${cx + r},${cy} A ${r},${r} 0 0,0 ${arc1EndX},${arc1EndY}" fill="none" stroke="#FBC02D" stroke-width="5" />
                <text x="${text1X}" y="${text1Y}" font-family="Orbitron" font-size="28" fill="#388E3C" font-weight="bold" text-anchor="middle" dominant-baseline="middle">${given}°</text>
                
                <!-- Arco del ángulo complementario -->
                <path d="M ${arc2StartX},${arc2StartY} A ${r},${r} 0 0,0 ${arc2EndX},${arc2EndY}" fill="none" stroke="#FBC02D" stroke-width="5" />
                <text x="${text2X}" y="${text2Y}" font-family="Orbitron" font-size="32" fill="#D32F2F" font-weight="bold" text-anchor="middle" dominant-baseline="middle">x</text>
            `;
        } else {
            // Suplementario (180°)
            const rad = given * (Math.PI / 180);
            const rad180 = Math.PI; // 180°
            const r = 80; // Radio MUY GRANDE

            // Arco para el ángulo "given"
            const arc1EndX = cx + r * Math.cos(-rad);
            const arc1EndY = cy + r * Math.sin(-rad);

            // Arco para el ángulo suplementario
            const arc2StartX = arc1EndX;
            const arc2StartY = arc1EndY;
            const arc2EndX = cx + r * Math.cos(-rad180);
            const arc2EndY = cy + r * Math.sin(-rad180);

            // Texto dado (LEJOS - 65%)
            const text1Rad = rad / 2;
            const text1R = r * 0.65;
            const text1X = cx + text1R * Math.cos(-text1Rad);
            const text1Y = cy + text1R * Math.sin(-text1Rad);

            // Texto incógnita (LEJOS - 65%)
            const text2Rad = (rad + rad180) / 2;
            const text2R = r * 0.65;
            const text2X = cx + text2R * Math.cos(-text2Rad);
            const text2Y = cy + text2R * Math.sin(-text2Rad);

            return `
                <line x1="${cx - length}" y1="${cy}" x2="${cx + length}" y2="${cy}" stroke="#2C3E50" stroke-width="6" />
                <line x1="${cx}" y1="${cy}" x2="${cx + length * Math.cos(-rad)}" y2="${cy + length * Math.sin(-rad)}" stroke="#D32F2F" stroke-width="5" stroke-dasharray="10,5" />
                
                <circle cx="${cx}" cy="${cy}" r="8" fill="#D32F2F" />
                
                <!-- Arco del ángulo given -->
                <path d="M ${cx + r},${cy} A ${r},${r} 0 0,0 ${arc1EndX},${arc1EndY}" fill="none" stroke="#FBC02D" stroke-width="5" />
                <text x="${text1X}" y="${text1Y}" font-family="Orbitron" font-size="28" fill="#388E3C" font-weight="bold" text-anchor="middle" dominant-baseline="middle">${given}°</text>
                
                <!-- Arco del ángulo suplementario -->
                <path d="M ${arc2StartX},${arc2StartY} A ${r},${r} 0 0,0 ${arc2EndX},${arc2EndY}" fill="none" stroke="#FBC02D" stroke-width="5" />
                <text x="${text2X}" y="${text2Y}" font-family="Orbitron" font-size="32" fill="#D32F2F" font-weight="bold" text-anchor="middle" dominant-baseline="middle">x</text>
            `;
        }
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
            < !--Base Llana-- >
            <line x1="${lx}" y1="${cy}" x2="${rx}" y2="${cy}" stroke="#2C3E50" stroke-width="4" marker-end="url(#arrow)" marker-start="url(#arrow)" />
            <circle cx="${cx}" cy="${cy}" r="6" fill="#2C3E50" />

            <!--Rayo divisor-- >
            <line x1="${cx}" y1="${cy}" x2="${mx}" y2="${my}" stroke="#D32F2F" stroke-width="3" />

            <!--Arco y Texto-- >
            <text x="${cx + 40}" y="${cy - 10}" font-family="Orbitron" font-size="18" fill="#388E3C">${given}°</text>
            <text x="${cx - 40}" y="${cy - 10}" font-family="Orbitron" font-size="24" fill="#D32F2F" font-weight="bold">?</text>
        `;
    }

    // 📐 Primitiva Unificada de Triángulo
    drawTriangleBySides(sides, angleLabels = []) {
        // 1. Cálculos de Geometría (SSS)
        let [a, b, c] = sides;
        // Escalar para el nuevo viewBox 600x600 (mucho más grande)
        const maxSide = Math.max(a, b, c);
        const scale = 350 / maxSide; // Escala muy grande

        // Coordenadas escaladas
        const sa = a * scale;
        const sb = b * scale;
        const sc = c * scale;

        // Vértices A(0,0), B(sc,0). C se calcula.
        // Asumimos C arriba. A izquierda, B derecha.
        // A = (0,0). Ángulo A está en el origen.
        // c es la base AB. b es el lado AC. a es el lado BC.
        // Ley de Cosenos para hallar coordenadas de C (Cx, Cy)
        // b^2 = Cx^2 + Cy^2
        // a^2 = (Cx - sc)^2 + Cy^2 = Cx^2 - 2*sc*Cx + sc^2 + Cy^2
        // a^2 = b^2 - 2*sc*Cx + sc^2
        // Cx = (b^2 + sc^2 - a^2) / (2*sc)
        const Cx = (sb * sb + sc * sc - sa * sa) / (2 * sc);
        const Cy = Math.sqrt(Math.abs(sb * sb - Cx * Cx)); // Altura

        const Ax = 0, Ay = 0;
        const Bx = sc, By = 0;

        // 2. Centrado en Canvas (600x600)
        const centX = (Ax + Bx + Cx) / 3;
        const centY = (Ay + By + Cy) / 3;

        const panX = 300 - centX; // Centro X = 300
        const panY = 300 + centY / 2; // Centro Y = 300

        const tr = (x, y) => ({ x: panX + x, y: panY - y });

        const pA = tr(Ax, Ay);
        const pB = tr(Bx, By);
        const pC = tr(Cx, Cy);

        // 3. Dibujado de Arcos mejorado (Ángulos)
        // Solo si hay etiquetas de ángulos.
        let arcsSVG = '';
        if (angleLabels.length > 0) {

            // Función auxiliar para calcular distancia al vértice opuesto
            // O simplemente usar el lado más corto adyacente para escalar el arco
            const getMinAdjSide = (vIndex) => {
                // vIndex 0 (A) -> lados adyacentes b y c (indices 1 y 2 en sides)
                // vIndex 1 (B) -> lados adyacentes a y c (indices 0 y 2)
                // vIndex 2 (C) -> lados adyacentes a y b (indices 0 y 1)
                // sides = [a, b, c]
                // scale = factor
                const s = (idx) => sides[idx] * scale;
                if (vIndex === 0) return Math.min(s(1), s(2));
                if (vIndex === 1) return Math.min(s(0), s(2));
                if (vIndex === 2) return Math.min(s(0), s(1));
                return 30;
            };

            const drawAngleAtVertex = (pV, pPrev, pNext, label, vIndex) => {
                // Calcular vectores
                const ang1 = Math.atan2(pPrev.y - pV.y, pPrev.x - pV.x);
                const ang2 = Math.atan2(pNext.y - pV.y, pNext.x - pV.x);

                // Calcular radio dinámico MUCHO MÁS GRANDE para evitar amontonamiento
                // Mínimo 40, Máximo 90, o 45% del lado más corto
                const minSide = getMinAdjSide(vIndex);
                const r = Math.max(40, Math.min(90, minSide * 0.45));

                // SVG arc path
                const startX = pV.x + r * Math.cos(ang1);
                const startY = pV.y + r * Math.sin(ang1);
                const endX = pV.x + r * Math.cos(ang2);
                const endY = pV.y + r * Math.sin(ang2);

                // Texto MUY LEJOS del vértice (70% del radio) para no amontonarse
                const textR = r * 0.70;
                let textAng = (ang1 + ang2) / 2;

                // Corrección para el salto de -PI a PI
                // Si la diferencia es mayor a PI, tomar el otro camino
                let diff = ang2 - ang1;
                if (diff < 0) diff += 2 * Math.PI;
                // El ángulo medio real es ang1 + diff/2
                textAng = ang1 + diff / 2;

                // Push text slightly
                const tx = pV.x + textR * Math.cos(textAng);
                const ty = pV.y + textR * Math.sin(textAng);

                return `
            <path d="M ${pV.x} ${pV.y} L ${startX} ${startY} A ${r} ${r} 0 0 1 ${endX} ${endY} Z"
                fill="rgba(255, 235, 59, 0.3)" stroke="#FBC02D" stroke-width="3" />
                    <text x="${tx}"
                        y="${ty}"
                        text-anchor="middle" dominant-baseline="middle"
                        fill="#D32F2F" font-weight="bold" font-size="22"
                        font-family="Orbitron"
                        style="text-shadow: 1px 1px 0 #FFF, -1px -1px 0 #FFF, 1px -1px 0 #FFF, -1px 1px 0 #FFF;"
                    >${label}</text>
                `;
            };

            // Vértice A (entre C y B, indices lados b y c)
            if (angleLabels[0]) arcsSVG += drawAngleAtVertex(pA, pC, pB, angleLabels[0], 0); // OJO Orden C->A->B para sweep correcto? probemos estandar
            // Vértice B (entre A y C)
            if (angleLabels[1]) arcsSVG += drawAngleAtVertex(pB, pA, pC, angleLabels[1], 1);
            // Vértice C (entre B y A)
            if (angleLabels[2]) arcsSVG += drawAngleAtVertex(pC, pB, pA, angleLabels[2], 2);
        }

        // 4. Etiquetas de Lados (solo si NO hay ángulos, o si se decide mostrar ambos)
        // Por ahora, si hay ángulos, priorizamos ángulos para no saturar.
        let sidesSVG = '';
        if (angleLabels.length === 0) {
            sidesSVG = `
            <text x="${(pB.x + pC.x) / 2}" y="${(pB.y + pC.y) / 2 - 10}" fill="#2C3E50" font-size="20" font-weight="bold">${sides[0]}</text>
            <text x="${(pA.x + pC.x) / 2 - 25}" y="${(pA.y + pC.y) / 2}" fill="#2C3E50" font-size="20" font-weight="bold">${sides[1]}</text>
            <text x="${(pA.x + pB.x) / 2}" y="${(pA.y + pB.y) / 2 + 30}" fill="#2C3E50" font-size="20" font-weight="bold">${sides[2]}</text>
        `;
        }

        return `
            <polygon points="${pA.x},${pA.y} ${pB.x},${pB.y} ${pC.x},${pC.y}"
                fill="white" stroke="#2C3E50" stroke-width="4" stroke-linejoin="round" />
            ${arcsSVG}
            ${sidesSVG}
            <!--Vértices -->
            <circle cx="${pA.x}" cy="${pA.y}" r="4" fill="#D32F2F"/>
            <circle cx="${pB.x}" cy="${pB.y}" r="4" fill="#D32F2F"/>
            <circle cx="${pC.x}" cy="${pC.y}" r="4" fill="#D32F2F"/>
        `;
    }

    drawTriangleByAngles(angles, labels = []) {
        // Si entra [A, B, C], calculamos lados relativos
        const A = angles[0];
        const B = angles[1];
        const C = 180 - A - B; // Asegurar cierre

        // Base c arbitraria
        const c = 10;
        const rad = d => d * Math.PI / 180;
        // Ley Senos: a/sinA = c/sinC
        const a = c * Math.sin(rad(A)) / Math.sin(rad(C));
        const b = c * Math.sin(rad(B)) / Math.sin(rad(C));

        // Pasamos las etiquetas tal cual vienen
        return this.drawTriangleBySides([a, b, c], labels);
    }

    drawParallelLines(given, type) {
        const cx = 300;
        const cy = 300;
        const length = 550;
        const gap = 120; // Separación vertical
        const yTop = cy - gap / 2; // 240
        const yBot = cy + gap / 2; // 360

        // Ángulo de la transversal (65 grados visuales)
        const angleDeg = 65;
        const angleRad = angleDeg * Math.PI / 180;
        // Longitud transversal suficiente para cruzar
        const transLen = 400;

        // Puntos de cruce
        // El centro de la figura es (cx, cy). La transversal pasa por ahí.
        // Intersección superior: y = yTop. x = cx + (yTop - cy) / tan(angle) = cx - (gap/2)/tan(angle)
        // Intersección inferior: y = yBot. x = cx + (yBot - cy) / tan(angle) = cx + (gap/2)/tan(angle)

        // Coordenadas de los cruces
        const dx = (gap / 2) / Math.tan(angleRad); // desplazamiento horizontal desde el centro
        const pTop = { x: cx + dx, y: yTop }; // Ajustado: ángulo positivo va "hacia allá" -> /
        // Espera, coordenadas de pantalla: Y crece hacia abajo. 
        // Línea / : X aumenta, Y disminuye.
        // Centro (300, 300).
        // Punto Top (Y=240): X debe ser mayor (derecha).
        // Punto Bot (Y=360): X debe ser menor (izquierda).

        const pInterTop = { x: cx + dx, y: yTop };
        const pInterBot = { x: cx - dx, y: yBot };

        // Transversal completa
        const tParams = { x1: cx - 200, y1: cy + 200 * Math.tan(angleRad) * -1 }; // No, simple visual
        // Mejor dibujamos una línea que pase por pInterBot y pInterTop y se extienda
        const ext = 80;
        const tx1 = pInterBot.x - ext * Math.cos(angleRad);
        const ty1 = pInterBot.y + ext * Math.sin(angleRad);
        const tx2 = pInterTop.x + ext * Math.cos(angleRad);
        const ty2 = pInterTop.y - ext * Math.sin(angleRad);

        // Helper para dibujar ángulo
        const drawAngleArc = (p, startAngle, label, color) => {
            const r = 50;
            const textR = r * 1.6; // Texto MUCHO más lejos
            const sAng = startAngle * Math.PI / 180;
            const eAng = sAng + (180 - angleDeg) * Math.PI / 180; // Suplementario es el obtuso?
            // Simplifiquemos: 4 cuadrantes por intersección.
            // Q1: Arriba-Der (Agudo si /) -> No, obtuso.
            // Definamos los 4 ángulos en pInterTop:
            // 1. Top-Right (Obtuso)
            // 2. Top-Left (Agudo)
            // 3. Bot-Left (Obtuso - Opuesto)
            // 4. Bot-Right (Agudo - Opuesto)
        };

        // Mapeo de ángulos según tipo
        // Asumimos 'given' es el AGUDO para facilitar (o ajustamos logicamente)
        // Caso: given = 60 (Agudo).
        // Posiciones: 
        // 1: Top-Left (Agudo)
        // 2: Top-Right (Obtuso)
        // 3: Bot-Right (Obtuso)
        // 4: Bot-Left (Agudo) -> Espera, alternos internos son Z.

        // Definamos posiciones estándar:
        // A: Top-Left (Agudo)
        // B: Top-Right (Obtuso)
        // C: Bot-Left (Obtuso)
        // D: Bot-Right (Agudo)
        // Alternos Internos: D y A (Si están "adentro" de las paralelas).
        // No, "interno" es entre las paralelas.
        // Cruce Top: Ángulos de abajo (3, 4). Cruce Bot: Ángulos de arriba (1, 2).
        // Internos: Top-BotLeft(Obtuso), Top-BotRight(Agudo), Bot-TopLeft(Agudo), Bot-TopRight(Obtuso).

        // Simplificación visual robusta:
        // Dibujaremos 2 círculos de ángulo.
        // Definimos coordenadas relativas a los puntos de intersección.

        let pos1 = {}; // Donde va 'given'
        let pos2 = {}; // Donde va 'x'

        // Offsets para etiquetas (dx, dy)
        const offA = { dx: -30, dy: -30 }; // Arriba-Izq (Exterior)
        const offB = { dx: 30, dy: -30 };  // Arriba-Der (Exterior)
        const offC = { dx: -30, dy: 30 };  // Abajo-Izq (Interior en Top)
        const offD = { dx: 30, dy: 30 };   // Abajo-Der (Interior en Top)

        // Para pInterTop (Cruce Arriba)
        // Angulo Agudo es Top-Left (si la linea es /) -> No, si linea es /, Top-Left es OBTUSO.
        // Vamos a visualizar: / 
        // Angulo a la izquierda de la transversal, arriba de la paralela: OBTUSO.
        // Angulo a la derecha de la transversal, arriba de la paralela: AGUDO.

        // Vamos a forzar la visualización:
        // Angulo Agudo (A): Derecha-Arriba (Top), Izq-Abajo (Bot).
        // Angulo Obtuso (O): Izq-Arriba (Top), Der-Abajo (Bot).

        // Posiciones visuales (hardcoded para que se vea bien)
        const spots = {
            // Cruce Superior
            TL: { x: pInterTop.x - 40, y: pInterTop.y - 20, isAcute: false }, // Obtuso
            TR: { x: pInterTop.x + 40, y: pInterTop.y - 20, isAcute: true },  // Agudo
            BL: { x: pInterTop.x - 40, y: pInterTop.y + 20, isAcute: true },  // Agudo (Opuesto)
            BR: { x: pInterTop.x + 40, y: pInterTop.y + 20, isAcute: false }, // Obtuso (Opuesto)

            // Cruce Inferior
            tTL: { x: pInterBot.x - 40, y: pInterBot.y - 20, isAcute: false }, // Obtuso
            tTR: { x: pInterBot.x + 40, y: pInterBot.y - 20, isAcute: true },  // Agudo
            tBL: { x: pInterBot.x - 40, y: pInterBot.y + 20, isAcute: true },  // Agudo
            tBR: { x: pInterBot.x + 40, y: pInterBot.y + 20, isAcute: false }, // Obtuso
        };

        // Selección lógica según el tipo
        let dataPos = 'TR'; // Default dado (Agudo arriba)
        let xPos = 'tBL';   // Default incógnita

        // Asumimos 'given' < 90 para la lógica base agudo. Si es > 90, invertimos.
        const isGivenAcute = given < 90;

        // Mapa de relaciones
        // Alterno Interno: "Z". Si tengo Agudo en Top-BotLeft (BL), su alterno interno es Bot-TopRight (tTR).
        // Espera, BL es "Abajo Izquierda" del cruce TOP. Eso es INTERNO.
        // tTR es "Arriba Derecha" del cruce BOT. Eso es INTERNO.
        // Son Alternos (uno izq, uno der) e Internos.

        if (type === 'alterno-interno') {
            // Z perfecta entre agudos
            dataPos = 'BL'; // Top Interno Agudo
            xPos = 'tTR';   // Bot Interno Agudo
            // Si dado es obtuso...
            if (!isGivenAcute) { dataPos = 'BR'; xPos = 'tTL'; }
        } else if (type === 'correspondiente') {
            // Mismo lugar, diferente cruce (F)
            dataPos = 'TR'; // Top Externo Agudo
            xPos = 'tTR';   // Bot Interno Agudo
            if (!isGivenAcute) { dataPos = 'TL'; xPos = 'tTL'; }
        } else if (type === 'alterno-externo') {
            // Afuera cruzados
            dataPos = 'TR'; // Top Externo Agudo
            xPos = 'tBL';   // Bot Externo Agudo
            if (!isGivenAcute) { dataPos = 'TL'; xPos = 'tBR'; }
        } else if (type === 'conjugado') {
            // Internos del mismo lado (C). Suman 180.
            dataPos = 'BL'; // Top Interno Agudo
            xPos = 'tTL';   // Bot Interno Obtuso (Suplementario)
            if (!isGivenAcute) { dataPos = 'BR'; xPos = 'tTR'; }
        }

        const p1 = spots[dataPos];
        const p2 = spots[xPos];

        return `
            <!-- Líneas Paralelas -->
            <line x1="${cx - length / 2}" y1="${yTop}" x2="${cx + length / 2}" y2="${yTop}" stroke="#2C3E50" stroke-width="6" />
            <line x1="${cx - length / 2}" y1="${yBot}" x2="${cx + length / 2}" y2="${yBot}" stroke="#2C3E50" stroke-width="6" />
            
            <!-- Flechas indicando paralelismo -->
            <path d="M${cx + 200},${yTop} l-15,-8 l0,16 z" fill="#2C3E50" />
            <path d="M${cx + 200},${yBot} l-15,-8 l0,16 z" fill="#2C3E50" />

            <!-- Transversal -->
            <line x1="${tx1}" y1="${ty1}" x2="${tx2}" y2="${ty2}" stroke="#D32F2F" stroke-width="4" />

            <!-- Ángulo Dado -->
            <g transform="translate(${p1.x},${p1.y})">
                 <circle r="30" fill="rgba(56, 142, 60, 0.2)" stroke="#388E3C" stroke-width="2"/>
                 <text y="5" text-anchor="middle" font-family="Orbitron" font-size="24" fill="#388E3C" font-weight="bold">${given}°</text>
            </g>

            <!-- Ángulo Incógnita -->
            <g transform="translate(${p2.x},${p2.y})">
                 <circle r="35" fill="rgba(211, 47, 47, 0.2)" stroke="#D32F2F" stroke-width="2" stroke-dasharray="4,2"/>
                 <text y="8" text-anchor="middle" font-family="Orbitron" font-size="32" fill="#D32F2F" font-weight="bold">x</text>
            </g>
        `;
    }
}
