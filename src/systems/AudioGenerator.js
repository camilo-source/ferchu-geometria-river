// 🔊 Generador de Sonidos Sintéticos - TDAH-Friendly
// Crea sonidos estimulantes sin necesidad de archivos externos

export class AudioGenerator {
    constructor() {
        this.context = new (window.AudioContext || window.webkitAudioContext)();
    }

    // Click suave (440Hz, 50ms)
    playClick() {
        const osc = this.context.createOscillator();
        const gain = this.context.createGain();

        osc.connect(gain);
        gain.connect(this.context.destination);

        osc.frequency.value = 800;
        osc.type = 'sine';

        gain.gain.setValueAtTime(0.3, this.context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.05);

        osc.start(this.context.currentTime);
        osc.stop(this.context.currentTime + 0.05);
    }

    // Éxito dopaminérgico (C-E-G arpegio ascendente)
    playSuccess() {
        const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
        const baseTime = this.context.currentTime;

        notes.forEach((freq, i) => {
            const osc = this.context.createOscillator();
            const gain = this.context.createGain();

            osc.connect(gain);
            gain.connect(this.context.destination);

            osc.frequency.value = freq;
            osc.type = 'sine';

            const startTime = baseTime + (i * 0.08);
            gain.gain.setValueAtTime(0.25, startTime);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

            osc.start(startTime);
            osc.stop(startTime + 0.3);
        });
    }

    // Error suave (descenso gradual, NO punitivo)
    playError() {
        const osc = this.context.createOscillator();
        const gain = this.context.createGain();

        osc.connect(gain);
        gain.connect(this.context.destination);

        // Descenso suave de frecuencia
        osc.frequency.setValueAtTime(400, this.context.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, this.context.currentTime + 0.15);
        osc.type = 'sine';

        gain.gain.setValueAtTime(0.15, this.context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.15);

        osc.start(this.context.currentTime);
        osc.stop(this.context.currentTime + 0.15);
    }

    // Level Up - Célula melódica motivadora
    playLevelUp() {
        const melody = [
            { freq: 523.25, duration: 0.12 }, // C5
            { freq: 659.25, duration: 0.12 }, // E5
            { freq: 783.99, duration: 0.12 }, // G5
            { freq: 1046.50, duration: 0.25 } // C6
        ];

        let time = this.context.currentTime;

        melody.forEach((note) => {
            const osc = this.context.createOscillator();
            const gain = this.context.createGain();

            osc.connect(gain);
            gain.connect(this.context.destination);

            osc.frequency.value = note.freq;
            osc.type = 'triangle';

            gain.gain.setValueAtTime(0.3, time);
            gain.gain.exponentialRampToValueAtTime(0.01, time + note.duration);

            osc.start(time);
            osc.stop(time + note.duration);

            time += note.duration;
        });
    }

    // Fanfare final (progresión completa)
    playFanfare() {
        const chords = [
            [261.63, 329.63, 392], // C-E-G (C Mayor)
            [293.66, 369.99, 440], // D-F#-A (D Mayor)
            [261.63, 329.63, 392]  // C-E-G (Vuelta a tónica)
        ];

        let time = this.context.currentTime;

        chords.forEach((chord) => {
            chord.forEach((freq) => {
                const osc = this.context.createOscillator();
                const gain = this.context.createGain();

                osc.connect(gain);
                gain.connect(this.context.destination);

                osc.frequency.value = freq;
                osc.type = 'triangle';

                gain.gain.setValueAtTime(0.15, time);
                gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);

                osc.start(time);
                osc.stop(time + 0.5);
            });

            time += 0.25;
        });
    }
}
