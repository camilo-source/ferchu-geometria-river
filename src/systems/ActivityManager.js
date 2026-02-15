/**
 * ═══════════════════════════════════════════════════════════
 * 🌌 GEOMETRÍA ANTI-GRAVEDAD - Sistema de Actividades
 * Sistema para registrar respuestas y generar reportes
 * Ahora con soporte multi-tema
 * ═══════════════════════════════════════════════════════════
 */

export class ActivityManager {
    constructor() {
        this.studentName = '';
        this.currentActivity = 0;
        this.currentTopic = null;
        this.activities = [];
        this.responses = [];
        this.startTime = null;
        this.endTime = null;
    }

    startSession(studentName) {
        this.studentName = studentName;
        this.startTime = new Date();
        console.log(`📚 Sesión iniciada para ${studentName}`);
    }

    loadActivitiesForTopic(topicId) {
        this.currentTopic = topicId;
        switch (topicId) {
            case 'triangulos':
                this.loadTriangulosActivities();
                break;
            case 'potenciacion':
                this.loadPotenciacionActivities();
                break;
            case 'radicacion':
                this.loadRadicacionActivities();
                break;
            default:
                this.loadTriangulosActivities();
        }
        return this.activities;
    }

    // ═══════════════════════════════════════════════════════════
    // 📐 TEMA: TRIÁNGULOS Y ÁNGULOS
    // ═══════════════════════════════════════════════════════════
    loadTriangulosActivities() {
        this.activities = [
            // ═══════════════════════════════════════════════
            // 🟢 NIVEL 1: Reconocimiento básico (más fácil)
            // ═══════════════════════════════════════════════
            {
                id: 1,
                type: 'identificar-angulo',
                title: 'El Ojo de Halcón 👁️',
                instructions: 'Mirá el gráfico y decí qué tipo de ángulo es:',
                exercises: [
                    { angle: 90, correctAnswer: 'recto' },
                    { angle: 45, correctAnswer: 'agudo' },
                    { angle: 120, correctAnswer: 'obtuso' },
                    { angle: 30, correctAnswer: 'agudo' },
                    { angle: 150, correctAnswer: 'obtuso' },
                    { angle: 10, correctAnswer: 'agudo' },
                    { angle: 175, correctAnswer: 'obtuso' }
                ]
            },

            // ═══════════════════════════════════════════════
            // 🟢 NIVEL 2: Medición / Estimación
            // ═══════════════════════════════════════════════
            {
                id: 2,
                type: 'medir-angulo',
                title: 'Francotirador de Ángulos 🎯',
                instructions: 'Estimá cuántos grados mide este ángulo:',
                exercises: [
                    { angle: 90, tolerance: 5, correctAnswer: 90 },
                    { angle: 45, tolerance: 5, correctAnswer: 45 },
                    { angle: 60, tolerance: 5, correctAnswer: 60 },
                    { angle: 120, tolerance: 5, correctAnswer: 120 },
                    { angle: 180, tolerance: 5, correctAnswer: 180 },
                    { angle: 135, tolerance: 5, correctAnswer: 135 },
                    { angle: 30, tolerance: 4, correctAnswer: 30 },
                    { angle: 15, tolerance: 4, correctAnswer: 15 }
                ]
            },

            // ═══════════════════════════════════════════════
            // 🔵 NIVEL 3: Complementarios (suman 90°)
            // ═══════════════════════════════════════════════
            {
                id: 3,
                type: 'complementario',
                title: 'Completá el 90° ⚡',
                instructions: 'Dos ángulos son complementarios si suman 90°. ¿Cuánto mide el otro?',
                exercises: [
                    { given: 45, correctAnswer: 45 },
                    { given: 30, correctAnswer: 60 },
                    { given: 60, correctAnswer: 30 },
                    { given: 50, correctAnswer: 40 },
                    { given: 25, correctAnswer: 65 },
                    { given: 15, correctAnswer: 75 },
                    { given: 72, correctAnswer: 18 },
                    { given: 83, correctAnswer: 7 }
                ]
            },

            // ═══════════════════════════════════════════════
            // 🔵 NIVEL 4: Suplementarios (suman 180°)
            // ═══════════════════════════════════════════════
            {
                id: 4,
                type: 'suplementario',
                title: 'Completá la Recta (180°) 📏',
                instructions: 'Dos ángulos son suplementarios si suman 180°. ¿Cuánto mide el otro?',
                exercises: [
                    { given: 90, correctAnswer: 90 },
                    { given: 120, correctAnswer: 60 },
                    { given: 60, correctAnswer: 120 },
                    { given: 150, correctAnswer: 30 },
                    { given: 45, correctAnswer: 135 },
                    { given: 35, correctAnswer: 145 },
                    { given: 165, correctAnswer: 15 },
                    { given: 12, correctAnswer: 168 }
                ]
            },

            // ═══════════════════════════════════════════════
            // 🟡 NIVEL 5: Ángulos Adyacentes y Opuestos por el Vértice
            // ═══════════════════════════════════════════════
            {
                id: 5,
                type: 'angulo-faltante',
                title: 'Opuestos por el Vértice 🔀',
                instructions: 'Dos rectas se cortan formando ángulos. Calculá "x":',
                exercises: [
                    { labels: ['60°', 'x', '60°'], sides: [5, 5, 5], correctAnswer: 60 },
                    { labels: ['90°', 'x', '90°'], sides: [5, 5, 5], correctAnswer: 90 },
                    { labels: ['45°', 'x', '45°'], sides: [5, 5, 5], correctAnswer: 45 },
                    { labels: ['130°', 'x'], sides: [5, 5], correctAnswer: 50 },
                    { labels: ['72°', 'x'], sides: [5, 5], correctAnswer: 108 },
                    { labels: ['155°', 'x'], sides: [5, 5], correctAnswer: 25 }
                ]
            },

            // ═══════════════════════════════════════════════
            // 🟡 NIVEL 6: Bisectriz
            // ═══════════════════════════════════════════════
            {
                id: 6,
                type: 'angulo-faltante',
                title: 'La Bisectriz ✂️',
                instructions: 'La bisectriz divide un ángulo en 2 iguales. ¿Cuánto mide cada mitad?',
                exercises: [
                    { labels: ['90°', '→', 'x'], sides: [5, 5, 5], correctAnswer: 45 },
                    { labels: ['60°', '→', 'x'], sides: [5, 5, 5], correctAnswer: 30 },
                    { labels: ['120°', '→', 'x'], sides: [5, 5, 5], correctAnswer: 60 },
                    { labels: ['180°', '→', 'x'], sides: [5, 5, 5], correctAnswer: 90 },
                    { labels: ['70°', '→', 'x'], sides: [5, 5, 5], correctAnswer: 35 },
                    { labels: ['150°', '→', 'x'], sides: [5, 5, 5], correctAnswer: 75 },
                    { labels: ['46°', '→', 'x'], sides: [5, 5, 5], correctAnswer: 23 }
                ]
            },

            // ═══════════════════════════════════════════════
            // 🟠 NIVEL 7: Triángulos por Lados (TP 6)
            // ═══════════════════════════════════════════════
            {
                id: 7,
                type: 'clasificar-triangulo-lados',
                title: 'Triángulos: Lados (TP 6) 📐',
                instructions: 'Según las longitudes de sus lados, ¿qué tipo es?',
                exercises: [
                    { sides: [5, 5, 5], correctAnswer: 'equilátero' },
                    { sides: [4, 4, 6], correctAnswer: 'isósceles' },
                    { sides: [3, 4, 5], correctAnswer: 'escaleno' },
                    { sides: [7, 7, 3], correctAnswer: 'isósceles' },
                    { sides: [6, 8, 10], correctAnswer: 'escaleno' },
                    { sides: [5, 5, 2], correctAnswer: 'isósceles' },
                    { sides: [9, 12, 15], correctAnswer: 'escaleno' }
                ]
            },

            // ═══════════════════════════════════════════════
            // 🟠 NIVEL 8: Triángulos por Ángulos (TP 6)
            // ═══════════════════════════════════════════════
            {
                id: 8,
                type: 'clasificar-triangulo-angulos',
                title: 'Triángulos: Ángulos (TP 6) 📐',
                instructions: 'Mirá los ángulos y clasificá el triángulo:',
                exercises: [
                    { labels: ['60°', '60°', '60°'], sides: [5, 5, 5], correctAnswer: 'acutángulo' },
                    { labels: ['90°', '45°', '45°'], sides: [5, 3.5, 3.5], correctAnswer: 'rectángulo' },
                    { labels: ['90°', '60°', '30°'], sides: [5, 4.3, 2.5], correctAnswer: 'rectángulo' },
                    { labels: ['80°', '60°', '40°'], sides: [5, 4.5, 3.5], correctAnswer: 'acutángulo' },
                    { labels: ['120°', '35°', '25°'], sides: [8, 5, 4], correctAnswer: 'obtusángulo' },
                    { labels: ['108°', '36°', '36°'], sides: [8, 5, 5], correctAnswer: 'obtusángulo' },
                    { labels: ['100°', '50°', '30°'], sides: [7, 5, 3], correctAnswer: 'obtusángulo' }
                ]
            },

            // ═══════════════════════════════════════════════
            // 🔴 NIVEL 9: Ángulo faltante del triángulo (180°)
            // ═══════════════════════════════════════════════
            {
                id: 9,
                type: 'angulo-faltante',
                title: 'El Ángulo Perdido 🔍',
                instructions: 'Los ángulos del triángulo suman 180°. ¿Cuánto mide "x"?',
                exercises: [
                    { labels: ['60°', '60°', 'x'], sides: [5, 5, 5], correctAnswer: 60 },
                    { labels: ['90°', '45°', 'x'], sides: [5, 3.5, 3.5], correctAnswer: 45 },
                    { labels: ['90°', '30°', 'x'], sides: [5, 4.3, 2.5], correctAnswer: 60 },
                    { labels: ['80°', '10°', 'x'], sides: [5, 0.9, 5.1], correctAnswer: 90 },
                    { labels: ['36°', '36°', 'x'], sides: [5, 5, 8], correctAnswer: 108 },
                    { labels: ['20°', '40°', 'x'], sides: [3, 6, 8], correctAnswer: 120 },
                    { labels: ['70°', 'x', '70°'], sides: [5, 6, 5], correctAnswer: 40 },
                    { labels: ['120°', 'x', '30°'], sides: [8, 3, 5], correctAnswer: 30 },
                    { labels: ['150°', '15°', 'x'], sides: [9, 2, 7.5], correctAnswer: 15 }
                ]
            },

            // ═══════════════════════════════════════════════
            // 🔴 NIVEL 10: Paralelas cortadas por transversal (Boss)
            // ═══════════════════════════════════════════════
            {
                id: 10,
                type: 'lineas-paralelas',
                title: 'Vías del Tren 🚂',
                instructions: 'En estas paralelas, ¿cuánto mide el ángulo marcado?',
                exercises: [
                    { given: 90, type: 'correspondiente', correctAnswer: 90 },
                    { given: 60, type: 'correspondiente', correctAnswer: 60 },
                    { given: 45, type: 'alterno-interno', correctAnswer: 45 },
                    { given: 75, type: 'alterno-interno', correctAnswer: 75 },
                    { given: 120, type: 'alterno-externo', correctAnswer: 120 },
                    { given: 30, type: 'alterno-externo', correctAnswer: 30 },
                    { given: 110, type: 'conjugado', correctAnswer: 70 },
                    { given: 135, type: 'conjugado', correctAnswer: 45 },
                    { given: 150, type: 'conjugado', correctAnswer: 30 },
                    { given: 55, type: 'conjugado', correctAnswer: 125 }
                ]
            }
        ];
    }

