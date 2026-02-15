/**
 * ═══════════════════════════════════════════════════════════
 * 📚 TOPIC MANAGER — Sistema de Temas
 * Gestión de temas disponibles para Ferchu
 * ═══════════════════════════════════════════════════════════
 */

export const TOPICS = [
    {
        id: 'triangulos',
        name: 'Triángulos y Ángulos',
        icon: '📐',
        emoji: '⚽',
        color: '#D32F2F',
        colorLight: 'rgba(211, 47, 47, 0.1)',
        description: 'Ángulos, triángulos, complementarios, suplementarios y paralelas',
        active: true,
        activityCount: 8
    },
    {
        id: 'potenciacion',
        name: 'Potenciación',
        icon: '🔢',
        emoji: '💥',
        color: '#1976D2',
        colorLight: 'rgba(25, 118, 210, 0.1)',
        description: 'Propiedades de potencias: multiplicación, división y potencia de potencia',
        active: true,
        activityCount: 3
    },
    {
        id: 'radicacion',
        name: 'Radicación',
        icon: '√',
        emoji: '🌱',
        color: '#388E3C',
        colorLight: 'rgba(56, 142, 60, 0.1)',
        description: 'Raíces cuadradas, cúbicas, inversas y de índices superiores',
        active: true,
        activityCount: 5
    }
];

export class TopicManager {
    constructor() {
        this.currentTopic = null;
    }

    getTopics() {
        return TOPICS;
    }

    getActiveTopics() {
        return TOPICS.filter(t => t.active);
    }

    getTopic(topicId) {
        return TOPICS.find(t => t.id === topicId);
    }

    setCurrentTopic(topicId) {
        this.currentTopic = this.getTopic(topicId);
        return this.currentTopic;
    }

    getCurrentTopic() {
        return this.currentTopic;
    }
}
