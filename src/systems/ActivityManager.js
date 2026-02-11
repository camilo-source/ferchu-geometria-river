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