    // ═══════════════════════════════════════════════════════════
    // 🔢 TEMA: POTENCIACIÓN
    // Ejercicios extraídos de CLASE FERCHU 06.02 y 09.02
    // ═══════════════════════════════════════════════════════════
    loadPotenciacionActivities() {
        this.activities = [
            // 🟢 NIVEL 1: La Base — Propiedad única
            {
                id: 1,
                type: 'potencia-simple',
                title: 'La Base ⚡',
                instructions: 'Resolvé usando UNA propiedad de potenciación:',
                exercises: [
                    {
                        // 2² · 2⁵ = 2⁷
                        expression: '2² · 2⁵',
                        parts: [
                            { base: 2, exp: 2 },
                            { op: '·' },
                            { base: 2, exp: 5 }
                        ],
                        property: 'multiplicacion',
                        hint: 'Misma base → sumá los exponentes',
                        correctBase: 2,
                        correctExp: 7
                    },
                    {
                        // 4³ · 4² = 4⁵
                        expression: '4³ · 4²',
                        parts: [
                            { base: 4, exp: 3 },
                            { op: '·' },
                            { base: 4, exp: 2 }
                        ],
                        property: 'multiplicacion',
                        hint: 'Misma base → sumá los exponentes',
                        correctBase: 4,
                        correctExp: 5
                    },
                    {
                        // 3⁵ / 3² = 3³
                        expression: '3⁵ / 3²',
                        parts: [
                            { base: 3, exp: 5 },
                            { op: '/' },
                            { base: 3, exp: 2 }
                        ],
                        property: 'division',
                        hint: 'Misma base → restá los exponentes',
                        correctBase: 3,
                        correctExp: 3
                    },
                    {
                        // 7⁶ / 7⁴ = 7²
                        expression: '7⁶ / 7⁴',
                        parts: [
                            { base: 7, exp: 6 },
                            { op: '/' },
                            { base: 7, exp: 4 }
                        ],
                        property: 'division',
                        hint: 'Misma base → restá los exponentes',
                        correctBase: 7,
                        correctExp: 2
                    },
                    {
                        // (5²)⁴ = 5⁸
                        expression: '(5²)⁴',
                        parts: [
                            { base: 5, exp: 2, outerExp: 4 }
                        ],
                        property: 'potencia-de-potencia',
                        hint: 'Potencia de potencia → multiplicá los exponentes',
                        correctBase: 5,
                        correctExp: 8
                    }
                ]
            },

            // 🟡 NIVEL 2: Combitos — 2 propiedades combinadas
            {
                id: 2,
                type: 'potencia-combinada',
                title: 'Combitos 🔥',
                instructions: 'Resolvé combinando propiedades (paso a paso):',
                exercises: [
                    {
                        // (2²)³ · 2² = 2⁶ · 2² = 2⁸
                        expression: '(2²)³ · 2²',
                        parts: [
                            { base: 2, exp: 2, outerExp: 3 },
                            { op: '·' },
                            { base: 2, exp: 2 }
                        ],
                        property: 'pot+mult',
                        hint: 'Primero (2²)³ = 2⁶, después multiplicá',
                        correctBase: 2,
                        correctExp: 8
                    },
                    {
                        // (3³/3) · 3² = 3² · 3² = 3⁴
                        expression: '(3³ / 3) · 3²',
                        parts: [
                            { base: 3, exp: 3 },
                            { op: '/' },
                            { base: 3, exp: 1 },
                            { op: '·' },
                            { base: 3, exp: 2 }
                        ],
                        property: 'div+mult',
                        hint: 'Primero 3³/3 = 3², después multiplicá',
                        correctBase: 3,
                        correctExp: 4
                    },
                    {
                        // (3⁵/3²) · 3 = 3³ · 3¹ = 3⁴
                        expression: '(3⁵ / 3²) · 3',
                        parts: [
                            { base: 3, exp: 5 },
                            { op: '/' },
                            { base: 3, exp: 2 },
                            { op: '·' },
                            { base: 3, exp: 1 }
                        ],
                        property: 'div+mult',
                        hint: 'Primero 3⁵/3² = 3³, después multiplicá',
                        correctBase: 3,
                        correctExp: 4
                    },
                    {
                        // (4²)³ · 4 = 4⁶ · 4¹ = 4⁷
                        expression: '(4²)³ · 4',
                        parts: [
                            { base: 4, exp: 2, outerExp: 3 },
                            { op: '·' },
                            { base: 4, exp: 1 }
                        ],
                        property: 'pot+mult',
                        hint: 'Primero (4²)³ = 4⁶, después multiplicá',
                        correctBase: 4,
                        correctExp: 7
                    },
                    {
                        // (4⁵/4)² = (4⁴)² = 4⁸
                        expression: '(4⁵ / 4)²',
                        parts: [
                            { base: 4, exp: 5 },
                            { op: '/' },
                            { base: 4, exp: 1 },
                            { outerExp: 2 }
                        ],
                        property: 'div+pot',
                        hint: 'Primero dividí adentro: 4⁴, después elevá',
                        correctBase: 4,
                        correctExp: 8
                    }
                ]
            },

            // 🔴 NIVEL 3: El Final Boss — Combinados complejos
            {
                id: 3,
                type: 'potencia-boss',
                title: 'El Final Boss 💀',
                instructions: '¡Resolvé estos combinados complejos!',
                exercises: [
                    {
                        // (3²)³ · 3² = 3⁸
                        expression: '(3²)³ · 3²',
                        parts: [
                            { base: 3, exp: 2, outerExp: 3 },
                            { op: '·' },
                            { base: 3, exp: 2 }
                        ],
                        property: 'pot+mult',
                        hint: '(3²)³ = 3⁶ → 3⁶ · 3² = ?',
                        correctBase: 3,
                        correctExp: 8
                    },
                    {
                        // (2·2⁵)·(2⁴/2) = 2⁶ · 2³ = 2⁹
                        expression: '(2 · 2⁵) · (2⁴ / 2)',
                        parts: [
                            { base: 2, exp: 1 },
                            { op: '·' },
                            { base: 2, exp: 5 },
                            { op: '·' },
                            { base: 2, exp: 4 },
                            { op: '/' },
                            { base: 2, exp: 1 }
                        ],
                        property: 'mult+div+mult',
                        hint: 'Izq: 2¹·2⁵=2⁶ | Der: 2⁴/2¹=2³ | Final: 2⁶·2³=?',
                        correctBase: 2,
                        correctExp: 9
                    },
                    {
                        // (5³)²·(5⁵/5²) = 5⁶·5³ = 5⁹
                        expression: '(5³)² · (5⁵ / 5²)',
                        parts: [
                            { base: 5, exp: 3, outerExp: 2 },
                            { op: '·' },
                            { base: 5, exp: 5 },
                            { op: '/' },
                            { base: 5, exp: 2 }
                        ],
                        property: 'pot+div+mult',
                        hint: 'Izq: (5³)²=5⁶ | Der: 5⁵/5²=5³ | Final: ?',
                        correctBase: 5,
                        correctExp: 9
                    },
                    {
                        // (3⁴/3²)·(3²)² = 3²·3⁴ = 3⁶
                        expression: '(3⁴ / 3²) · (3²)²',
                        parts: [
                            { base: 3, exp: 4 },
                            { op: '/' },
                            { base: 3, exp: 2 },
                            { op: '·' },
                            { base: 3, exp: 2, outerExp: 2 }
                        ],
                        property: 'div+pot+mult',
                        hint: 'Izq: 3⁴/3²=3² | Der: (3²)²=3⁴ | Final: ?',
                        correctBase: 3,
                        correctExp: 6
                    },
                    {
                        // (8⁸/8⁵)·8·8³ = 8³·8¹·8³ = 8⁷
                        expression: '(8⁸ / 8⁵) · 8 · 8³',
                        parts: [
                            { base: 8, exp: 8 },
                            { op: '/' },
                            { base: 8, exp: 5 },
                            { op: '·' },
                            { base: 8, exp: 1 },
                            { op: '·' },
                            { base: 8, exp: 3 }
                        ],
                        property: 'div+mult+mult',
                        hint: '8⁸/8⁵=8³ → 8³·8¹·8³ = ?',
                        correctBase: 8,
                        correctExp: 7
                    }
                ]
            },

            // 🔵 NIVEL 4: Detectives de Exponentes (Faltante)
            {
                id: 4,
                type: 'potencia-faltante',
                title: 'Detective de Exponentes 🕵️',
                instructions: '¿Qué exponente falta para que la igualdad sea correcta?',
                exercises: [
                    {
                        expression: '6⁷ · 6ⁿ = 6¹¹',
                        parts: [
                            { base: 6, exp: 7 },
                            { op: '·' },
                            { base: 6, dev: 'n' } // dev = missing
                        ],
                        correctAnswer: 4,
                        missingType: 'exponent',
                        hint: '7 + ? = 11'
                    },
                    {
                        expression: '4⁵ · 4ⁿ = 4⁹',
                        parts: [{ base: 4, exp: 5 }, { op: '·' }, { base: 4, dev: 'n' }],
                        correctAnswer: 4,
                        missingType: 'exponent',
                        hint: '5 + ? = 9'
                    },
                    {
                        expression: 'x⁶ : xⁿ = x⁴',
                        parts: [{ base: 'x', exp: 6 }, { op: ':' }, { base: 'x', dev: 'n' }],
                        correctAnswer: 2,
                        missingType: 'exponent',
                        hint: '6 - ? = 4'
                    },
                    {
                        expression: '(5³)ⁿ = 5¹⁵',
                        parts: [{ base: 5, exp: 3, outerDev: 'n' }],
                        correctAnswer: 5,
                        missingType: 'exponent',
                        hint: '3 × ? = 15'
                    },
                    {
                        expression: '8¹⁰ : 8ⁿ = 8³',
                        parts: [{ base: 8, exp: 10 }, { op: ':' }, { base: 8, dev: 'n' }],
                        correctAnswer: 7,
                        missingType: 'exponent',
                        hint: '10 - ? = 3'
                    }
                ]
            },

            // 🟡 NIVEL 5: Álgebra Nuñeza (Letras)
            {
                id: 5,
                type: 'potencia-algebraica',
                title: 'Álgebra Nuñeza 🧬',
                instructions: 'Resolvé usando propiedades (ahora con letras):',
                exercises: [
                    {
                        expression: 'x⁵ · x²',
                        parts: [{ base: 'x', exp: 5 }, { op: '·' }, { base: 'x', exp: 2 }],
                        property: 'multiplicacion',
                        hint: 'Base "x", sumá exponentes',
                        correctBase: 'x',
                        correctExp: 7
                    },
                    {
                        expression: 'y⁸ : y³',
                        parts: [{ base: 'y', exp: 8 }, { op: ':' }, { base: 'y', exp: 3 }],
                        property: 'division',
                        hint: 'Base "y", restá exponentes',
                        correctBase: 'y',
                        correctExp: 5
                    },
                    {
                        expression: '(m⁴)³',
                        parts: [{ base: 'm', exp: 4, outerExp: 3 }],
                        property: 'potencia-de-potencia',
                        hint: 'Multiplicá 4 × 3',
                        correctBase: 'm',
                        correctExp: 12
                    },
                    {
                        expression: 'a³ · a · a⁴',
                        parts: [{ base: 'a', exp: 3 }, { op: '·' }, { base: 'a', exp: 1 }, { op: '·' }, { base: 'a', exp: 4 }],
                        property: 'multiplicacion',
                        hint: 'Recuerda: a = a¹. Sumá todo.',
                        correctBase: 'a',
                        correctExp: 8
                    },
                    {
                        expression: '(p³)² · p⁵',
                        parts: [{ base: 'p', exp: 3, outerExp: 2 }, { op: '·' }, { base: 'p', exp: 5 }],
                        property: 'pot+mult',
                        hint: 'Primero (p³)² = p⁶',
                        correctBase: 'p',
                        correctExp: 11
                    }
                ]
            },

            // 🔴 NIVEL 6: Desafío Final (Combinados Algebraicos)
            {
                id: 6,
                type: 'potencia-boss-algebra',
                title: 'El Master de las Letras 🎓',
                instructions: 'Ejercicios combinados nivel examen:',
                exercises: [
                    {
                        expression: '(x³ · x⁴) : x⁵',
                        property: 'mult+div',
                        hint: 'Paréntesis primero: x³·x⁴',
                        correctBase: 'x',
                        correctExp: 2
                    },
                    {
                        expression: '(a⁴)³ : (a²)⁵',
                        property: 'pot+div',
                        hint: 'Potencias primero: a¹² : a¹⁰',
                        correctBase: 'a',
                        correctExp: 2
                    },
                    {
                        expression: '(m³)² · m : m⁶',
                        property: 'pot+mult+div',
                        hint: 'm⁶ · m¹ : m⁶',
                        correctBase: 'm',
                        correctExp: 1
                    },
                    {
                        expression: '((y²)³)² : y¹⁰',
                        property: 'pot+pot+div',
                        hint: 'Potencia de potencia de potencia: 2×3×2',
                        correctBase: 'y',
                        correctExp: 2
                    }
                ]
            },

            // ═══════════════════════════════════════════════════════════
            // 💀💀💀 ACTIVIDAD 5 — LOS EJERCICIOS MÁS DIFÍCILES 💀💀💀
            // Fuente: TP N°4 Parte IV EXTRAS + Clase Ferchu 09.02 + Pizarrón
            // ═══════════════════════════════════════════════════════════

            // 🟣 NIVEL 7: Corchetes y Llaves — Resolver de adentro hacia afuera
            {
                id: 7,
                type: 'potencia-boss-algebra',
                title: '🔒 Corchetes y Llaves',
                instructions: '¡Ejercicios con paréntesis, corchetes y llaves! Resolvé de ADENTRO hacia AFUERA:',
                exercises: [
                    {
                        // {[(y⁸ : y³)²] · y⁹} : y⁷
                        // Paso 1: y⁸ : y³ = y⁵
                        // Paso 2: (y⁵)² = y¹⁰
                        // Paso 3: y¹⁰ · y⁹ = y¹⁹
                        // Paso 4: y¹⁹ : y⁷ = y¹²
                        expression: '{[(y⁸ : y³)²] · y⁹} : y⁷',
                        property: 'div+pot+mult+div',
                        hint: 'Paso a paso: y⁸:y³=y⁵ → (y⁵)²=y¹⁰ → y¹⁰·y⁹=y¹⁹ → y¹⁹:y⁷=?',
                        correctBase: 'y',
                        correctExp: 12
                    },
                    {
                        // [a¹⁰ · a³⁰ · a]³ : (a¹⁰)¹⁰
                        expression: '[a¹⁰ · a³⁰ · a]³ : (a¹⁰)¹⁰',
                        property: 'mult+pot+div',
                        hint: 'Corchete: 10+30+1=41 → (a⁴¹)³=a¹²³ | Divisor: a¹⁰⁰ | Final: 123-100=?',
                        correctBase: 'a',
                        correctExp: 23
                    },
                    {
                        // (7²)³ · (7⁴ / 7)
                        expression: '(7²)³ · (7⁴ / 7)',
                        property: 'pot+div+mult',
                        hint: 'Izq: (7²)³=7⁶ | Der: 7⁴/7=7³ | Final: 7⁶·7³=?',
                        correctBase: 7,
                        correctExp: 9
                    },
                    {
                        // (2⁴ · 2⁵) : (2¹² / 2⁴)
                        expression: '(2⁴ · 2⁵) : (2¹² / 2⁴)',
                        property: 'mult+div+div',
                        hint: 'Izq: 2⁴·2⁵=2⁹ | Der: 2¹²/2⁴=2⁸ | Final: 2⁹:2⁸=?',
                        correctBase: 2,
                        correctExp: 1
                    }
                ]
            },

            // 🟣 NIVEL 8: Bases Negativas — ¡Cuidado con el signo!
            {
                id: 8,
                type: 'potencia-negativa',
                title: '⚠️ Bases Negativas',
                instructions: 'Resolvé con bases NEGATIVAS. Recordá: (-base)ᵖᵃʳ = positivo, (-base)ⁱᵐᵖᵃʳ = negativo',
                exercises: [
                    {
                        // [(-3)⁵⁰ : (-3)⁴⁸]² = [(-3)²]² = (-3)⁴ = 81
                        expression: '[(-3)⁵⁰ : (-3)⁴⁸]²',
                        parts: [
                            { base: -3, exp: 50 },
                            { op: ':' },
                            { base: -3, exp: 48 },
                            { outerExp: 2 }
                        ],
                        property: 'div+pot',
                        hint: 'Div: 50-48=2 → [(-3)²]² → potencia de potencia: 2×2=4 → (-3)⁴ = positivo',
                        correctAnswer: 81,
                        correctDisplay: '(-3)⁴ = 81',
                        steps: [
                            '(-3)⁵⁰ : (-3)⁴⁸ = (-3)²',
                            '[(-3)²]² = (-3)⁴',
                            '(-3)⁴ = 81 (par → positivo)'
                        ]
                    },
                    {
                        // (-2)⁷ · (-2)³ = (-2)¹⁰ = 1024
                        expression: '(-2)⁷ · (-2)³',
                        parts: [
                            { base: -2, exp: 7 },
                            { op: '·' },
                            { base: -2, exp: 3 }
                        ],
                        property: 'multiplicacion',
                        hint: 'Misma base: 7+3=10 → (-2)¹⁰. ¿Exponente par o impar?',
                        correctAnswer: 1024,
                        correctDisplay: '(-2)¹⁰ = 1024',
                        steps: [
                            '(-2)⁷ · (-2)³ = (-2)¹⁰',
                            'Exponente 10 es PAR → resultado positivo',
                            '2¹⁰ = 1024'
                        ]
                    },
                    {
                        // (-5)⁴ : (-5)² = (-5)² = 25
                        expression: '(-5)⁴ : (-5)²',
                        parts: [
                            { base: -5, exp: 4 },
                            { op: ':' },
                            { base: -5, exp: 2 }
                        ],
                        property: 'division',
                        hint: '4-2=2 → (-5)². ¿Exponente par o impar?',
                        correctAnswer: 25,
                        correctDisplay: '(-5)² = 25',
                        steps: [
                            '(-5)⁴ : (-5)² = (-5)²',
                            'Exponente 2 es PAR → positivo',
                            '5² = 25'
                        ]
                    },
                    {
                        // (-3)⁵ · (-3)² = (-3)⁷ = -2187
                        expression: '(-3)⁵ · (-3)²',
                        parts: [
                            { base: -3, exp: 5 },
                            { op: '·' },
                            { base: -3, exp: 2 }
                        ],
                        property: 'multiplicacion',
                        hint: '5+2=7 → (-3)⁷. Exponente IMPAR → resultado negativo',
                        correctAnswer: -2187,
                        correctDisplay: '(-3)⁷ = -2187',
                        steps: [
                            '(-3)⁵ · (-3)² = (-3)⁷',
                            'Exponente 7 es IMPAR → negativo',
                            '-(3⁷) = -2187'
                        ]
                    }
                ]
            },

            // 💀 NIVEL 9: EL MONSTRUO FINAL — Hallar el exponente faltante en ecuaciones complejas
            {
                id: 9,
                type: 'potencia-faltante-avanzado',
                title: '💀 El Monstruo Final',
                instructions: '¡El nivel más difícil! Encontrá el exponente que falta para que la igualdad se cumpla:',
                exercises: [
                    {
                        // (x · x)²⁰ : (xⁿ)⁸ = 1
                        // 40 = 8n → n = 5
                        expression: '(x · x)²⁰ : (xⁿ)⁸ = 1',
                        hint: 'Izq: (x·x)²⁰ = (x²)²⁰ = x⁴⁰ | Para que dé 1 (x⁰), los exponentes deben ser iguales → 40 = 8×?',
                        correctAnswer: 5,
                        missingType: 'exponent',
                        steps: [
                            '(x · x)²⁰ = (x²)²⁰ = x⁴⁰',
                            '(xⁿ)⁸ = x⁸ⁿ',
                            'Para que x⁴⁰ : x⁸ⁿ = x⁰ = 1',
                            '40 = 8n → n = 5'
                        ]
                    },
                    {
                        // (a¹⁰ · aⁿ · a²) : (a²)¹⁰ = a³
                        // n = 11
                        expression: '(a¹⁰ · aⁿ · a²) : (a²)¹⁰ = a³',
                        hint: 'Izq: a^(10+n+2) = a^(12+n) | Der: (a²)¹⁰ = a²⁰ | Ecuación: (12+n) - 20 = 3',
                        correctAnswer: 11,
                        missingType: 'exponent',
                        steps: [
                            'Numerador: a¹⁰ · aⁿ · a² = a^(12+n)',
                            'Denominador: (a²)¹⁰ = a²⁰',
                            'División: a^(12+n-20) = a³',
                            '12 + n - 20 = 3 → n = 11'
                        ]
                    },
                    {
                        // 9¹⁷ · 9ⁿ : 9⁶ = 9¹⁹
                        // n = 8
                        expression: '9¹⁷ · 9ⁿ : 9⁶ = 9¹⁹',
                        hint: '17 + n - 6 = 19 → n = ?',
                        correctAnswer: 8,
                        missingType: 'exponent',
                        steps: [
                            '9¹⁷ · 9ⁿ : 9⁶ = 9^(17+n-6)',
                            '17 + n - 6 = 19',
                            '11 + n = 19',
                            'n = 8'
                        ]
                    },
                    {
                        // [(3⁵ : 3²)ⁿ] · 3⁴ = 3¹⁹
                        // n = 5
                        expression: '[(3⁵ : 3²)ⁿ] · 3⁴ = 3¹⁹',
                        hint: 'Adentro: 3⁵:3²=3³ → (3³)ⁿ=3³ⁿ → 3n+4 = 19 → 3n = ?',
                        correctAnswer: 5,
                        missingType: 'exponent',
                        steps: [
                            '3⁵ : 3² = 3³',
                            '(3³)ⁿ = 3³ⁿ',
                            '3³ⁿ · 3⁴ = 3^(3n+4)',
                            '3n + 4 = 19 → 3n = 15 → n = 5'
                        ]
                    }
                ]
            }
        ];
    }

