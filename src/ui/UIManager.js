/**
 * ═══════════════════════════════════════════════════════════
 * ⚽ ACADEMIA DE ARQUEROS RIVER - UI Manager
 * Gestión de la interfaz de usuario
 * Con selector de temas y soporte potenciación
 * ═══════════════════════════════════════════════════════════
 */

import { ActivityManager } from '../systems/ActivityManager.js';
import { BreakManager } from '../systems/BreakManager.js';
import { TopicManager, TOPICS } from '../systems/TopicManager.js';
import { PenalesGame } from '../games/PenalesGame.js';
import { PulpoArmani } from '../components/PulpoArmani.js';
import { RiverHeader } from '../components/RiverHeader.js';
import { SoundSystem } from '../systems/SoundSystem.js';

export class UIManager {
  constructor(scene) {
    this.scene = scene;
    this.activityManager = new ActivityManager();
    this.breakManager = new BreakManager();
    this.topicManager = new TopicManager();
    this.soundSystem = new SoundSystem();
    this.pulpoArmani = new PulpoArmani();
    this.riverHeader = new RiverHeader();
    this.container = document.getElementById('ui-container');
    this.currentExerciseIndex = 0;
    this.exerciseStartTime = null;
    this.exercisesCompletedTotal = 0;
    this.currentStreak = 0;
    this.isLoggedIn = false;
    this.correctInCurrentSet = 0; // correct answers since last break
  }

