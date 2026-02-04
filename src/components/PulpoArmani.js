/**
 * ═══════════════════════════════════════════════════════════
 * 🐙 EL PULPO ARMANI - Componente de Personaje Guía
 * Mascota y guía para Ferchu en su entrenamiento
 * ═══════════════════════════════════════════════════════════
 */

export class PulpoArmani {
    constructor() {
        this.frases = {
            bienvenida: [
                "¡Hola Ferchu! Soy Armani, tu DT de geometría 🐙",
                "¿Listo para entrenar como en River? ¡Dale!",
                "Vamos a aprender geometría jugando al fútbol ⚽"
            ],
            correcto: [
                "¡Atajadón de respuesta! ✓",
                "¡Bien ahí, Ferchu! Sos un crack",
                "¡Golazo de conocimiento! 🎯",
                "Así se entrena en River, campeón",
                "¡Perfecto! Con esos cálculos cubrís todo el arco 🐙",
                "¡Imparable! Como en la Libertadores",
                "¡Seguí así y llegás lejos, pibe!"
            ],
            error: [
                "Tranquilo, todos nos equivocamos",
                "Intentá de nuevo, no pasa nada",
                "Dale otra oportunidad, vos podés",
                "Hasta en la final me equivoqué. Lo importante es aprender",
                "Mirá bien y probá de nuevo 👀"
            ],
            motivacion: [
                "Vamos Ferchu, concentrate",
                "Tomá tu tiempo, pensalo bien",
                "Así entrenamos en River, con calma",
                "Tranquilo, enfocate en el ejercicio",
                "Dale que sos River, mostrale de qué estás hecho"
            ],
            completado: [
                "¡Completaste la actividad! 🏆",
                "¡Excelente entrenamiento, Ferchu!",
                "Así se hace, campeón. Seguí así",
                "¡Qué nivel! Seguís mejorando cada día"
            ],
            break: [
                "Descansá un minuto, lo merecés",
                "Hagamos un break, como en el entrenamiento",
                "Momento de relajar. ¡A jugar un penal!"
            ]
        };

        this.estado = 'idle'; // idle, happy, thinking, celebrate
    }

    // Obtener frase random de una categoría
    getFrase(categoria) {
        const frases = this.frases[categoria] || this.frases.motivacion;
        return frases[Math.floor(Math.random() * frases.length)];
    }

    // Renderizar el personaje con una frase
    render(frase = '', estado = 'idle') {
        this.estado = estado;

        const emojis = {
            idle: '🐙',
            happy: '🎉',
            thinking: '🤔',
            celebrate: '🏆'
        };

        return `
      <div class="pulpo-armani-container" style="
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 15px;
        margin: 1rem 0;
        backdrop-filter: blur(10px);
      ">
        <!-- Imagen del Pulpo -->
        <div class="pulpo-image" style="
          width: 100px;
          height: 100px;
          flex-shrink: 0;
        ">
          <img 
            src="/assets/images/armani/pulpo-armani.png" 
            alt="Pulpo Armani"
            style="
              width: 100%;
              height: 100%;
              object-fit: contain;
              filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
            "
          />
        </div>

        <!-- Bocadillo de diálogo -->
        <div class="pulpo-speech" style="
          flex: 1;
          background: var(--bg-card);
          padding: 1rem 1.5rem;
          border-radius: 12px;
          position: relative;
          border: 2px solid var(--primary-light);
          box-shadow: var(--shadow-card);
        ">
          <!-- Flecha del bocadillo -->
          <div style="
            position: absolute;
            left: -10px;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            border-right: 10px solid var(--primary-light);
          "></div>

          <!-- Emoji de estado -->
          <div style="
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
          ">
            ${emojis[estado]}
          </div>

          <!-- Texto -->
          <p style="
            margin: 0;
            font-size: 1.1rem;
            color: var(--text-primary);
            font-weight: 500;
            line-height: 1.4;
          ">
            ${frase}
          </p>

          <!-- Firma -->
          <p style="
            margin: 0.5rem 0 0 0;
            font-size: 0.85rem;
            color: var(--text-secondary);
            font-style: italic;
            text-align: right;
          ">
            — Franco Armani, DT de Geometría
          </p>
        </div>
      </div>
    `;
    }

    // Versión compacta (solo emoji y frase corta)
    renderCompact(frase = '') {
        return `
      <div class="pulpo-compact" style="
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: rgba(211, 47, 47, 0.2);
        border-radius: 20px;
        border: 1px solid var(--primary-light);
      ">
        <span style="font-size: 1.5rem;">🐙</span>
        <span style="
          font-size: 0.95rem;
          color: var(--text-primary);
          font-weight: 600;
        ">${frase}</span>
      </div>
    `;
    }

    // Versión para header (sin bocadillo)
    renderHeader() {
        return `
      <div class="pulpo-header" style="
        display: flex;
        align-items: center;
        gap: 0.75rem;
      ">
        <img 
          src="/assets/images/armani/pulpo-armani.png" 
          alt="Pulpo Armani"
          style="
            width: 50px;
            height: 50px;
            object-fit: contain;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
          "
        />
        <div>
          <div style="
            font-size: 1rem;
            font-weight: 700;
            color: var(--primary);
          ">
            El Pulpo Armani
          </div>
          <div style="
            font-size: 0.75rem;
            color: var(--text-secondary);
          ">
            Tu DT de Geometría
          </div>
        </div>
      </div>
    `;
    }
}
