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

    // Inicializar sesión con nombre del estudiante
    startSession(studentName) {
        this.studentName = studentName;
        this.startTime = new Date();
        this.loadActivities();
        console.log(`📚 Sesión iniciada para ${studentName}`);
    }

    // Cargar actividades (ejercicios de geometría)
    loadActivities() {
        this.activities = [
            // Nivel 1: Identificación de ángulos
            {
                id: 1,
                type: 'identificar-angulo',
                title: 'Ángulos del Arco',
                instructions: '¿Qué ángulo es?',
                exercises: [
                    { angle: 30, correctAnswer: 'agudo' },
                    { angle: 90, correctAnswer: 'recto' },
                    { angle: 120, correctAnswer: 'obtuso' },
                    { angle: 45, correctAnswer: 'agudo' },
                    { angle: 150, correctAnswer: 'obtuso' }
                ]
            },

            // Nivel 2: Medición de ángulos
            {
                id: 2,
                type: 'medir-angulo',
                title: 'Medí el Tiro',
                instructions: '¿Cuántos grados mide el ángulo?',
                exercises: [
                    { angle: 60, tolerance: 3, correctAnswer: 60 },
                    { angle: 135, tolerance: 3, correctAnswer: 135 },
                    { angle: 25, tolerance: 3, correctAnswer: 25 },
                    { angle: 110, tolerance: 3, correctAnswer: 110 },
                    { angle: 85, tolerance: 3, correctAnswer: 85 }
                ]
            },

            // Nivel 3: Ángulos complementarios
            {
                id: 3,
                type: 'complementario',
                title: 'Completá los 90°',
                instructions: '¿Qué ángulo falta para 90°?',
                exercises: [
                    { given: 30, correctAnswer: 60 },
                    { given: 45, correctAnswer: 45 },
                    { given: 60, correctAnswer: 30 },
                    { given: 25, correctAnswer: 65 },
                    { given: 70, correctAnswer: 20 }
                ]
            },

            // Nivel 4: Ángulos suplementarios
            {
                id: 4,
                type: 'suplementario',
                title: 'Completá los 180°',
                instructions: '¿Qué ángulo suma 180°?',
                exercises: [
                    { given: 110, correctAnswer: 70 },
                    { given: 90, correctAnswer: 90 },
                    { given: 45, correctAnswer: 135 },
                    { given: 150, correctAnswer: 30 },
                    { given: 75, correctAnswer: 105 }
                ]
            },

            // Nivel 5: Clasificación de triángulos por lados
            {
                id: 5,
                type: 'clasificar-triangulo-lados',
                title: 'Formaciones',
                instructions: '¿Qué triángulo es por sus lados?',
                exercises: [
                    { sides: [5, 5, 5], correctAnswer: 'equilátero' },
                    { sides: [4, 4, 6], correctAnswer: 'isósceles' },
                    { sides: [3, 4, 5], correctAnswer: 'escaleno' },
                    { sides: [7, 7, 7], correctAnswer: 'equilátero' },
                    { sides: [5, 8, 9], correctAnswer: 'escaleno' }
                ]
            },

            // Nivel 6: Clasificación de triángulos por ángulos
            {
                id: 6,
                type: 'clasificar-triangulo-angulos',
                title: 'Tipos de Cobertura',
                instructions: '¿Qué triángulo es por sus ángulos?',
                exercises: [
                    { angles: [60, 60, 60], correctAnswer: 'acutángulo' },
                    { angles: [90, 45, 45], correctAnswer: 'rectángulo' },
                    { angles: [120, 30, 30], correctAnswer: 'obtusángulo' },
                    { angles: [70, 60, 50], correctAnswer: 'acutángulo' },
                    { angles: [100, 50, 30], correctAnswer: 'obtusángulo' }
                ]
            },

            // Nivel 7: Suma de ángulos internos
            {
                id: 7,
                type: 'angulo-faltante',
                title: 'Ángulo Faltante',
                instructions: '¿Qué ángulo falta? (suman 180°)',
                exercises: [
                    { angles: [60, 70], correctAnswer: 50 },
                    { angles: [90, 45], correctAnswer: 45 },
                    { angles: [30, 30], correctAnswer: 120 },
                    { angles: [80, 60], correctAnswer: 40 },
                    { angles: [110, 35], correctAnswer: 35 }
                ]
            },

            // Nivel 8: Ángulos en líneas paralelas
            {
                id: 8,
                type: 'lineas-paralelas',
                title: 'Tiros Paralelos',
                instructions: '¿Cuánto mide el ángulo marcado?',
                exercises: [
                    { given: 150, type: 'correspondiente', correctAnswer: 150 },
                    { given: 80, type: 'alterno-interno', correctAnswer: 80 },
                    { given: 120, type: 'conjugado', correctAnswer: 60 },
                    { given: 65, type: 'correspondiente', correctAnswer: 65 },
                    { given: 110, type: 'alterno-interno', correctAnswer: 110 }
                ]
            }
        ];
    }

    // Registrar respuesta de un ejercicio
    recordResponse(activityId, exerciseIndex, userAnswer, timeSpent) {
        const activity = this.activities.find(a => a.id === activityId);
        const exercise = activity.exercises[exerciseIndex];

        let isCorrect = false;
        let feedback = '';

        // Validar respuesta según el tipo de actividad
        switch (activity.type) {
            case 'identificar-angulo':
            case 'clasificar-triangulo-lados':
            case 'clasificar-triangulo-angulos':
                isCorrect = userAnswer === exercise.correctAnswer;
                break;

            case 'medir-angulo':
                const difference = Math.abs(userAnswer - exercise.correctAnswer);
                isCorrect = difference <= exercise.tolerance;
                break;

            case 'complementario':
            case 'suplementario':
            case 'angulo-faltante':
            case 'lineas-paralelas':
                isCorrect = parseInt(userAnswer) === exercise.correctAnswer;
                break;
        }

        // Generar feedback
        if (isCorrect) {
            feedback = '¡Excelente! ✨';
        } else {
            feedback = `Incorrecto. La respuesta correcta es: ${exercise.correctAnswer}`;
        }

        // Guardar respuesta
        this.responses.push({
            activityId,
            activityTitle: activity.title,
            exerciseIndex,
            exercise,
            userAnswer,
            correctAnswer: exercise.correctAnswer,
            isCorrect,
            timeSpent,
            feedback,
            timestamp: new Date()
        });

        // Guardar en localStorage
        this.saveProgress();

        return { isCorrect, feedback };
    }

    // Guardar progreso en localStorage
    saveProgress() {
        const data = {
            studentName: this.studentName,
            startTime: this.startTime,
            currentActivity: this.currentActivity,
            responses: this.responses
        };
        localStorage.setItem('geometria_progress', JSON.stringify(data));
    }

    // Cargar progreso guardado
    loadProgress() {
        const saved = localStorage.getItem('geometria_progress');
        if (saved) {
            const data = JSON.parse(saved);
            this.studentName = data.studentName;
            this.startTime = new Date(data.startTime);
            this.currentActivity = data.currentActivity;
            this.responses = data.responses;
            return true;
        }
        return false;
    }

    // Finalizar sesión
    endSession() {
        this.endTime = new Date();
        this.saveProgress();
    }

    // Generar reporte de resultados
    generateReport() {
        const totalExercises = this.responses.length;
        const correctAnswers = this.responses.filter(r => r.isCorrect).length;
        const percentage = ((correctAnswers / totalExercises) * 100).toFixed(1);

        const sessionDuration = this.endTime - this.startTime;
        const minutes = Math.floor(sessionDuration / 60000);

        // Agrupar respuestas por actividad
        const byActivity = {};
        this.responses.forEach(response => {
            if (!byActivity[response.activityId]) {
                byActivity[response.activityId] = {
                    title: response.activityTitle,
                    responses: []
                };
            }
            byActivity[response.activityId].responses.push(response);
        });

        return {
            studentName: this.studentName,
            date: this.startTime.toLocaleDateString('es-AR'),
            startTime: this.startTime.toLocaleTimeString('es-AR'),
            endTime: this.endTime.toLocaleTimeString('es-AR'),
            duration: `${minutes} minutos`,
            totalExercises,
            correctAnswers,
            incorrectAnswers: totalExercises - correctAnswers,
            percentage,
            grade: this.calculateGrade(percentage),
            byActivity,
            responses: this.responses
        };
    }

    // Calcular calificación
    calculateGrade(percentage) {
        if (percentage >= 90) return { value: 10, label: 'Excelente' };
        if (percentage >= 80) return { value: 9, label: 'Muy Bien' };
        if (percentage >= 70) return { value: 8, label: 'Bien' };
        if (percentage >= 60) return { value: 7, label: 'Aprobado' };
        return { value: 6, label: 'Necesita Mejorar' };
    }

    // Exportar resultados como JSON
    exportJSON() {
        const report = this.generateReport();
        const dataStr = JSON.stringify(report, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });

        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `geometria_${this.studentName}_${Date.now()}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    // Exportar resultados como texto formateado
    exportText() {
        const report = this.generateReport();

        let text = `
