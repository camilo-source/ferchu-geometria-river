/**
 * ═══════════════════════════════════════════════════════════
 * ⚽ ACADEMIA DE ARQUEROS RIVER - Main Entry Point
 * Entrenamiento de Geometría para Ferchu 💚🔴
 * ═══════════════════════════════════════════════════════════
 */

import './style.css';
import { UIManager } from './ui/UIManager.js';
import { ImageRenderer } from './render/ImageRenderer.js';

// ═══════════════════════════════════════════════════════════
// Variables Globales
// ═══════════════════════════════════════════════════════════

let uiManager;
let imageRenderer;

// ═══════════════════════════════════════════════════════════
// Inicialización
// ═══════════════════════════════════════════════════════════

function init() {
  console.log('⚽ Iniciando Academia de Arqueros River...');

  // Inicializar renderizador de imágenes 2D (contenedor inline dentro de ejercicios)
  imageRenderer = new ImageRenderer('geometry-container-inline');

  // Crear objeto simulado para compatibilidad con UIManager
  const sceneManager = {
    updateForExercise: (activityType, exercise) => {
      // Esperar a que el contenedor inline exista en el DOM
      setTimeout(() => {
        imageRenderer.container = document.getElementById('geometry-container-inline');
        if (imageRenderer.container) {
          imageRenderer.update(activityType, exercise);
        }
      }, 100);
    }
  };

  // Inicializar UI Manager
  uiManager = new UIManager(sceneManager);

  // Ocultar pantalla de carga
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.style.display = 'none';

        // Mostrar pantalla de bienvenida
        uiManager.showWelcomeScreen();
      }, 500);
    }, 1000);
  }

  console.log('✅ App inicializada correctamente');
}

// ═══════════════════════════════════════════════════════════
// Manejo de eventos
// ═══════════════════════════════════════════════════════════

// Responsive
window.addEventListener('resize', () => {
  // Ya no necesitamos ajustar cámara/renderer 3D
  console.log('📱 Ventana redimensionada');
});

// ═══════════════════════════════════════════════════════════
// Iniciar aplicación
// ═══════════════════════════════════════════════════════════

window.addEventListener('DOMContentLoaded', () => {
  init();
});

// Exportar para debugging (opcional)
window.debugApp = () => {
  return {
    uiManager,
    imageRenderer
  };
};
