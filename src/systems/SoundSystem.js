/**
 * 🔊 SISTEMA DE SONIDO - ACADEMIA DE ARQUEROS
 * Manejo de efectos de sonido estimulantes (Gamification)
 */

import { AudioGenerator } from './AudioGenerator.js';

export class SoundSystem {
    constructor() {
        this.enabled = true;
        this.generator = new AudioGenerator();
    }

    play(soundName) {
        if (!this.enabled) return;

        try {
            switch (soundName) {
                case 'click':
                    this.generator.playClick();
                    break;
                case 'success':
                    this.generator.playSuccess();
                    break;
                case 'error':
                    this.generator.playError();
                    break;
                case 'levelUp':
                    this.generator.playLevelUp();
                    break;
                case 'fanfare':
                    this.generator.playFanfare();
                    break;
            }
        } catch (e) {
            console.warn('🔇 Audio bloqueado:', e);
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
}