╔════════════════════════════════════════════════════════════╗
║          REPORTE DE ACTIVIDADES DE GEOMETRÍA              ║
╚════════════════════════════════════════════════════════════╝

ESTUDIANTE: ${report.studentName}
FECHA: ${report.date}
HORA INICIO: ${report.startTime}
HORA FIN: ${report.endTime}
DURACIÓN: ${report.duration}

═══════════════════════════════════════════════════════════
                         RESULTADOS
═══════════════════════════════════════════════════════════

Ejercicios Completados: ${report.totalExercises}
Respuestas Correctas: ${report.correctAnswers}
Respuestas Incorrectas: ${report.incorrectAnswers}
Porcentaje de Acierto: ${report.percentage}%
Calificación: ${report.grade.value}/10 (${report.grade.label})

═══════════════════════════════════════════════════════════
                      DETALLE POR ACTIVIDAD
═══════════════════════════════════════════════════════════

`;

        Object.values(report.byActivity).forEach(activity => {
            const correct = activity.responses.filter(r => r.isCorrect).length;
            const total = activity.responses.length;
            const percent = ((correct / total) * 100).toFixed(1);

            text += `\n📐 ${activity.title}\n`;
            text += `   Correctas: ${correct}/${total} (${percent}%)\n`;

            activity.responses.forEach((r, idx) => {
                const icon = r.isCorrect ? '✓' : '✗';
                text += `   ${icon} Ejercicio ${idx + 1}: ${r.userAnswer} ${r.isCorrect ? '' : `(Correcta: ${r.correctAnswer})`}\n`;
            });
        });

        text += `\n═══════════════════════════════════════════════════════════\n`;
        text += `Generado el ${new Date().toLocaleString('es-AR')}\n`;
        text += `Geometría Anti-Gravedad © 2026\n`;

        const dataBlob = new Blob([text], { type: 'text/plain; charset=utf-8' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `reporte_geometria_${this.studentName}_${Date.now()}.txt`;
        link.click();
        URL.revokeObjectURL(url);
    }

    // Limpiar datos (nueva sesión)
    reset() {
        this.studentName = '';
        this.currentActivity = 0;
        this.responses = [];
        this.startTime = null;
        this.endTime = null;
        localStorage.removeItem('geometria_progress');
    }
}