    // ═══════════════════════════════════════════════════════════
    // √ TEMA: RADICACIÓN
    // Ejercicios extraídos del TP Nº1 PARTE V - RADICACIÓN
    // Dificultad ascendente: raíces exactas → inversas → completar → estimación
    // ═══════════════════════════════════════════════════════════
    loadRadicacionActivities() {
        this.activities = [
            // ═══════════════════════════════════════════════════════════
            // 🟢 NIVEL 1: Raíces Cuadradas Exactas (lo más básico)
            // TP ejercicio 1-2 parte a
            // ═══════════════════════════════════════════════════════════
            {
                id: 1,
                type: 'raiz-cuadrada',
                title: 'Raíces Cuadradas √ ⚡',
                instructions: 'Calculá la raíz cuadrada. ¿Qué número multiplicado por sí mismo da el de adentro?',
                exercises: [
                    {
                        expression: '√9',
                        radicand: 9,
                        index: 2,
                        correctAnswer: 3,
                        hint: '¿Qué número × sí mismo = 9? → 3 × 3 = 9'
                    },
                    {
                        expression: '√25',
                        radicand: 25,
                        index: 2,
                        correctAnswer: 5,
                        hint: '5 × 5 = 25'
                    },
                    {
                        expression: '√49',
                        radicand: 49,
                        index: 2,
                        correctAnswer: 7,
                        hint: '7 × 7 = 49'
                    },
                    {
                        expression: '√1',
                        radicand: 1,
                        index: 2,
                        correctAnswer: 1,
                        hint: '1 × 1 = 1'
                    },
                    {
                        expression: '√0',
                        radicand: 0,
                        index: 2,
                        correctAnswer: 0,
                        hint: '0 × 0 = 0'
                    },
                    {
                        expression: '√169',
                        radicand: 169,
                        index: 2,
                        correctAnswer: 13,
                        hint: '13 × 13 = 169'
                    },
                    {
                        expression: '√121',
                        radicand: 121,
                        index: 2,
                        correctAnswer: 11,
                        hint: '11 × 11 = 121'
                    }
                ]
            },

            // ═══════════════════════════════════════════════════════════
            // 🟡 NIVEL 2: Raíces Cúbicas y de otros índices
            // TP ejercicio 1-2 parte b + ejercicio de Joaquín
            // ═══════════════════════════════════════════════════════════
            {
                id: 2,
                type: 'raiz-superior',
                title: 'Raíces Cúbicas y más ∛ 🔥',
                instructions: 'Ahora con raíces cúbicas (∛) y de quinto orden (⁵√). ¿Qué número elevado al índice da el radicando?',
                exercises: [
                    {
                        expression: '∛125',
                        radicand: 125,
                        index: 3,
                        correctAnswer: 5,
                        hint: '5 × 5 × 5 = 125 → 5³ = 125'
                    },
                    {
                        expression: '∛64',
                        radicand: 64,
                        index: 3,
                        correctAnswer: 4,
                        hint: '4 × 4 × 4 = 64 → 4³ = 64'
                    },
                    {
                        expression: '∛1000',
                        radicand: 1000,
                        index: 3,
                        correctAnswer: 10,
                        hint: '10 × 10 × 10 = 1000 → 10³ = 1000'
                    },
                    {
                        expression: '∛27',
                        radicand: 27,
                        index: 3,
                        correctAnswer: 3,
                        hint: '3 × 3 × 3 = 27 → 3³ = 27'
                    },
                    {
                        expression: '⁵√32',
                        radicand: 32,
                        index: 5,
                        correctAnswer: 2,
                        hint: '2⁵ = 2×2×2×2×2 = 32'
                    },
                    {
                        expression: '⁵√1',
                        radicand: 1,
                        index: 5,
                        correctAnswer: 1,
                        hint: '1 elevado a cualquier cosa da 1'
                    },
                    {
                        expression: '⁴√625',
                        radicand: 625,
                        index: 4,
                        correctAnswer: 5,
                        hint: '5⁴ = 5×5×5×5 = 625'
                    }
                ]
            },

            // ═══════════════════════════════════════════════════════════
            // 🟡 NIVEL 3: Operación Inversa — ¿Qué número pensó?
            // TP ejercicio 1-1 + ejercicio 2-1
            // ═══════════════════════════════════════════════════════════
            {
                id: 3,
                type: 'raiz-inversa',
                title: '¿Qué Número Pensó? 🤔',
                instructions: 'Encontrá el número "a" que cumple la condición. ¡Es la operación inversa de la potencia!',
                exercises: [
                    {
                        expression: 'a² = 121 → a = ?',
                        equation: 'a² = 121',
                        power: 2,
                        result: 121,
                        correctAnswer: 11,
                        hint: 'Valentina: "Si al número que pensé lo multiplico por sí mismo, da 121" → √121'
                    },
                    {
                        expression: 'a³ = 64 → a = ?',
                        equation: 'a³ = 64',
                        power: 3,
                        result: 64,
                        correctAnswer: 4,
                        hint: 'Joaquín: "Si al mío lo elevo al cubo, me da 64" → ∛64'
                    },
                    {
                        expression: 'a⁵ = 1 → a = ?',
                        equation: 'a⁵ = 1',
                        power: 5,
                        result: 1,
                        correctAnswer: 1,
                        hint: 'Ivana: "Si lo elevo a la quinta, me da 1" → ⁵√1'
                    },
                    {
                        expression: 'a³ = 27 → a = ?',
                        equation: 'a³ = 27',
                        power: 3,
                        result: 27,
                        correctAnswer: 3,
                        hint: '¿Quién elevado al cubo da 27? → 3³ = 27'
                    },
                    {
                        expression: 'a⁴ = 625 → a = ?',
                        equation: 'a⁴ = 625',
                        power: 4,
                        result: 625,
                        correctAnswer: 5,
                        hint: '¿Quién a la cuarta da 625? → 5⁴ = 625'
                    },
                    {
                        expression: 'a² = 49 → a = ?',
                        equation: 'a² = 49',
                        power: 2,
                        result: 49,
                        correctAnswer: 7,
                        hint: '¿Quién al cuadrado da 49? → 7² = 49'
                    },
                    {
                        expression: 'a¹⁰ = 0 → a = ?',
                        equation: 'a¹⁰ = 0',
                        power: 10,
                        result: 0,
                        correctAnswer: 0,
                        hint: 'Solo un número elevado a cualquier potencia da 0...'
                    }
                ]
            },

            // ═══════════════════════════════════════════════════════════
            // 🔵 NIVEL 4: Completar y Justificar
            // TP ejercicio 3
            // ═══════════════════════════════════════════════════════════
            {
                id: 4,
                type: 'raiz-completar',
                title: 'Completá y Justificá ✍️',
                instructions: 'Completá el resultado de la raíz Y justificá: "porque __² = __"',
                exercises: [
                    {
                        expression: '√169 = ? porque ?² = 169',
                        radicand: 169,
                        index: 2,
                        correctAnswer: 13,
                        justification: '13² = 169',
                        hint: '? × ? = 169 → 13 × 13 = 169'
                    },
                    {
                        expression: '∛64 = ? porque ?³ = 64',
                        radicand: 64,
                        index: 3,
                        correctAnswer: 4,
                        justification: '4³ = 64',
                        hint: '? × ? × ? = 64 → 4 × 4 × 4 = 64'
                    },
                    {
                        expression: '√36 = ? porque ?² = 36',
                        radicand: 36,
                        index: 2,
                        correctAnswer: 6,
                        justification: '6² = 36',
                        hint: '6 × 6 = 36'
                    },
                    {
                        expression: '⁵√100000 = ? porque ?⁵ = 100000',
                        radicand: 100000,
                        index: 5,
                        correctAnswer: 10,
                        justification: '10⁵ = 100000',
                        hint: '10 × 10 × 10 × 10 × 10 = 100000'
                    },
                    {
                        expression: '√144 = ? porque ?² = 144',
                        radicand: 144,
                        index: 2,
                        correctAnswer: 12,
                        justification: '12² = 144',
                        hint: '12 × 12 = 144'
                    },
                    {
                        expression: '∛8 = ? porque ?³ = 8',
                        radicand: 8,
                        index: 3,
                        correctAnswer: 2,
                        justification: '2³ = 8',
                        hint: '2 × 2 × 2 = 8'
                    },
                    {
                        expression: '√196 = ? porque ?² = 196',
                        radicand: 196,
                        index: 2,
                        correctAnswer: 14,
                        justification: '14² = 196',
                        hint: '14 × 14 = 196'
                    }
                ]
            },

            // ═══════════════════════════════════════════════════════════
            // � NIVEL 5: Boss Final de Raíces — Todo combinado
            // Mezcla de raíces cuadradas, cúbicas, quintas + inversas
            // ═══════════════════════════════════════════════════════════
            {
                id: 5,
                type: 'raiz-boss',
                title: '💀 El Boss de las Raíces',
                instructions: '¡Todo combinado! Raíces exactas e inversas de todos los índices. ¡Demostrá todo lo que aprendiste!',
                exercises: [
                    {
                        expression: '√225',
                        radicand: 225,
                        index: 2,
                        correctAnswer: 15,
                        hint: '15 × 15 = 225'
                    },
                    {
                        expression: '∛216',
                        radicand: 216,
                        index: 3,
                        correctAnswer: 6,
                        hint: '6 × 6 × 6 = 216'
                    },
                    {
                        expression: 'a² = 256 → a = ?',
                        power: 2,
                        result: 256,
                        correctAnswer: 16,
                        hint: '√256 = ? → 16 × 16 = 256'
                    },
                    {
                        expression: '⁴√81',
                        radicand: 81,
                        index: 4,
                        correctAnswer: 3,
                        hint: '3⁴ = 3×3×3×3 = 81'
                    },
                    {
                        expression: '√289',
                        radicand: 289,
                        index: 2,
                        correctAnswer: 17,
                        hint: '17 × 17 = 289'
                    },
                    {
                        expression: '∛512',
                        radicand: 512,
                        index: 3,
                        correctAnswer: 8,
                        hint: '8 × 8 × 8 = 512'
                    },
                    {
                        expression: 'a³ = 343 → a = ?',
                        power: 3,
                        result: 343,
                        correctAnswer: 7,
                        hint: '∛343 = ? → 7 × 7 × 7 = 343'
                    }
                ]
            }
        ];
    }

