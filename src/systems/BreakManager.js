/**
 * ═══════════════════════════════════════════════════════════
 * 🧠 BREAK MANAGER - Sistema de Pausas para TDAH
 * Gestiona breaks obligatorios cada 5 minutos
 * ═══════════════════════════════════════════════════════════
 */

export class BreakManager {
    constructor() {
        this.sessionStartTime = null;
        this.lastBreakTime = null;
        this.breakInterval = 5 * 60 * 1000; // 5 minutos en ms
        this.exerciseCount = 0;
        this.exercisesPerSet = 3; // Máximo 3 ejercicios antes de un break
        this.breakActive = false;
    }

    // Iniciar sesión
    startSession() {
        this.sessionStartTime = Date.now();
        this.lastBreakTime = Date.now();
        this.exerciseCount = 0;
        console.log('🎮 Sesión iniciada - Breaks cada 5 minutos');
    }

    // Registrar ejercicio completado
    exerciseCompleted() {
        this.exerciseCount++;
        console.log(`✅ Ejercicio ${this.exerciseCount} completado`);
    }

    // Verificar si necesita un break
    needsBreak() {
        const timeSinceLastBreak = Date.now() - this.lastBreakTime;
        const timeBasedBreak = timeSinceLastBreak >= this.breakInterval;
        const exerciseBasedBreak = this.exerciseCount >= this.exercisesPerSet;

        return (timeBasedBreak || exerciseBasedBreak) && !this.breakActive;
    }

    // Iniciar un break
    startBreak() {
        this.breakActive = true;
        this.lastBreakTime = Date.now();
        console.log('⏸️ Break iniciado');
    }

    // Terminar un break
    endBreak() {
        this.breakActive = false;
        this.exerciseCount = 0; // Resetear contador
        console.log('▶️ Break terminado');
    }

    // Obtener tiempo hasta el próximo break
    getTimeUntilNextBreak() {
        const timeSinceLastBreak = Date.now() - this.lastBreakTime;
        const timeRemaining = this.breakInterval - timeSinceLastBreak;
        return Math.max(0, Math.floor(timeRemaining / 1000)); // En segundos
    }

    // Obtener ejercicios hasta el próximo break
    getExercisesUntilBreak() {
        return Math.max(0, this.exercisesPerSet - this.exerciseCount);
    }

    // Obtener tipo de break recomendado
    getBreakType() {
        const types = ['penales', 'reflejos', 'respiracion'];
        // Rotar según número de breaks
        const breakNumber = Math.floor(this.exerciseCount / this.exercisesPerSet);
        return types[breakNumber % types.length];
    }
}
