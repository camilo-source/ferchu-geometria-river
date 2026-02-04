/**
 * ═══════════════════════════════════════════════════════════
 * 🔴⚪ HEADER RIVER PLATE - Componente de Branding
 * Muestra el escudo de River y el título de la academia
 * ═══════════════════════════════════════════════════════════
 */

export class RiverHeader {
  constructor() {
    this.headerElement = null;
  }

  // Renderizar header completo
  render() {
    return `
      <div class="river-header" style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 2rem;
        background: linear-gradient(135deg, #FFFFFF 0%, rgba(211, 47, 47, 0.05) 100%);
        border-bottom: 3px solid var(--primary);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      ">
        <!-- Logo y Título -->
        <div class="header-brand" style="
          display: flex;
          align-items: center;
          gap: 1rem;
        ">
          <!-- Escudo River (enseñando ángulos) -->
          <img 
            src="/assets/river/Escudo.png" 
            alt="Escudo River Plate"
            style="
              width: 60px;
              height: 60px;
              object-fit: contain;
              filter: drop-shadow(0 2px 6px rgba(211, 47, 47, 0.3));
            "
          />
          
          <!-- Título -->
          <div>
            <h1 style="
              margin: 0;
              font-size: 1.5rem;
              font-weight: 700;
              color: var(--primary);
              line-height: 1.2;
            ">
              Academia de Arqueros River
            </h1>
            <p style="
              margin: 0;
              font-size: 0.9rem;
              color: var(--text-secondary);
              font-weight: 500;
            ">
              Entrenamiento de Geometría con Franco Armani
            </p>
          </div>
        </div>

        <!-- Estadísticas (opcional) -->
        <div class="header-stats" style="
          display: flex;
          gap: 1rem;
          align-items: center;
        ">
          <!-- Contador de ejercicios completados -->
          <div class="stat-badge" style="
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(46, 125, 50, 0.1);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            border: 2px solid var(--secondary);
          ">
            <span style="font-size: 1.2rem;">⚽</span>
            <div>
              <div style="
                font-size: 0.7rem;
                color: var(--text-secondary);
                font-weight: 600;
              ">EJERCICIOS</div>
              <div id="exercise-count" style="
                font-size: 1.1rem;
                color: var(--secondary);
                font-weight: 700;
              ">0</div>
            </div>
          </div>

          <!-- Racha actual -->
          <div class="stat-badge" style="
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(211, 47, 47, 0.1);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            border: 2px solid var(--primary);
          ">
            <span style="font-size: 1.2rem;">🔥</span>
            <div>
              <div style="
                font-size: 0.7rem;
                color: var(--text-secondary);
                font-weight: 600;
              ">RACHA</div>
              <div id="streak-count" style="
                font-size: 1.1rem;
                color: var(--primary);
                font-weight: 700;
              ">0</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Renderizar versión compacta (para pantallas pequeñas)
  renderCompact() {
    return `
      <div class="river-header-compact" style="
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        background: linear-gradient(90deg, #D32F2F 0%, #C62828 100%);
      ">
       <div style="display: flex; align-items: center; gap: 1rem;">
        <img src="/assets/river/Escudo.png" alt="River Plate" style="height: 50px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));">
        <h1 style="
          margin: 0;
          font-size: 1.2rem;
          font-weight: 700;
          color: white;
        ">
          Academia River
        </h1>
      </div>
    `;
  }

  // Actualizar contador de ejercicios
  updateExerciseCount(count) {
    const element = document.getElementById('exercise-count');
    if (element) {
      element.textContent = count;

      // Animación de incremento
      element.style.transform = 'scale(1.3)';
      element.style.color = 'var(--success)';

      setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.color = 'var(--secondary)';
      }, 300);
    }
  }

  // Actualizar racha
  updateStreak(count) {
    const element = document.getElementById('streak-count');
    if (element) {
      element.textContent = count;

      // Animación de racha
      if (count > 0) {
        element.style.transform = 'scale(1.3)';
        element.style.color = '#FF6F00';

        setTimeout(() => {
          element.style.transform = 'scale(1)';
          element.style.color = 'var(--primary)';
        }, 300);
      }
    }
  }

  // Reiniciar racha (cuando falla)
  resetStreak() {
    const element = document.getElementById('streak-count');
    if (element) {
      element.textContent = '0';
      element.style.color = 'var(--text-secondary)';
    }
  }
}