    // Backward compatibility
    loadActivities() {
        this.loadTriangulosActivities();
    }

    recordResponse(activityId, exerciseIndex, userAnswer, timeSpent) {
        const activity = this.activities.find(a => a.id === activityId);
        const exercise = activity.exercises[exerciseIndex];
        let isCorrect = false;
        let feedback = '';

        if (typeof userAnswer === 'string') {
            userAnswer = userAnswer.toLowerCase();
        }

        switch (activity.type) {
            case 'identificar-angulo':
            case 'clasificar-triangulo-lados':
            case 'clasificar-triangulo-angulos':
                isCorrect = userAnswer === exercise.correctAnswer;
                break;
            case 'medir-angulo':
                const diff = Math.abs(parseFloat(userAnswer) - exercise.correctAnswer);
                isCorrect = diff <= exercise.tolerance;
                break;
            case 'complementario':
            case 'suplementario':
            case 'angulo-faltante':
                isCorrect = parseInt(userAnswer) === exercise.correctAnswer;
                break;
            case 'lineas-paralelas':
                isCorrect = parseInt(userAnswer) === exercise.correctAnswer;
                break;
            // ═══ POTENCIACIÓN ═══
            case 'potencia-simple':
            case 'potencia-combinada':
            case 'potencia-boss': {
                // userAnswer es un objeto { base, exp } o un string "base^exp"
                if (typeof userAnswer === 'object' && userAnswer !== null) {
                    isCorrect = (
                        parseInt(userAnswer.base) === exercise.correctBase &&
                        parseInt(userAnswer.exp) === exercise.correctExp
                    );
                } else {
                    // Fallback: parsear "base^exp"
                    const parts = String(userAnswer).split('^');
                    if (parts.length === 2) {
                        isCorrect = (
                            parseInt(parts[0]) === exercise.correctBase &&
                            parseInt(parts[1]) === exercise.correctExp
                        );
                    }
                }
                feedback = isCorrect
                    ? '¡Excelente! Correcto ✨'
                    : `Casi. Era ${exercise.correctBase}^${exercise.correctExp} = ${exercise.correctBase}${this._superscript(exercise.correctExp)}`;
                break;
            }
            case 'potencia-faltante':
                isCorrect = parseInt(userAnswer) === exercise.correctAnswer;
                feedback = isCorrect ? '¡Bien ahí! 🎯' : `Casi... era ${exercise.correctAnswer}`;
                break;
            case 'potencia-algebraica':
            case 'potencia-boss-algebra': {
                // userAnswer: { base: "x", exp: 5 }
                if (typeof userAnswer === 'object' && userAnswer !== null) {
                    const baseOk = String(userAnswer.base).toLowerCase() === String(exercise.correctBase).toLowerCase();
                    const expOk = parseInt(userAnswer.exp) === exercise.correctExp;
                    isCorrect = baseOk && expOk;
                }
                feedback = isCorrect
                    ? '¡Genio del Álgebra! 🧬'
                    : `Casi. Era ${exercise.correctBase}${this._superscript(exercise.correctExp)}`;
                break;
            }
            // ═══ ACTIVIDAD 5 — Nuevos tipos ═══
            case 'potencia-negativa': {
                // userAnswer is a number (the final numeric result)
                const parsed = parseInt(userAnswer);
                isCorrect = parsed === exercise.correctAnswer;
                if (isCorrect) {
                    feedback = '¡Increíble! Dominás las bases negativas 🔥';
                } else {
                    const stepsText = exercise.steps ? '\n' + exercise.steps.join(' → ') : '';
                    feedback = `Casi. Era ${exercise.correctDisplay}${stepsText}`;
                }
                break;
            }
            case 'potencia-faltante-avanzado': {
                const parsedAnswer = parseInt(userAnswer);
                isCorrect = parsedAnswer === exercise.correctAnswer;
                if (isCorrect) {
                    feedback = '¡MONSTRUOSO! Resolviste el ejercicio más difícil 💀🏆';
                } else {
                    const stepsText = exercise.steps ? '\n' + exercise.steps.join(' → ') : '';
                    feedback = `Casi... el exponente era ${exercise.correctAnswer}${stepsText}`;
                }
                break;
            }
            // ═══ RADICACIÓN ═══
            case 'raiz-cuadrada':
            case 'raiz-superior':
            case 'raiz-completar': {
                const parsedVal = parseInt(userAnswer);
                isCorrect = parsedVal === exercise.correctAnswer;
                if (isCorrect) {
                    feedback = '¡Perfecto! Dominás las raíces √';
                } else {
                    const justif = exercise.justification ? ` (${exercise.justification})` : '';
                    feedback = `Casi. Era ${exercise.correctAnswer}${justif}`;
                }
                break;
            }
            case 'raiz-inversa': {
                const parsedInv = parseInt(userAnswer);
                isCorrect = parsedInv === exercise.correctAnswer;
                if (isCorrect) {
                    feedback = '¡Genio! Encontraste el número 🔍';
                } else {
                    feedback = `Casi. El número era ${exercise.correctAnswer} porque ${exercise.correctAnswer}${exercise.power === 2 ? '²' : exercise.power === 3 ? '³' : '⁴'} = ${exercise.result}`;
                }
                break;
            }

            case 'raiz-boss': {
                const parsedBoss = parseInt(userAnswer);
                isCorrect = parsedBoss === exercise.correctAnswer;
                if (isCorrect) {
                    feedback = '¡MONSTRUOSO! Dominás las raíces como un BOSS 💀🏆';
                } else {
                    feedback = `Casi... era ${exercise.correctAnswer}`;
                }
                break;
            }
        }

        if (!feedback) {
            feedback = isCorrect ? '¡Excelente! Correcto ✨' : `Casi. Era ${exercise.correctAnswer}`;
        }

        this.responses.push({
            activityId,
            exerciseIndex,
            userAnswer,
            correctAnswer: exercise.correctAnswer || `${exercise.correctBase}^${exercise.correctExp}`,
            isCorrect,
            feedback,
            timestamp: new Date()
        });

        this.saveProgress();
        return { isCorrect, feedback };
    }

    _superscript(n) {
        const supers = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
        return String(n).split('').map(c => supers[c] || c).join('');
    }

    saveProgress() {
        const data = {
            studentName: this.studentName,
            currentActivity: this.currentActivity,
            currentTopic: this.currentTopic,
            responses: this.responses
        };
        localStorage.setItem('geometria_progress_v2', JSON.stringify(data));
    }

    endSession() {
        this.endTime = new Date();
    }

    generateReport() {
        return {
            studentName: this.studentName,
            topic: this.currentTopic,
            totalActivities: this.activities.length,
            totalResponses: this.responses.length,
            correct: this.responses.filter(r => r.isCorrect).length,
            startTime: this.startTime,
            endTime: this.endTime
        };
    }
}