  // ═══════════════════════════════════════════════════════════
  // LOGIN SCREEN
  // ═══════════════════════════════════════════════════════════
  showLoginScreen() {
    this.container.innerHTML = `
      <div class="center-container">
        <div class="card" style="max-width: 500px; text-align: center; padding: 3rem;">
          
          <!-- Escudo -->
          <img src="/assets/river/Escudo.png" alt="River Plate"
            style="width: 120px; height: 120px; margin-bottom: 1.5rem;
            filter: drop-shadow(0 4px 12px rgba(211,47,47,0.3));"
          />
          
          <h1 style="
            font-size: 2.2rem; margin-bottom: 0.5rem;
            font-family: var(--font-title); color: var(--primary);
          ">🔒 Acceso Privado</h1>
          
          <p style="color: var(--text-secondary); margin-bottom: 2rem; font-size: 1.1rem;">
            Solo para jugadores autorizados de la Academia
          </p>
          
          <div style="display: flex; flex-direction: column; gap: 1.2rem; max-width: 320px; margin: 0 auto;">
            <div style="text-align: left;">
              <label style="display: block; margin-bottom: 0.4rem; font-weight: 600; font-size: 0.95rem; color: var(--text-secondary);">
                👤 Usuario
              </label>
              <input id="login-user" type="text" placeholder="Tu usuario" autocomplete="off" style="
                width: 100%; padding: 0.9rem 1.2rem; font-size: 1.1rem;
                border: 3px solid rgba(211,47,47,0.2); border-radius: 12px;
                background: white; color: var(--text-primary);
                font-family: var(--font-body);
                transition: border-color 0.2s;
              "/>
            </div>
            
            <div style="text-align: left;">
              <label style="display: block; margin-bottom: 0.4rem; font-weight: 600; font-size: 0.95rem; color: var(--text-secondary);">
                🔑 Contraseña
              </label>
              <input id="login-pass" type="password" placeholder="Tu contraseña" style="
                width: 100%; padding: 0.9rem 1.2rem; font-size: 1.1rem;
                border: 3px solid rgba(211,47,47,0.2); border-radius: 12px;
                background: white; color: var(--text-primary);
                font-family: var(--font-body);
                transition: border-color 0.2s;
              "/>
            </div>
            
            <div id="login-error" style="
              color: #D32F2F; font-weight: 600; font-size: 0.95rem;
              min-height: 1.5rem; opacity: 0; transition: opacity 0.3s;
            "></div>
            
            <button class="btn btn-primary" id="login-btn" style="
              font-size: 1.3rem; padding: 1rem 2rem; margin-top: 0.5rem;
              background: linear-gradient(135deg, var(--primary), var(--primary-dark));
              border: none; box-shadow: 0 6px 20px rgba(211,47,47,0.25);
            ">
              Entrar a la Academia ⚽
            </button>
          </div>
          
          <!-- Franja River decorativa -->
          <div style="
            margin-top: 2.5rem; height: 8px; border-radius: 4px;
            background: linear-gradient(90deg, #D32F2F 33%, #FFFFFF 33%, #FFFFFF 66%, #D32F2F 66%);
            opacity: 0.3;
          "></div>
        </div>
      </div>
    `;

    // Focus
    setTimeout(() => document.getElementById('login-user')?.focus(), 100);

    // Login handler
    const tryLogin = () => {
      const user = document.getElementById('login-user').value.trim();
      const pass = document.getElementById('login-pass').value;
      const errorEl = document.getElementById('login-error');

      if (user === 'ferchas' && pass === 'ferchas3000') {
        this.isLoggedIn = true;
        this.soundSystem.play('levelUp');
        this.showWelcomeScreen();
      } else {
        errorEl.textContent = '❌ Usuario o contraseña incorrectos';
        errorEl.style.opacity = '1';
        // Shake animation
        const card = this.container.querySelector('.card');
        card.style.animation = 'shake 0.4s ease';
        setTimeout(() => card.style.animation = '', 400);
      }
    };

    document.getElementById('login-btn').addEventListener('click', tryLogin);
    document.getElementById('login-pass').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') tryLogin();
    });
    document.getElementById('login-user').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') document.getElementById('login-pass').focus();
    });
  }

  // ═══════════════════════════════════════════════════════════
  // PANTALLA DE BIENVENIDA
  // ═══════════════════════════════════════════════════════════
  showWelcomeScreen() {
    // Check login first
    if (!this.isLoggedIn) {
      this.showLoginScreen();
      return;
    }
    const fraseBienvenida = this.pulpoArmani.getFrase('bienvenida');

    this.container.innerHTML = `
      <div class="center-container">
        <div class="card" style="max-width: 800px; text-align: center; padding: 3rem;">
          
          <!-- Escudo River Educativo -->
          <div style="margin-bottom: 2rem;">
            <img 
              src="/assets/river/Escudo.png" 
              alt="Escudo River Plate" 
              style="
                width: 150px;
                height: 150px;
                margin-bottom: 1rem;
                filter: drop-shadow(0 4px 12px rgba(211, 47, 47, 0.3));
              "
            />
            <h1 style="
              font-size: 2.5rem;
              margin-bottom: 0.5rem;
              color: var(--primary);
              font-family: var(--font-title);
            ">
              ¡Hola Ferchu! 👋
            </h1>
            <p style="
              font-size: 1.3rem;
              color: var(--text-secondary);
              margin-bottom: 2rem;
            ">
              Soy el <strong>Pulpo Armani</strong>, tu entrenador
            </p>
          </div>

          <!-- Mensaje motivacional -->
          <div style="
            background: linear-gradient(135deg, rgba(211, 47, 47, 0.08), rgba(56, 142, 60, 0.08));
            padding: 2rem;
            border-radius: 20px;
            margin-bottom: 2rem;
            border: 2px solid rgba(211, 47, 47, 0.2);
          ">
            <p style="
              font-size: 1.2rem;
              line-height: 1.6;
              color: var(--text-primary);
              margin: 0;
            ">
              ${fraseBienvenida}
            </p>
          </div>

          <!-- Info -->
          <div style="
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
            margin-bottom: 2.5rem;
          ">
            <div style="
              padding: 1.5rem;
              background: white;
              border-radius: 15px;
              border: 2px solid rgba(211, 47, 47, 0.15);
            ">
              <div style="font-size: 2rem; margin-bottom: 0.5rem;">📚</div>
              <div style="font-weight: 700; color: var(--text-primary);">Múltiples Temas</div>
            </div>
            <div style="
              padding: 1.5rem;
              background: white;
              border-radius: 15px;
              border: 2px solid rgba(56, 142, 60, 0.3);
            ">
              <div style="font-size: 2rem; margin-bottom: 0.5rem;">⚽</div>
              <div style="font-weight: 700; color: var(--text-primary);">Breaks con juegos</div>
            </div>
            <div style="
              padding: 1.5rem;
              background: white;
              border-radius: 15px;
              border: 2px solid rgba(211, 47, 47, 0.15);
            ">
              <div style="font-size: 2rem; margin-bottom: 0.5rem;">🏆</div>
              <div style="font-weight: 700; color: var(--text-primary);">Reporte final</div>
            </div>
          </div>
          
          <!-- Botón -->
          <button class="btn btn-primary" id="start-btn" style="
            font-size: 1.8rem;
            padding: 1.5rem 4rem;
            background: linear-gradient(135deg, var(--primary), var(--primary-dark));
            border: none;
            box-shadow: 0 8px 24px rgba(211, 47, 47, 0.3);
          ">
            ¡Al Campo de Entrenamiento! 🧤⚽
          </button>

          <p style="
            margin-top: 1.5rem;
            font-size: 0.95rem;
            color: var(--text-secondary);
          ">
            Presioná el botón cuando estés listo
          </p>
        </div>
      </div>
    `;

    document.getElementById('start-btn').addEventListener('click', () => {
      this.activityManager.startSession('Ferchu');
      this.showTopicSelector();
    });
  }

  // ═══════════════════════════════════════════════════════════
  // SELECTOR DE TEMAS (NUEVO)
  // ═══════════════════════════════════════════════════════════
  showTopicSelector() {
    const topics = this.topicManager.getTopics();

    const topicsHTML = topics.map(topic => `
      <div class="topic-card ${!topic.active ? 'topic-disabled' : ''}" 
           data-topic-id="${topic.id}"
           style="
             background: ${topic.active ? 'white' : 'rgba(200,200,200,0.3)'};
             border: 3px solid ${topic.active ? topic.color : '#ccc'};
             border-radius: 24px;
             padding: 2.5rem 2rem;
             cursor: ${topic.active ? 'pointer' : 'not-allowed'};
             transition: all 0.3s ease;
             position: relative;
             overflow: hidden;
             opacity: ${topic.active ? '1' : '0.6'};
           ">
        ${topic.comingSoon ? `
          <div style="
            position: absolute;
            top: 15px;
            right: 15px;
            background: #FFB74D;
            color: #333;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 700;
          ">🔒 Próximamente</div>
        ` : ''}
        
        <div style="
          font-size: 4rem;
          margin-bottom: 1rem;
          filter: ${topic.active ? 'none' : 'grayscale(1)'};
        ">${topic.icon}</div>
        
        <h3 style="
          font-size: 1.6rem;
          margin-bottom: 0.5rem;
          color: ${topic.active ? topic.color : '#999'};
          font-family: var(--font-title);
        ">${topic.name}</h3>
        
        <p style="
          font-size: 1rem;
          color: var(--text-secondary);
          margin-bottom: 1rem;
          line-height: 1.4;
        ">${topic.description}</p>
        
        ${topic.active ? `
          <div style="
            display: inline-block;
            background: ${topic.colorLight};
            color: ${topic.color};
            padding: 6px 16px;
            border-radius: 20px;
            font-weight: 700;
            font-size: 0.9rem;
          ">${topic.activityCount} actividades</div>
        ` : ''}
      </div>
    `).join('');

    this.container.innerHTML = `
      <div style="padding: 2rem;">
        <div class="header" style="margin-bottom: 2rem;">
          <button class="btn btn-secondary" id="back-welcome-btn" style="padding: 0.5rem 1rem;">
            ← Volver
          </button>
          <div style="color: var(--text-secondary);">
            👤 ${this.activityManager.studentName}
          </div>
        </div>
        
        <div style="max-width: 1000px; margin: 0 auto;">
          <h2 style="
            text-align: center;
            margin-bottom: 0.5rem;
            font-family: var(--font-title);
            font-size: 2.2rem;
            color: var(--primary);
          ">
            ¿Qué tema querés entrenar? 📚
          </h2>
          <p style="
            text-align: center;
            color: var(--text-secondary);
            margin-bottom: 2.5rem;
            font-size: 1.1rem;
          ">Elegí un tema para empezar</p>
          
          <div style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
          ">
            ${topicsHTML}
          </div>
        </div>
      </div>
    `;

    // Event listeners
    document.getElementById('back-welcome-btn').addEventListener('click', () => {
      this.showWelcomeScreen();
    });

    document.querySelectorAll('.topic-card:not(.topic-disabled)').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
        card.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });
      card.addEventListener('click', () => {
        this.soundSystem.play('click');
        const topicId = card.dataset.topicId;
        this.topicManager.setCurrentTopic(topicId);
        this.activityManager.loadActivitiesForTopic(topicId);
        this.showActivitySelector();
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // SELECTOR DE ACTIVIDADES
  // ═══════════════════════════════════════════════════════════
  showActivitySelector() {
    const activities = this.activityManager.activities;
    const topic = this.topicManager.getCurrentTopic();

    let activitiesHTML = activities.map((activity) => `
      <div class="activity-card" data-activity-id="${activity.id}">
        <div class="activity-number">${activity.id}</div>
        <h3>${activity.title}</h3>
        <p>${activity.instructions}</p>
        <div class="exercise-count">${activity.exercises.length} ejercicios</div>
      </div>
    `).join('');

    this.container.innerHTML = `
      <div style="padding: 2rem;">
        <div class="header">
          <button class="btn btn-secondary" id="back-topics-btn" style="padding: 0.5rem 1rem;">
            ← Temas
          </button>
          <h2 class="logo" style="color: ${topic ? topic.color : 'var(--primary)'};">
            ${topic ? topic.icon : '📚'} ${topic ? topic.name : 'Actividades'}
          </h2>
          <div style="color: var(--text-secondary);">
            👤 ${this.activityManager.studentName}
          </div>
        </div>
        
        <div style="max-width: 1200px; margin: 2rem auto;">
          <h2 style="text-align: center; margin-bottom: 2rem; font-family: var(--font-title); font-size: 2rem;">
            Selecciona una Actividad
          </h2>
          
          <div class="activities-grid">
            ${activitiesHTML}
          </div>
        </div>
      </div>
    `;

    document.getElementById('back-topics-btn').addEventListener('click', () => {
      this.showTopicSelector();
    });

    document.querySelectorAll('.activity-card').forEach(card => {
      card.addEventListener('click', () => {
        this.soundSystem.play('click');
        const activityId = parseInt(card.dataset.activityId);
        this.startActivity(activityId);
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // INICIAR ACTIVIDAD
  // ═══════════════════════════════════════════════════════════
  startActivity(activityId) {
    const activity = this.activityManager.activities.find(a => a.id === activityId);
    this.currentActivity = activity;
    this.currentExerciseIndex = 0;
    this.activityManager.currentActivity = activityId;
    this.breakManager.startSession();
    this.showExercise();
  }

  // ═══════════════════════════════════════════════════════════
  // MOSTRAR EJERCICIO
  // ═══════════════════════════════════════════════════════════
  showExercise() {
    const activity = this.currentActivity;
    const exercise = activity.exercises[this.currentExerciseIndex];
    this.exerciseStartTime = Date.now();

    let exerciseUI = '';
    let needsGeometryCanvas = true;

    switch (activity.type) {
      case 'identificar-angulo':
        exerciseUI = this.createIdentifyAngleUI(exercise);
        break;
      case 'medir-angulo':
        exerciseUI = this.createMeasureAngleUI(exercise);
        break;
      case 'complementario':
      case 'suplementario':
        exerciseUI = this.createComplementaryUI(exercise, activity.type);
        break;
      case 'angulo-faltante':
        exerciseUI = this.createMissingAngleUI(exercise);
        break;
      case 'clasificar-triangulo-lados':
      case 'clasificar-triangulo-angulos':
        exerciseUI = this.createClassifyTriangleUI(exercise, activity.type);
        break;
      case 'lineas-paralelas':
        exerciseUI = this.createParallelLinesUI(exercise);
        break;
      // ═══ POTENCIACIÓN ═══
      case 'potencia-simple':
      case 'potencia-combinada':
      case 'potencia-boss':
        exerciseUI = this.createPotenciacionUI(exercise, activity.type);
        needsGeometryCanvas = false;
        break;
    }

    const topic = this.topicManager.getCurrentTopic();

    this.container.innerHTML = `
      ${this.riverHeader.render()}
      
      <div style="padding: 1.5rem;">
        <!-- Navegación y progreso -->
        <div style="max-width: 1400px; margin: 0 auto;">
          <div class="header" style="margin-bottom: 1rem;">
            <button class="btn btn-secondary" id="back-btn" style="padding: 0.5rem 1rem;">
              ← Volver
            </button>
            <div class="hud">
              <div class="hud-item">
                <span>${topic ? topic.icon : '📐'} ${activity.title}</span>
              </div>
              <div class="hud-item">
                <span>${this.currentExerciseIndex + 1}/${activity.exercises.length}</span>
              </div>
            </div>
          </div>
        
        <!-- Barra de progreso -->
        <div style="margin: 1rem auto; max-width: 1000px;">
          <div style="background: rgba(255,255,255,0.1); height: 10px; border-radius: 5px; overflow: hidden;">
            <div style="
              background: linear-gradient(90deg, ${topic ? topic.color : 'var(--primary)'}, var(--accent));
              height: 100%;
              width: ${((this.currentExerciseIndex + 1) / activity.exercises.length) * 100}%;
              transition: width 0.3s ease;
            "></div>
          </div>
        </div>
        
        <!-- Área de ejercicio -->
        <div style="max-width: 1400px; margin: 2rem auto;">
          <div class="card">
            
            ${needsGeometryCanvas ? `
            <!-- GRID DE 2 COLUMNAS para geometría -->
            <div style="
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 3rem;
              align-items: start;
            ">
              
              <!-- COLUMNA IZQUIERDA -->
              <div style="
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
                padding: 1rem;
                max-height: calc(100vh - 280px);
                overflow-y: auto;
                position: relative;
                z-index: 100;
              ">
                <h3 style="
                  margin: 0;
                  font-size: 1.6rem;
                  color: var(--primary);
                  font-family: var(--font-title);
                  text-align: center;
                  flex-shrink: 0;
                ">
                  ${activity.instructions}
                </h3>
                
                <div id="exercise-options" style="flex: 1; overflow-y: auto; position: relative; z-index: 101;">
                  ${exerciseUI}
                </div>
                
                <div id="feedback" class="feedback hidden" style="flex-shrink: 0;"></div>
                
                <div style="
                  display: flex;
                  justify-content: center;
                  margin-top: auto;
                  padding-top: 1.5rem;
                  background: white;
                  position: sticky;
                  bottom: 0;
                  z-index: 10;
                  flex-shrink: 0;
                ">
                  <button class="btn btn-primary" id="submit-btn" style="
                    font-size: 1.3rem;
                    padding: 1rem 3rem;
                    width: 100%;
                    max-width: 400px;
                    box-shadow: 0 -4px 12px rgba(211, 47, 47, 0.1);
                  ">
                    Confirmar Respuesta ✓
                  </button>
                </div>
              </div>
              
              <!-- COLUMNA DERECHA: Figura Geométrica -->
              <div style="
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 600px;
                position: sticky;
                top: 2rem;
                padding: 2rem;
              ">
                <div id="geometry-container-inline" style="
                  width: 100%;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "></div>
              </div>
              
            </div>
            ` : `
            <!-- LAYOUT CENTRADO para potenciación -->
            <div style="
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 2rem;
              padding: 2rem;
            ">
              <h3 style="
                margin: 0;
                font-size: 1.6rem;
                color: ${topic ? topic.color : 'var(--primary)'};
                font-family: var(--font-title);
                text-align: center;
              ">
                ${activity.instructions}
              </h3>
              
              <div id="exercise-options" style="width: 100%; max-width: 700px;">
                ${exerciseUI}
              </div>
              
              <div id="feedback" class="feedback hidden"></div>
              
              <button class="btn btn-primary" id="submit-btn" style="
                font-size: 1.3rem;
                padding: 1rem 3rem;
                max-width: 400px;
                background: linear-gradient(135deg, ${topic ? topic.color : 'var(--primary)'}, #1565C0);
              ">
                Confirmar Respuesta ✓
              </button>
            </div>
            `}
          </div>
        </div>
      </div>
    `;

    // Event listeners
    document.getElementById('back-btn').addEventListener('click', () => {
      this.showActivitySelector();
    });

    document.getElementById('submit-btn').addEventListener('click', () => {
      this.soundSystem.play('click');
      this.submitAnswer();
    });

    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });

    // Render geometry scene if needed
    if (needsGeometryCanvas) {
      setTimeout(() => {
        this.scene.updateForExercise(activity.type, exercise);
      }, 0);
    }
  }

  // ═══════════════════════════════════════════════════════════
  // UI: ÁNGULOS (existentes)
  // ═══════════════════════════════════════════════════════════

  createIdentifyAngleUI(exercise) {
    return `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <p style="
          font-size: 1.5rem;
          margin: 0;
          font-weight: 600;
          color: var(--text-primary);
          text-align: center;
        ">
          ¿Qué tipo de ángulo es? 🤔
        </p>
        
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <button class="option-btn" data-answer="agudo" style="width: 100%;">
            📐 Agudo<br/>
            <small>(menor a 90°)</small>
          </button>
          <button class="option-btn" data-answer="recto" style="width: 100%;">
            📏 Recto<br/>
            <small>(igual a 90°)</small>
          </button>
          <button class="option-btn" data-answer="obtuso" style="width: 100%;">
            📊 Obtuso<br/>
            <small>(mayor a 90°)</small>
          </button>
        </div>
      </div>
    `;
  }

  createMeasureAngleUI(exercise) {
    return `
      <div style="display: flex; flex-direction: column; gap: 2rem; align-items: center;">
        <p style="
          font-size: 1.5rem;
          margin: 0;
          font-weight: 600;
          color: var(--text-primary);
          text-align: center;
        ">
          ¿Cuántos grados mide este ángulo? 📐
        </p>
        
        <div style="display: flex; align-items: center; gap: 1rem;">
          <input 
            type="number" 
            id="angle-input" 
            class="answer-input"
            min="0" 
            max="180" 
            placeholder="?"
            style="
              font-size: 3rem;
              padding: 1rem 2rem;
              width: 200px;
              text-align: center;
              border: 3px solid var(--primary);
              border-radius: 15px;
              background: #FFFFFF;
              color: var(--text-primary);
              font-family: var(--font-number);
              font-weight: 700;
            "
          />
          <span style="font-size: 2rem; margin-left: 0.5rem; color: var(--text-primary);">°</span>
        </div>
      </div>
    `;
  }

  createComplementaryUI(exercise, type) {
    const total = type === 'complementario' ? 90 : 180;
    return `
      <div style="text-align: center;">
        <div style="background: rgba(108, 99, 255, 0.2); padding: 2rem; border-radius: 15px; margin-bottom: 2rem;">
          <p style="font-size: 1.3rem; margin-bottom: 1rem;">
            Ángulo dado: <span style="color: var(--accent); font-family: var(--font-number); font-size: 2.5rem;">${exercise.given}°</span>
          </p>
          <p style="font-size: 1.1rem; color: var(--text-secondary);">
            ${type === 'complementario' ?
        'Los ángulos complementarios suman 90°' :
        'Los ángulos suplementarios suman 180°'}
          </p>
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 1rem; font-size: 1.2rem;">
            El ángulo ${type} es:
          </label>
          <input 
            type="number" 
            id="angle-input" 
            min="0" 
            max="${total}" 
            placeholder="?"
            style="
              width: 150px;
              padding: 1rem;
              font-size: 2rem;
              border: 2px solid var(--accent);
              border-radius: 10px;
              background: rgba(255, 255, 255, 0.1);
              color: white;
              text-align: center;
              font-family: var(--font-number);
            "
          />
          <span style="font-size: 2rem; margin-left: 0.5rem;">°</span>
        </div>
      </div>
    `;
  }

  createMissingAngleUI(exercise) {
    return `
      <div style="text-align: center;">
        <div style="background: rgba(255, 101, 132, 0.2); padding: 2rem; border-radius: 15px; margin-bottom: 2rem;">
          <p style="font-size: 1.2rem; margin-bottom: 1rem;">
            Ángulos conocidos del triángulo:
          </p>
          <div style="display: flex; gap: 2rem; justify-content: center; margin: 1.5rem 0;">
            <span style="color: var(--secondary); font-family: var(--font-number); font-size: 2.5rem;">
              ${exercise.labels ? exercise.labels[0] : exercise.angles[0] + '°'}
            </span>
            <span style="color: var(--secondary); font-family: var(--font-number); font-size: 2.5rem;">
              ${exercise.labels ? exercise.labels[1] : exercise.angles[1] + '°'}
            </span>
            <span style="color: var(--warning); font-family: var(--font-number); font-size: 2.5rem;">
              ${exercise.labels ? exercise.labels[2] : '?°'}
            </span>
          </div>
          <p style="font-size: 1rem; color: var(--text-secondary);">
            Recuerda: Los ángulos de un triángulo suman 180°
          </p>
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 1rem; font-size: 1.2rem;">
            El tercer ángulo mide:
          </label>
          <input 
            type="number" 
            id="angle-input" 
            min="0" 
            max="180" 
            placeholder="?"
            style="
              width: 150px;
              padding: 1rem;
              font-size: 2rem;
              border: 2px solid var(--warning);
              border-radius: 10px;
              background: rgba(255, 255, 255, 0.1);
              color: white;
              text-align: center;
              font-family: var(--font-number);
            "
          />
          <span style="font-size: 2rem; margin-left: 0.5rem;">°</span>
        </div>
      </div>
    `;
  }

  createClassifyTriangleUI(exercise, type) {
    const isByLados = type === 'clasificar-triangulo-lados';

    const info = isByLados ?
      `Lados: ${exercise.sides.join(', ')}` :
      `Ángulos: ${exercise.labels ? exercise.labels.join(', ') : exercise.angles.join('°, ')}`;

    const options = isByLados ?
      ['equilátero', 'isósceles', 'escaleno'] :
      ['acutángulo', 'rectángulo', 'obtusángulo'];

    const descriptions = isByLados ? {
      'equilátero': '3 lados iguales',
      'isósceles': '2 lados iguales',
      'escaleno': '3 lados diferentes'
    } : {
      'acutángulo': 'todos los ángulos < 90°',
      'rectángulo': 'un ángulo = 90°',
      'obtusángulo': 'un ángulo > 90°'
    };

    return `
      <div style="text-align: center;">
        <div style="background: rgba(78, 205, 196, 0.2); padding: 2rem; border-radius: 15px; margin-bottom: 2rem;">
          <p style="font-size: 1.5rem; font-family: var(--font-number);">
            ${info}
          </p>
        </div>
        
        <p style="margin-bottom: 1.5rem; font-size: 1.2rem;">
          Este triángulo es:
        </p>
        
        <div class="options-grid">
        ${options.map(opt => `
            <button class="option-btn" data-answer="${opt}">
              ${opt.charAt(0).toUpperCase() + opt.slice(1)}<br/>
              <small>${descriptions[opt]}</small>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  createParallelLinesUI(exercise) {
    return `
      <div style="text-align: center;">
        <p style="font-size: 1.2rem; margin-bottom: 2rem;">
          Ángulo dado: <span style="color: var(--primary); font-family: var(--font-number); font-size: 2.5rem;">${exercise.given}°</span>
        </p>
        <p style="margin-bottom: 1.5rem;">
          Tipo de relación: <strong>${exercise.type}</strong>
        </p>
        
        <div>
          <label style="display: block; margin-bottom: 1rem; font-size: 1.2rem;">
            El ángulo ${exercise.type} mide:
          </label>
          <input 
            type="number" 
            id="angle-input" 
            min="0" 
            max="180" 
            placeholder="?"
            style="
              width: 150px;
              padding: 1rem;
              font-size: 2rem;
              border: 2px solid var(--primary);
              border-radius: 10px;
              background: rgba(255, 255, 255, 0.1);
              color: white;
              text-align: center;
              font-family: var(--font-number);
            "
          />
          <span style="font-size: 2rem; margin-left: 0.5rem;">°</span>
        </div>
      </div>
    `;
  }

  // ═══════════════════════════════════════════════════════════
  // UI: POTENCIACIÓN (NUEVO)
  // ═══════════════════════════════════════════════════════════
  createPotenciacionUI(exercise, activityType) {
    // Determinar dificultad visual
    const difficultyColors = {
      'potencia-simple': { bg: 'rgba(25, 118, 210, 0.1)', border: '#1976D2', label: '⚡ Propiedad Única' },
      'potencia-combinada': { bg: 'rgba(255, 152, 0, 0.1)', border: '#FF9800', label: '🔥 Combinado' },
      'potencia-boss': { bg: 'rgba(211, 47, 47, 0.1)', border: '#D32F2F', label: '💀 Final Boss' }
    };
    const style = difficultyColors[activityType] || difficultyColors['potencia-simple'];

    return `
      <div style="text-align: center;">
        <!-- Badge de dificultad -->
        <div style="
          display: inline-block;
          background: ${style.bg};
          border: 2px solid ${style.border};
          color: ${style.border};
          padding: 6px 20px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.9rem;
          margin-bottom: 2rem;
        ">${style.label}</div>

        <!-- Expresión matemática grande -->
        <div style="
          background: linear-gradient(135deg, rgba(25, 118, 210, 0.06), rgba(25, 118, 210, 0.12));
          padding: 2.5rem 2rem;
          border-radius: 20px;
          margin-bottom: 2rem;
          border: 2px solid rgba(25, 118, 210, 0.2);
        ">
          <div id="potencia-expression" style="
            font-size: 3rem;
            font-family: var(--font-number);
            color: var(--text-primary);
            font-weight: 700;
            letter-spacing: 2px;
            line-height: 1.6;
          ">
            ${this._renderExpression(exercise)}
          </div>
        </div>

        <!-- Pista -->
        ${exercise.hint ? `
          <div style="
            background: rgba(255, 193, 7, 0.1);
            border: 1px solid rgba(255, 193, 7, 0.3);
            padding: 1rem 1.5rem;
            border-radius: 12px;
            margin-bottom: 2rem;
            font-size: 1rem;
            color: #F57F17;
          ">
            💡 <strong>Pista:</strong> ${exercise.hint}
          </div>
        ` : ''}

        <!-- Respuesta: Base y Exponente -->
        <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1rem;
        ">
          <label style="font-size: 1.3rem; font-weight: 600; color: var(--text-primary); margin-right: 1rem;">
            Resultado =
          </label>
          
          <div style="position: relative; display: inline-flex; align-items: flex-start;">
            <!-- Base input -->
            <input 
              type="number" 
              id="potencia-base-input" 
              min="1" 
              max="99"
              placeholder="?"
              style="
                width: 100px;
                padding: 1rem;
                font-size: 2.5rem;
                border: 3px solid #1976D2;
                border-radius: 12px;
                background: white;
                color: var(--text-primary);
                text-align: center;
                font-family: var(--font-number);
                font-weight: 700;
              "
            />
            <!-- Exponente input -->
            <input 
              type="number" 
              id="potencia-exp-input" 
              min="0" 
              max="99"
              placeholder="?"
              style="
                width: 65px;
                padding: 0.5rem;
                font-size: 1.5rem;
                border: 3px solid #FF9800;
                border-radius: 10px;
                background: #FFF8E1;
                color: #E65100;
                text-align: center;
                font-family: var(--font-number);
                font-weight: 700;
                margin-left: -8px;
                margin-top: -15px;
                position: relative;
                z-index: 2;
              "
            />
          </div>
        </div>

        <p style="
          margin-top: 1rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        ">
          Escribí la base y el exponente del resultado
        </p>
      </div>
    `;
  }

  _renderExpression(exercise) {
    // Render la expresión con HTML para exponentes
    let html = exercise.expression;

    // Reemplazar exponentes unicode con HTML superscript
    const superMap = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' };

    // Convertir superscripts unicode a tags HTML para mejor visual
    let result = '';
    let i = 0;
    while (i < html.length) {
      if (superMap[html[i]]) {
        let sup = '';
        while (i < html.length && superMap[html[i]]) {
          sup += superMap[html[i]];
          i++;
        }
        result += `<sup style="font-size: 0.55em; color: #1976D2; font-weight: 800; position: relative; top: -0.6em;">${sup}</sup>`;
      } else {
        // Color operators
        if (html[i] === '·') {
          result += `<span style="color: #4CAF50; font-weight: 900;"> · </span>`;
        } else if (html[i] === '/') {
          result += `<span style="color: #F44336; font-weight: 900;"> / </span>`;
        } else {
          result += html[i];
        }
        i++;
      }
    }
    return result;
  }

  // ═══════════════════════════════════════════════════════════
  // SUBMIT RESPUESTA
  // ═══════════════════════════════════════════════════════════
  submitAnswer() {
    let userAnswer = null;
    const activity = this.currentActivity;

    // Potenciación: obtener base y exponente
    if (['potencia-simple', 'potencia-combinada', 'potencia-boss'].includes(activity.type)) {
      const baseInput = document.getElementById('potencia-base-input');
      const expInput = document.getElementById('potencia-exp-input');

      if (!baseInput || !expInput || baseInput.value === '' || expInput.value === '') {
        this.showFeedback('Completá la base y el exponente', 'error');
        return;
      }

      userAnswer = {
        base: parseInt(baseInput.value),
        exp: parseInt(expInput.value)
      };
    } else {
      // Geometría: inputs normales
      const input = document.getElementById('angle-input');
      if (input) {
        userAnswer = parseInt(input.value);
        if (isNaN(userAnswer)) {
          this.showFeedback('Por favor ingresa un número válido', 'error');
          return;
        }
      } else {
        const selected = document.querySelector('.option-btn.selected');
        if (!selected) {
          this.showFeedback('Por favor selecciona una opción', 'error');
          return;
        }
        userAnswer = selected.dataset.answer;
      }
    }

    const timeSpent = Math.round((Date.now() - this.exerciseStartTime) / 1000);

    const result = this.activityManager.recordResponse(
      this.currentActivity.id,
      this.currentExerciseIndex,
      userAnswer,
      timeSpent
    );

    this.showFeedback(result.feedback, result.isCorrect ? 'success' : 'error');

    this.exercisesCompletedTotal++;
    this.riverHeader.updateExerciseCount(this.exercisesCompletedTotal);

    if (result.isCorrect) {
      this.soundSystem.play('success');
      this.currentStreak++;
      this.correctInCurrentSet++;
      this.riverHeader.updateStreak(this.currentStreak);
    } else {
      this.soundSystem.play('error');
      this.currentStreak = 0;
      this.riverHeader.resetStreak();
    }

    setTimeout(() => {
      this.nextExercise();
    }, 800);
  }

  // ═══════════════════════════════════════════════════════════
  // FEEDBACK / NAVEGACIÓN
  // ═══════════════════════════════════════════════════════════
  showFeedback(message, type) {
    const feedbackEl = document.getElementById('feedback');
    if (!feedbackEl) return;
    feedbackEl.textContent = message;
    feedbackEl.className = `feedback ${type}`;
    feedbackEl.classList.remove('hidden');
    feedbackEl.classList.add('bounce-in');
  }

  nextExercise() {
    this.currentExerciseIndex++;
    this.breakManager.exerciseCompleted();

    if (this.breakManager.needsBreak()) {
      this.showBreakScreen();
      return;
    }

    if (this.currentExerciseIndex >= this.currentActivity.exercises.length) {
      this.showActivityComplete();
    } else {
      this.showExercise();
    }
  }

  // ═══════════════════════════════════════════════════════════
  // ACTIVIDAD COMPLETA
  // ═══════════════════════════════════════════════════════════
  showActivityComplete() {
    this.soundSystem.play('fanfare');

    const activity = this.currentActivity;
    const responses = this.activityManager.responses.filter(
      r => r.activityId === activity.id
    );
    const correct = responses.filter(r => r.isCorrect).length;
    const total = responses.length;
    const percentage = ((correct / total) * 100).toFixed(1);
    const topic = this.topicManager.getCurrentTopic();

    this.container.innerHTML = `
      <div class="center-container">
        <div class="card" style="max-width: 600px; text-align: center;">
          <h2 style="font-size: 2.5rem; margin-bottom: 1rem;">🎉 ¡Actividad Completada!</h2>
          
          <div class="star-rating">
            ${percentage >= 90 ? '⭐⭐⭐' : percentage >= 70 ? '⭐⭐' : '⭐'}
          </div>
          
          <div style="background: rgba(108, 99, 255, 0.2); padding: 2rem; border-radius: 15px; margin: 2rem 0;">
            <p style="font-size: 1.2rem; margin-bottom: 1rem;">${activity.title}</p>
            <p style="font-size: 3rem; font-family: var(--font-number); color: var(--accent); margin: 1rem 0;">
              ${correct}/${total}
            </p>
            <p style="font-size: 1.5rem; color: var(--success);">${percentage}% correcto</p>
          </div>
          
          <div style="display: flex; gap: 1rem; justify-content: center;">
            <button class="btn btn-secondary" id="menu-btn">
              🏠 Menú de Actividades
            </button>
            <button class="btn btn-primary" id="continue-btn">
              ➡️ Siguiente Actividad
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('menu-btn').addEventListener('click', () => {
      this.showActivitySelector();
    });

    document.getElementById('continue-btn').addEventListener('click', () => {
      const nextActivityId = activity.id + 1;
      const nextActivity = this.activityManager.activities.find(a => a.id === nextActivityId);

      if (nextActivity) {
        this.startActivity(nextActivityId);
      } else {
        this.showFinalResults();
      }
    });
  }

  // ═══════════════════════════════════════════════════════════
  // RESULTADOS FINALES
  // ═══════════════════════════════════════════════════════════
  showFinalResults() {
    this.activityManager.endTime = new Date();
    const report = this.activityManager.generateReport();
    const topic = this.topicManager.getCurrentTopic();
    const totalCorrect = report.correct;
    const totalExercises = report.totalResponses;
    const percentage = totalExercises > 0 ? ((totalCorrect / totalExercises) * 100).toFixed(1) : 0;

    this.container.innerHTML = `
      <div class="center-container">
        <div class="card" style="max-width: 700px; text-align: center;">
          <h1 style="font-size: 3rem; margin-bottom: 1rem;">🏆 ¡Felicitaciones!</h1>
          <h2 style="color: var(--accent); margin-bottom: 2rem;">${report.studentName}</h2>
          
          <div style="
            display: inline-block;
            background: ${topic ? topic.colorLight : 'rgba(211,47,47,0.1)'};
            color: ${topic ? topic.color : 'var(--primary)'};
            padding: 8px 20px;
            border-radius: 20px;
            font-weight: 700;
            margin-bottom: 2rem;
          ">${topic ? topic.icon + ' ' + topic.name : '📚 General'}</div>
          
          <div style="background: rgba(78, 205, 196, 0.2); padding: 2rem; border-radius: 15px; margin: 2rem 0;">
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; text-align: center;">
              <div>
                <p style="color: var(--text-secondary); font-size: 0.9rem;">Ejercicios</p>
                <p style="font-size: 2rem; font-family: var(--font-number);">${totalExercises}</p>
              </div>
              <div>
                <p style="color: var(--text-secondary); font-size: 0.9rem;">Correctas</p>
                <p style="font-size: 2rem; font-family: var(--font-number); color: var(--success);">${totalCorrect}</p>
              </div>
              <div>
                <p style="color: var(--text-secondary); font-size: 0.9rem;">Porcentaje</p>
                <p style="font-size: 2rem; font-family: var(--font-number); color: var(--accent);">${percentage}%</p>
              </div>
            </div>
          </div>
          
          <div style="display: flex; gap: 1rem; justify-content: center;">
            <button class="btn btn-secondary" id="topics-btn">
              📚 Elegir otro Tema
            </button>
            <button class="btn btn-primary" id="restart-btn">
              🔄 Nueva Sesión
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('topics-btn').addEventListener('click', () => {
      this.showTopicSelector();
    });

    document.getElementById('restart-btn').addEventListener('click', () => {
      this.activityManager.responses = [];
      this.showTopicSelector();
    });
  }

  // ═══════════════════════════════════════════════════════════
  // BREAK SCREEN — Tiros = respuestas correctas (REWARD)
  // ═══════════════════════════════════════════════════════════
  showBreakScreen() {
    this.breakManager.startBreak();

    // Calcular respuestas correctas en este set (desde el último break)
    const shotsEarned = this.correctInCurrentSet;

    this.container.innerHTML = `
      <div style="text-align: center; padding: 1rem 1rem 0;">
        <div style="
          background: linear-gradient(135deg, rgba(211,47,47,0.08), rgba(56,142,60,0.08));
          padding: 1rem 2rem; border-radius: 16px; display: inline-block;
          border: 2px solid rgba(211,47,47,0.15); margin-bottom: 0.5rem;
        ">
          <p style="font-size: 1.3rem; margin: 0; font-weight: 700; color: var(--primary);">
            🎯 ¡Ganaste <span style="font-size: 1.8rem; color: var(--success);">${shotsEarned}</span> ${shotsEarned === 1 ? 'tiro' : 'tiros'} al arco!
          </p>
          <p style="font-size: 0.95rem; color: var(--text-secondary); margin: 0.3rem 0 0;">
            ${shotsEarned} respuesta${shotsEarned === 1 ? '' : 's'} correcta${shotsEarned === 1 ? '' : 's'} = ${shotsEarned} penal${shotsEarned === 1 ? '' : 'es'}
          </p>
        </div>
      </div>
      <div id="break-container" style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 70vh;
        padding: 0 2rem 2rem;
      ">
      </div>
    `;

    const breakContainer = document.getElementById('break-container');
    const penalesGame = new PenalesGame(breakContainer);
    penalesGame.setShots(shotsEarned); // Reward: shots = correct answers
    penalesGame.start();

    penalesGame.onComplete(() => {
      this.breakManager.endBreak();
      this.correctInCurrentSet = 0; // Reset for next set
      this.showExercise();
    });
  }
}
