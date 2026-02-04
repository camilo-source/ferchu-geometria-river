/**
 * ═══════════════════════════════════════════════════════════
 * ⚽ ACADEMIA DE ARQUEROS RIVER - UI Manager
 * Gestión de la interfaz de usuario
 * ═══════════════════════════════════════════════════════════
 */

import { ActivityManager } from '../systems/ActivityManager.js';
import { BreakManager } from '../systems/BreakManager.js';
import { PenalesGame } from '../games/PenalesGame.js';
import { PulpoArmani } from '../components/PulpoArmani.js';
import { RiverHeader } from '../components/RiverHeader.js';

export class UIManager {
  constructor(scene) {
    this.scene = scene;
    this.activityManager = new ActivityManager();
    this.breakManager = new BreakManager();
    this.pulpoArmani = new PulpoArmani();
    this.riverHeader = new RiverHeader();
    this.container = document.getElementById('ui-container');
    this.currentExerciseIndex = 0;
    this.exerciseStartTime = null;
    this.exercisesCompletedTotal = 0;
    this.currentStreak = 0;
  }

  // Mostrar pantalla de bienvenida
  showWelcomeScreen() {
    const fraseBienvenida = this.pulpoArmani.getFrase('bienvenida');

    this.container.innerHTML = `
      <div class="center-container">
        <div class="card" style="max-width: 800px; text-align: center; padding: 3rem;">
          
          <!-- Escudo River Educativo -->
          <div style="margin-bottom: 2rem;">
            <img 
              src="/assets/images/figuras/escudo-river.png" 
              alt="Escudo River" 
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
              Soy el <strong>Pulpo Armani</strong>, tu entrenador de geometría
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

          <!-- Info del entrenamiento -->
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
              <div style="font-size: 2rem; margin-bottom: 0.5rem;">📐</div>
              <div style="font-weight: 700; color: var(--text-primary);">8 Entrenamientos</div>
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
          
          <!-- Botón grande para empezar -->
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

    // Event listener para el botón de inicio
    document.getElementById('start-btn').addEventListener('click', () => {
      // Nombre hardcodeado
      this.activityManager.startSession('Ferchu');
      this.showActivitySelector();
    });
  }

  // Mostrar selector de actividades
  showActivitySelector() {
    const activities = this.activityManager.activities;

    let activitiesHTML = activities.map((activity, index) => `
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
          <h2 class="logo">Geometría Anti-Gravedad</h2>
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

    // Event listeners para las tarjetas de actividades
    document.querySelectorAll('.activity-card').forEach(card => {
      card.addEventListener('click', () => {
        const activityId = parseInt(card.dataset.activityId);
        this.startActivity(activityId);
      });
    });
  }

  // Iniciar una actividad específica
  startActivity(activityId) {
    const activity = this.activityManager.activities.find(a => a.id === activityId);
    this.currentActivity = activity;
    this.currentExerciseIndex = 0;
    this.activityManager.currentActivity = activityId;

    // Iniciar sistema de breaks (TDAH)
    this.breakManager.startSession();

    this.showExercise();
  }

  // Mostrar ejercicio actual
  showExercise() {
    const activity = this.currentActivity;
    const exercise = activity.exercises[this.currentExerciseIndex];
    this.exerciseStartTime = Date.now();

    // Actualizar la escena 3D según el tipo de ejercicio
    this.scene.updateForExercise(activity.type, exercise);

    // Crear UI específica según el tipo
    let exerciseUI = '';

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
    }

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
                <span>📐 ${activity.title}</span>
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
              background: linear-gradient(90deg, var(--primary), var(--accent));
              height: 100%;
              width: ${((this.currentExerciseIndex + 1) / activity.exercises.length) * 100}%;
              transition: width 0.3s ease;
            "></div>
          </div>
        </div>
        
        <!-- Área de ejercicio con LAYOUT DE DOS COLUMNAS -->
        <div style="max-width: 1400px; margin: 2rem auto;">
          <div class="card">
            
            <!-- GRID DE 2 COLUMNAS: Opciones izquierda, Figura derecha -->
            <div style="
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 3rem;
              align-items: start;
            ">
              
              <!-- COLUMNA IZQUIERDA: Instrucciones y Opciones -->
              <div style="
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
                padding: 1rem;
                max-height: calc(100vh - 200px);
                overflow-y: auto;
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
                
                <!-- Área de opciones/inputs -->
                <div id="exercise-options" style="flex: 1; overflow-y: auto;">
                  ${exerciseUI}
                </div>
                
                <!-- Feedback -->
                <div id="feedback" class="feedback hidden" style="flex-shrink: 0;"></div>
                
