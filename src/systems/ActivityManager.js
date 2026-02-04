/**
 * ═══════════════════════════════════════════════════════════
 * 🌌 GEOMETRÍA ANTI-GRAVEDAD - Sistema de Actividades
 * Sistema para registrar respuestas y generar reportes
 * ═══════════════════════════════════════════════════════════
 */

export class ActivityManager {
    constructor() {
        this.studentName = '';
        this.currentActivity = 0;
        this.activities = [];
        this.responses = [];
        this.startTime = null;
        this.endTime = null;
    }

    startSession(studentName) {
        this.studentName = studentName;
        this.startTime = new Date();
        this.loadActivities();
        console.log(`📚 Sesión iniciada para ${studentName}`);
    }

    loadActivities() {
        this.activities = [
            // 🟢 NIVEL 1: Identificación Visual
            {
                id: 1,
                type: 'identificar-angulo',
                title: 'El Ojo de Halcón',
                instructions: 'Mirá el gráfico y decí qué tipo de ángulo es:',
                exercises: [
                    { angle: 30, correctAnswer: 'agudo' },
                    { angle: 90, correctAnswer: 'recto' },
                    { angle: 140, correctAnswer: 'obtuso' },
                    { angle: 10, correctAnswer: 'agudo' },
                    { angle: 170, correctAnswer: 'obtuso' }
                ]
            },

            // 🟢 NIVEL 2: Precisión (Medición)
            {
                id: 2,
                type: 'medir-angulo',
                title: 'Francotirador de Ángulos',
                instructions: 'Estimá cuántos grados mide este ángulo:',
                exercises: [
                    { angle: 45, tolerance: 5, correctAnswer: 45 },
                    { angle: 90, tolerance: 5, correctAnswer: 90 },
                    { angle: 135, tolerance: 5, correctAnswer: 135 },
                    { angle: 180, tolerance: 5, correctAnswer: 180 },
                    { angle: 30, tolerance: 5, correctAnswer: 30 }
                ]
            },

            // 🔵 NIVEL 3: Rompecabezas 90° (Complementarios)
            {
                id: 3,
                type: 'complementario',
                title: 'Completá el 90°',
                instructions: '¿Cuánto mide el ángulo complementario?',
                exercises: [
                    { given: 30, correctAnswer: 60 },
                    { given: 45, correctAnswer: 45 },
                    { given: 60, correctAnswer: 30 },
                    { given: 20, correctAnswer: 70 },
                    { given: 75, correctAnswer: 15 }
                ]
            },

            // 🟡 NIVEL 4: Rompecabezas 180° (Suplementarios)
            {
                id: 4,
                type: 'suplementario',
                title: 'Completá la Recta (180°)',
                instructions: '¿Cuánto mide el ángulo suplementario?',
                exercises: [
                    { given: 120, correctAnswer: 60 },
                    { given: 90, correctAnswer: 90 },
                    { given: 150, correctAnswer: 30 },
                    { given: 45, correctAnswer: 135 },
                    { given: 10, correctAnswer: 170 }
                ]
            },

            // 🔴 NIVEL 5: Triángulos por Lados (TP Nº 6)
            {
                id: 5,
                type: 'clasificar-triangulo-lados',
                title: 'Triángulos: La Forma (TP 6)',
                instructions: 'Según las longitudes de sus lados, es:',
                exercises: [
                    { sides: [5, 5, 5], correctAnswer: 'equilátero' },
                    { sides: [3, 4, 5], correctAnswer: 'escaleno' }, // Del TP: Rectángulo
                    { sides: [4, 4, 6], correctAnswer: 'isósceles' },
                    { sides: [6, 8, 10], correctAnswer: 'escaleno' }, // Del TP: Escaleno
                    { sides: [5, 5, 2], correctAnswer: 'isósceles' }
                ]
            },

            // 🔴 NIVEL 6: Triángulos por Ángulos (TP Nº 6)
            {
                id: 6,
                type: 'clasificar-triangulo-angulos',
                title: 'Triángulos: La Apertura (TP 6)',
                instructions: 'Calculá mentalmente sus ángulos y clasificalo:',
                exercises: [
                    // TP6 Pt1 1a: Internos 80, 10, 90 (Recto)
                    { labels: ['90°', '80°', '10°'], sides: [5, 4.9, 0.8], correctAnswer: 'rectángulo' },
                    // TP6 Pt2 2: 3x, 3x, 9x -> 36, 36, 108 (Obtuso)
                    { labels: ['108°', '36°', '36°'], sides: [8, 5, 5], correctAnswer: 'obtusángulo' },
                    // TP6 Pt2 6: x, 2x, 6x -> 20, 40, 120 (Obtuso)
                    { labels: ['120°', '40°', '20°'], sides: [8, 6, 3], correctAnswer: 'obtusángulo' },
                    // Equilátero clásico
                    { labels: ['60°', '60°', '60°'], sides: [5, 5, 5], correctAnswer: 'acutángulo' },
                    // TP6 Pt1 1c: Internos 80, 60, 40 (Acude)
                    { labels: ['80°', '60°', '40°'], sides: [5, 4.5, 3.5], correctAnswer: 'acutángulo' }
                ]
            },

            // ⚫ NIVEL 7: El Ángulo Perdido (Desafíos TP 6)
            {
                id: 7,
                type: 'angulo-faltante',
                title: 'Calculá el ángulo X',
                instructions: '¿Cuánto mide el ángulo "x"?',
                exercises: [
                    // TP6 Pt1 1a: Falta 90.
                    { labels: ['80°', '10°', 'x'], sides: [5, 0.9, 5.1], correctAnswer: 90 },
                    // TP6 Pt2 6: Falta 120. (Dados 20 y 40)
                    { labels: ['20°', '40°', 'x'], sides: [3, 6, 8], correctAnswer: 120 },
                    // TP6 Pt2 2: Falta 108. (Dados 36 y 36)
                    { labels: ['36°', '36°', 'x'], sides: [5, 5, 8], correctAnswer: 108 },
                    // Equilátero: falta 60.
                    { labels: ['60°', '60°', 'x'], sides: [5, 5, 5], correctAnswer: 60 },
                    // Rectángulo: falta 45.
                    { labels: ['90°', '45°', 'x'], sides: [3, 3, 4.24], correctAnswer: 45 },
                    // 🔥 NUEVOS DIFÍCILES:
                    // Isósceles agudo
                    { labels: ['70°', 'x', '70°'], sides: [5, 6, 5], correctAnswer: 40 },
                    // Obtuso delgado
                    { labels: ['120°', 'x', '30°'], sides: [8, 3, 5], correctAnswer: 30 },
                    // Casi plano
                    { labels: ['150°', '15°', 'x'], sides: [9, 2, 7.5], correctAnswer: 15 }
                ]
            },

            // ⚫ NIVEL 8: Paralelas (Bonus)
            {
                id: 8,
                type: 'lineas-paralelas',
                title: 'Vías del Tren',
                instructions: 'En estas paralelas, ¿cuánto mide el ángulo marcado?',
                exercises: [
                    { given: 60, type: 'alterno-interno', correctAnswer: 60 },
                    { given: 120, type: 'correspondiente', correctAnswer: 120 },
                    { given: 45, type: 'alterno-externo', correctAnswer: 45 },
                    { given: 150, type: 'conjugado', correctAnswer: 30 }, // Requiere cálculo (180-150)
                    { given: 90, type: 'correspondiente', correctAnswer: 90 },
                    // 🔥 NUEVOS DIFÍCILES:
                    { given: 135, type: 'conjugado', correctAnswer: 45 }, // 180-135
                    { given: 75, type: 'alterno-interno', correctAnswer: 75 },
                    { given: 110, type: 'conjugado', correctAnswer: 70 } // 180-110, ¡final épico!
                ]
            }
        ];
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
                // Ajuste para lógica básica
                isCorrect = parseInt(userAnswer) === exercise.correctAnswer;
                break;
        }

        feedback = isCorrect ? '¡Excelente! Correcto ✨' : `Casi. Era ${exercise.correctAnswer}`;

        this.responses.push({
            activityId,
            exerciseIndex,
            userAnswer,
            correctAnswer: exercise.correctAnswer,
            isCorrect,
            feedback,
            timestamp: new Date()
        });

        this.saveProgress();
        return { isCorrect, feedback };
    }

    saveProgress() {
        const data = {
            studentName: this.studentName,
            currentActivity: this.currentActivity,
            responses: this.responses
        };
        localStorage.setItem('geometria_progress_v2', JSON.stringify(data));
    }

    // ... otros métodos (reset, load, export) se mantienen igual ...
}
