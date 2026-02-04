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

            // 🟡 NIVEL 3: Rompecabezas 90° (Complementarios)
            {
                id: 3,
                type: 'complementario',
                title: 'Completá la Esquina (90°)',
                instructions: 'Observá el gráfico. Si un lado mide X, ¿cuánto falta para 90°?',
                exercises: [
                    { given: 30, correctAnswer: 60 },
                    { given: 45, correctAnswer: 45 },
                    { given: 80, correctAnswer: 10 },
                    { given: 15, correctAnswer: 75 },
                    { given: 60, correctAnswer: 30 }
                ]
            },

            // 🟡 NIVEL 4: Rompecabezas 180° (Suplementarios)
            {
                id: 4,
                type: 'suplementario',
                title: 'Completá la Recta (180°)',
                instructions: 'Observá el gráfico. ¿Cuánto le falta al ángulo para llegar a 180°?',
                exercises: [
                    { given: 120, correctAnswer: 60 },
                    { given: 90, correctAnswer: 90 },
                    { given: 150, correctAnswer: 30 },
                    { given: 45, correctAnswer: 135 },
                    { given: 10, correctAnswer: 170 }
                ]
            },

            // 🔴 NIVEL 5: Triángulos por Lados (Visualmente Exactos)
            {
                id: 5,
                type: 'clasificar-triangulo-lados',
                title: 'Triángulos: La Forma',
                instructions: 'Según las longitudes de sus lados (miralos bien), es:',
                exercises: [
                    { sides: [5, 5, 5], correctAnswer: 'equilátero' },
                    { sides: [3, 4, 5], correctAnswer: 'escaleno' }, // Rectángulo escaleno
                    { sides: [4, 4, 6], correctAnswer: 'isósceles' },
                    { sides: [6, 8, 10], correctAnswer: 'escaleno' }, // Otro rectángulo escaleno
                    { sides: [5, 5, 2], correctAnswer: 'isósceles' }  // Isósceles muy agudo
                ]
            },

            // 🔴 NIVEL 6: Triángulos por Ángulos
            {
                id: 6,
                type: 'clasificar-triangulo-angulos',
                title: 'Triángulos: La Apertura',
                instructions: 'Según sus ángulos internos, este triángulo es:',
                // Nota: Proporcionamos ángulos para la lógica, y el renderer los usará
                exercises: [
                    { angles: [60, 60, 60], sides: [5, 5, 5], correctAnswer: 'acutángulo' },
                    { angles: [90, 45, 45], sides: [3, 3, 4.24], correctAnswer: 'rectángulo' },
                    { angles: [120, 30, 30], sides: [5, 5, 8.66], correctAnswer: 'obtusángulo' },
                    { angles: [80, 70, 30], sides: [4, 4.5, 2.5], correctAnswer: 'acutángulo' }, // Aprox
                    { angles: [100, 40, 40], sides: [5, 5, 7], correctAnswer: 'obtusángulo' }
                ]
            },

            // ⚫ NIVEL 7: El Ángulo Perdido
            {
                id: 7,
                type: 'angulo-faltante',
                title: 'Misterio Triangular',
                instructions: 'La suma debe ser 180°. ¿Cuánto mide el ángulo "?"',
                exercises: [
                    { angles: [60, 60, 60], sides: [5, 5, 5], correctAnswer: 60 }, // Equilátero
                    { angles: [90, 45, 45], sides: [3, 3, 4.2], correctAnswer: 45 }, // Rectángulo
                    { angles: [100, 30, 50], sides: [6, 3.5, 5], correctAnswer: 50 }, // Obtusángulo escaleno
                    { angles: [70, 70, 40], sides: [5, 5, 3.4], correctAnswer: 40 }, // Isósceles
                    { angles: [30, 60, 90], sides: [3, 5.2, 6], correctAnswer: 90 }  // Rectángulo 30-60-90
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
                    { given: 150, type: 'conjugado', correctAnswer: 30 }, // Este requiere cálculo, cuidado
                    { given: 90, type: 'correspondiente', correctAnswer: 90 }
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