                <!-- Botón de confirmar - STICKY BOTTOM -->
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
                min-height: 500px;
                position: sticky;
                top: 2rem;
              ">
                <div id="geometry-container-inline" style="
                  width: 100%;
                  height: 100%;
                  min-height: 500px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background: #FFFFFF;
                  border-radius: 20px;
                  border: 3px solid rgba(211, 47, 47, 0.2);
                  padding: 2rem;
                  box-shadow: 0 8px 32px rgba(211, 47, 47, 0.15);
                "></div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    `;

    // Event listeners
    document.getElementById('back-btn').addEventListener('click', () => {
      this.showActivitySelector();
    });

    document.getElementById('submit-btn').addEventListener('click', () => {
      this.submitAnswer();
    });

    // Event listeners para botones de opciones
    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        // Remover selección previa
        document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        // Seleccionar este botón
        btn.classList.add('selected');
      });
    });
  }

  // UI para identificar tipo de ángulo
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

  // UI para medir ángulo
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

  // UI para ángulos complementarios/suplementarios
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

  // UI para ángulo faltante en triángulo
  createMissingAngleUI(exercise) {
    return `
      <div style="text-align: center;">
        <div style="background: rgba(255, 101, 132, 0.2); padding: 2rem; border-radius: 15px; margin-bottom: 2rem;">
          <p style="font-size: 1.2rem; margin-bottom: 1rem;">
            Ángulos conocidos del triángulo:
          </p>
          <div style="display: flex; gap: 2rem; justify-content: center; margin: 1.5rem 0;">
            <span style="color: var(--secondary); font-family: var(--font-number); font-size: 2.5rem;">
              ${exercise.angles[0]}°
            </span>
            <span style="color: var(--secondary); font-family: var(--font-number); font-size: 2.5rem;">
              ${exercise.angles[1]}°
            </span>
            <span style="color: var(--warning); font-family: var(--font-number); font-size: 2.5rem;">
              ?°
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
            min=" 0" 
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

  // UI para clasificar triángulos
  createClassifyTriangleUI(exercise, type) {
    const isByLados = type === 'clasificar-triangulo-lados';

    const info = isByLados ?
      `Lados: ${exercise.sides.join(', ')}` :
      `Ángulos: ${exercise.angles.join('°, ')}°`;

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

  // UI para líneas paralelas
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

  // Enviar respuesta
  submitAnswer() {
    let userAnswer = null;

    // Obtener respuesta según el tipo de UI
    const input = document.getElementById('angle-input');
    if (input) {
      userAnswer = parseInt(input.value);
      if (isNaN(userAnswer)) {
        this.showFeedback('Por favor ingresa un número válido', 'error');
        return;
      }
    } else {
      // Opciones de botones
      const selected = document.querySelector('.option-btn.selected');
      if (!selected) {
        this.showFeedback('Por favor selecciona una opción', 'error');
        return;
      }
      userAnswer = selected.dataset.answer;
    }

    // Calcular tiempo gastado
    const timeSpent = Math.round((Date.now() - this.exerciseStartTime) / 1000);

    // Registrar respuesta
    const result = this.activityManager.recordResponse(
      this.currentActivity.id,
      this.currentExerciseIndex,
      userAnswer,
      timeSpent
    );

    // Mostrar feedback
    this.showFeedback(result.feedback, result.isCorrect ? 'success' : 'error');

    // Actualizar estadísticas en el header
    this.exercisesCompletedTotal++;
    this.riverHeader.updateExerciseCount(this.exercisesCompletedTotal);

    if (result.isCorrect) {
      this.currentStreak++;
      this.riverHeader.updateStreak(this.currentStreak);
    } else {
      this.currentStreak = 0;
      this.riverHeader.resetStreak();
    }

    // Avanzar al siguiente ejercicio - TDAH: feedback inmediato <1seg
    setTimeout(() => {
      this.nextExercise();
    }, 800); // Reducido de 2000ms a 800ms
  }

  // Mostrar feedback
  showFeedback(message, type) {
    const feedbackEl = document.getElementById('feedback');
    feedbackEl.textContent = message;
    feedbackEl.className = `feedback ${type}`;
    feedbackEl.classList.remove('hidden');
    feedbackEl.classList.add('bounce-in');
  }

  // Siguiente ejercicio
  nextExercise() {
    this.currentExerciseIndex++;

    // Registrar ejercicio completado en BreakManager
    this.breakManager.exerciseCompleted();

    // Verificar si necesita un break (TDAH: cada 3 ejercicios)
    if (this.breakManager.needsBreak()) {
      this.showBreakScreen();
      return;
    }

    if (this.currentExerciseIndex >= this.currentActivity.exercises.length) {
      // Actividad completada
      this.showActivityComplete();
    } else {
      // Siguiente ejercicio
      this.showExercise();
    }
  }

  // Mostrar pantalla de actividad completada
  showActivityComplete() {
    const activity = this.currentActivity;
    const responses = this.activityManager.responses.filter(
      r => r.activityId === activity.id
    );
    const correct = responses.filter(r => r.isCorrect).length;
    const total = responses.length;
    const percentage = ((correct / total) * 100).toFixed(1);

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
              🏠 Menú Principal
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
        // Todas las actividades completadas
        this.showFinalResults();
      }
    });
  }

  // Mostrar resultados finales y permitir descarga
  showFinalResults() {
    this.activityManager.endSession();
    const report = this.activityManager.generateReport();

    this.container.innerHTML = `
      <div class="center-container">
        <div class="card" style="max-width: 700px; text-align: center;">
          <h1 style="font-size: 3rem; margin-bottom: 1rem;">🏆 ¡Felicitaciones!</h1>
          <h2 style="color: var(--accent); margin-bottom: 2rem;">${report.studentName}</h2>
          
          <div style="background: rgba(78, 205, 196, 0.2); padding: 2rem; border-radius: 15px; margin: 2rem 0;">
            <p style="font-size: 1.2rem; margin-bottom: 1rem;">Calificación Final</p>
            <p style="font-size: 5rem; font-family: var(--font-number); color: var(--success); margin: 1rem 0;">
              ${report.grade.value}/10
            </p>
            <p style="font-size: 1.5rem; color: var(--text-accent);">${report.grade.label}</p>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 2rem 0; text-align: center;">
            <div>
              <p style="color: var(--text-secondary); font-size: 0.9rem;">Ejercicios</p>
              <p style="font-size: 2rem; font-family: var(--font-number);">${report.totalExercises}</p>
            </div>
            <div>
              <p style="color: var(--text-secondary); font-size: 0.9rem;">Correctas</p>
              <p style="font-size: 2rem; font-family: var(--font-number); color: var(--success);">${report.correctAnswers}</p>
            </div>
            <div>
              <p style="color: var(--text-secondary); font-size: 0.9rem;">Porcentaje</p>
              <p style="font-size: 2rem; font-family: var(--font-number); color: var(--accent);">${report.percentage}%</p>
            </div>
          </div>
          
          <div style="background: rgba(255, 255, 255, 0.05); padding: 1.5rem; border-radius: 10px; margin: 2rem 0;">
            <p style="margin-bottom: 0.5rem;"><strong>Duración:</strong> ${report.duration}</p>
            <p><strong>Fecha:</strong> ${report.date}</p>
          </div>
          
          <h3 style="margin: 2rem 0 1rem 0; font-size: 1.3rem;">📥 Descargar Resultados</h3>
          
          <div style="display: flex; gap: 1rem; justify-content: center; margin-bottom: 2rem;">
            <button class="btn btn-primary" id="download-txt-btn">
              📄 Descargar TXT
            </button>
            <button class="btn btn-success" id="download-json-btn">
              💾 Descargar JSON
            </button>
          </div>
          
          <button class="btn btn-secondary" id="restart-btn" style="margin-top: 1rem;">
            🔄 Nueva Sesión
          </button>
        </div>
      </div>
    `;

    // Event listeners
    document.getElementById('download-txt-btn').addEventListener('click', () => {
      this.activityManager.exportText();
      this.showFeedback('¡Reporte descargado exitosamente!', 'success');
    });

    document.getElementById('download-json-btn').addEventListener('click', () => {
      this.activityManager.exportJSON();
      this.showFeedback('¡Datos descargados exitosamente!', 'success');
    });

    document.getElementById('restart-btn').addEventListener('click', () => {
      if (confirm('¿Estás seguro de iniciar una nueva sesión? Se perderán los datos actuales.')) {
        this.activityManager.reset();
        this.showWelcomeScreen();
      }
    });
  }

  // Mostrar pantalla de break (TDAH: cada 3 ejercicios)
  showBreakScreen() {
    this.breakManager.startBreak();

    this.container.innerHTML = `
      <div id="break-container" style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 2rem;
      ">
        <!-- El mini-juego se renderizará aquí -->
      </div>
    `;

    // Iniciar mini-juego de penales
    const breakContainer = document.getElementById('break-container');
    const penalesGame = new PenalesGame(breakContainer);
    penalesGame.start();

    // Callback cuando termina el juego
    penalesGame.onComplete(() => {
      this.breakManager.endBreak();
      // Continuar con el siguiente ejercicio
      this.showExercise();
    });
  }
}
