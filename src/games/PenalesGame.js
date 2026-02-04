/**
 * ═══════════════════════════════════════════════════════════
 * ⚽ MINI-JUEGO: PENALES DEL MONUMENTAL
 * Break activo de 60 segundos - TDAH friendly
 * ═══════════════════════════════════════════════════════════
 */

export class PenalesGame {
    constructor(container) {
        this.container = container;
        this.score = 0;
        this.attempts = 0;
        this.maxAttempts = 3;
        this.gameActive = false;
    }

    // Iniciar el juego
    start() {
        this.score = 0;
        this.attempts = 0;
        this.gameActive = true;
        this.render();
    }

    // Renderizar UI del juego
    render() {
        this.container.innerHTML = `
      <div style="text-align: center; padding: 2rem;">
        <h2 style="font-size: 2rem; margin-bottom: 1rem; font-family: var(--font-title);">
          ⚽ Penales del Monumental
        </h2>
        
        <p style="font-size: 1.2rem; color: var(--text-secondary); margin-bottom: 2rem;">
          ¡Descansá un minuto! Pateá 3 penales
        </p>

        <!-- Arco visual simple -->
        <div id="goal-area" style="
          position: relative;
          width: 400px;
          height: 250px;
          margin: 2rem auto;
          background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%);
          border: 4px solid var(--primary-light);
          border-radius: 10px;
          cursor: pointer;
        ">
          <!-- Arquero Armani -->
          <div id="goalkeeper" style="
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 3rem;
            transition: all 0.3s ease;
          ">
            🧤
          </div>

          <!-- Zonas del arco (invisible) -->
          <div class="goal-zone" data-zone="left" style="
            position: absolute;
            left: 0;
            top: 0;
            width: 33.33%;
            height: 100%;
            cursor: pointer;
          "></div>
          <div class="goal-zone" data-zone="center" style="
            position: absolute;
            left: 33.33%;
            top: 0;
            width: 33.33%;
            height: 100%;
            cursor: pointer;
          "></div>
          <div class="goal-zone" data-zone="right" style="
            position: absolute;
            left: 66.66%;
            top: 0;
            width: 33.33%;
            height: 100%;
            cursor: pointer;
          "></div>
        </div>

        <!-- Pelota -->
        <div id="ball" style="
          font-size: 2rem;
          margin: 1rem auto;
        ">
          ⚽
        </div>

        <!-- Score -->
        <div style="
          display: flex;
          gap: 2rem;
          justify-content: center;
          margin: 2rem 0;
          font-size: 1.3rem;
        ">
          <div>
            ⚽ Goles: <strong id="score">${this.score}</strong>
          </div>
          <div>
            🎯 Intentos: <strong id="attempts">${this.attempts}</strong>/${this.maxAttempts}
          </div>
        </div>

        <!-- Botón continuar (hidden inicialmente) -->
        <button id="continue-btn" class="btn btn-primary" style="display: none; font-size: 1.2rem;">
          Seguir Entrenando →
        </button>
      </div>
    `;

        // Event listeners
        document.querySelectorAll('.goal-zone').forEach(zone => {
            zone.addEventListener('click', (e) => this.shoot(e.target.dataset.zone));
        });
    }

    // Patear penal
    shoot(zone) {
        if (this.attempts >= this.maxAttempts || !this.gameActive) return;

        this.attempts++;

        // Animación de la pelota
        const ball = document.getElementById('ball');
        ball.style.transition = 'all 0.5s ease';
        ball.style.transform = 'translateY(-100px) scale(0.5)';

        // Movimiento del arquero (random)
        const goalkeeper = document.getElementById('goalkeeper');
        const arqueroSaves = Math.random() < 0.4; // 40% de atajadas

        if (arqueroSaves) {
            const direction = zone === 'left' ? '-100px' : zone === 'right' ? '100px' : '0';
            goalkeeper.style.transform = `translateX(calc(-50% + ${direction}))`;

            setTimeout(() => {
                this.showResult(false);
            }, 500);
        } else {
            setTimeout(() => {
                this.showResult(true);
                this.score++;
            }, 500);
        }

        // Resetear después de la animación
        setTimeout(() => {
            ball.style.transition = 'none';
            ball.style.transform = '';
            goalkeeper.style.transform = 'translateX(-50%)';

            // Actualizar UI
            document.getElementById('score').textContent = this.score;
            document.getElementById('attempts').textContent = this.attempts;

            // Si terminó el juego
            if (this.attempts >= this.maxAttempts) {
                this.endGame();
            }
        }, 1000);
    }

    // Mostrar resultado del tiro
    showResult(isGoal) {
        const goalArea = document.getElementById('goal-area');

        if (isGoal) {
            goalArea.style.background = 'linear-gradient(180deg, rgba(56, 142, 60, 0.3) 0%, transparent 100%)';
            this.playSound('goal');
        } else {
            goalArea.style.background = 'linear-gradient(180deg, rgba(229, 115, 115, 0.3) 0%, transparent 100%)';
            this.playSound('save');
        }

        setTimeout(() => {
            goalArea.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)';
        }, 500);
    }

    // Finalizar juego
    endGame() {
        this.gameActive = false;

        const message = this.score === 3
            ? '¡PERFECTO! 🏆 Los convertiste todos'
            : this.score >= 2
                ? '¡Muy bien! 👏 Buen promedio'
                : '¡Bien ahí! 💪 Seguí practicando';

        setTimeout(() => {
            const container = document.querySelector('#goal-area');
            if (container) {
                container.innerHTML = `
                  <div style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                  ">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">
                      ${this.score === 3 ? '🏆' : this.score >= 2 ? '⭐' : '💪'}
                    </div>
                    <div style="font-size: 1.3rem; font-weight: 600;">
                      ${message}
                    </div>
                    <div style="font-size: 2rem; margin-top: 1rem; font-family: var(--font-number);">
                      ${this.score}/${this.maxAttempts} Goles
                    </div>
                  </div>
                `;
            }

            // Mostrar botón para continuar
            const continueBtn = document.getElementById('continue-btn');
            if (continueBtn) {
                continueBtn.style.display = 'inline-block';
            }
        }, 500);
    }

    // Simular sonidos (placeholder)
    playSound(type) {
        // TODO: Agregar sonidos reales en FASE 3
        console.log(`🔊 Sonido: ${type}`);
    }

    // Obtener callback para continuar
    onComplete(callback) {
        const btn = document.getElementById('continue-btn');
        if (btn) {
            btn.addEventListener('click', callback);
        }
    }
}
