/**
 * ═══════════════════════════════════════════════════════════
 * ⚽ MINI-JUEGO: PENALES DEL MONUMENTAL v3
 * Mecánica: Apuntar + Potencia + Trayectoria + Hinchada
 * Tiros = Respuestas correctas (REWARD SYSTEM)
 * ═══════════════════════════════════════════════════════════
 */

export class PenalesGame {
  constructor(container) {
    this.container = container;
    this.score = 0;
    this.attempts = 0;
    this.maxAttempts = 3; // Default, overridden by setShots()
    this.gameActive = false;

    // Canvas
    this.canvas = null;
    this.ctx = null;
    this.W = 640;
    this.H = 440;

    // Estado
    this.phase = 'aiming'; // aiming | charging | flying | celebrating | result
    this.aimAngle = -Math.PI / 2;
    this.power = 0;
    this.powerDir = 1;
    this.powerSpeed = 1.8;
    this.chargeTime = 0; // frames de carga

    // Pelota
    this.ball = { x: 0, y: 0, vx: 0, vy: 0, radius: 12, spin: 0, trail: [] };
    this.ballStart = { x: 320, y: 380 };

    // Arco (perspectiva)
    this.goal = { x: 110, y: 60, w: 420, h: 170 };

    // Arquero con camiseta River
    this.keeper = {
      x: 320, y: 180, w: 48, h: 72,
      targetX: 320, speed: 0, diving: false, diveDir: 0,
      armAngle: 0
    };

    // Partículas
    this.particles = [];

    // Screenshake
    this.shakeX = 0;
    this.shakeY = 0;
    this.shakeIntensity = 0;

    // Flash
    this.flash = { active: false, color: '', alpha: 0 };

    // Audio
    this.audioCtx = null;

    // Animación
    this.animFrame = null;
    this.frameCount = 0;

    // Escudo River
    this.shieldImg = new Image();
    this.shieldImg.src = '/assets/river/Escudo.png';

    // Mouse/touch refs
    this._handlers = {};
  }

  /** Set number of shots (= correct answers) */
  setShots(n) {
    this.maxAttempts = Math.max(1, Math.min(n, 10));
  }

  start() {
    this.score = 0;
    this.attempts = 0;
    this.gameActive = true;
    this.initAudio();
    this.render();
  }

  // ═══════════════════════════════════════════════════════════
  // AUDIO: Hinchada sintética
  // ═══════════════════════════════════════════════════════════
  initAudio() {
    try {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) { /* silently fail */ }
  }

  playCrowdCheer() {
    if (!this.audioCtx) return;
    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    // Ruido blanco filtrado = "rugido" de hinchada
    const bufferSize = ctx.sampleRate * 1.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 800;
    bandpass.Q.value = 0.5;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.1);
    gain.gain.setValueAtTime(0.35, now + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 1.5);

    noise.connect(bandpass);
    bandpass.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 1.5);

    // Melodía "OLEEEE" (notas cortas alegres)
    const melody = [523, 659, 784, 1047]; // C5 E5 G5 C6
    melody.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g);
      g.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'triangle';
      const t = now + 0.15 + i * 0.12;
      g.gain.setValueAtTime(0.15, t);
      g.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
      osc.start(t);
      osc.stop(t + 0.2);
    });
  }

  playKickSound() {
    if (!this.audioCtx) return;
    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    // "THWACK" sound
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  playChargeLoop() {
    // Pitch-rising tone while charging
    if (!this.audioCtx || this._chargeOsc) return;
    const ctx = this.audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.value = 80;
    gain.gain.value = 0.08;
    osc.start();
    this._chargeOsc = osc;
    this._chargeGain = gain;
  }

  updateChargeSound() {
    if (!this._chargeOsc) return;
    // Pitch sube con la potencia
    this._chargeOsc.frequency.value = 80 + this.power * 5;
    this._chargeGain.gain.value = 0.03 + (this.power / 100) * 0.12;
  }

  stopChargeSound() {
    if (this._chargeOsc) {
      try { this._chargeOsc.stop(); } catch (e) { }
      this._chargeOsc = null;
      this._chargeGain = null;
    }
  }

  playSaveSound() {
    if (!this.audioCtx) return;
    const ctx = this.audioCtx;
    const now = ctx.currentTime;
    // Golpe seco
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.value = 100;
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  playPostSound() {
    if (!this.audioCtx) return;
    const ctx = this.audioCtx;
    const now = ctx.currentTime;
    // "CLANG" metálico
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.3);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    osc.start(now);
    osc.stop(now + 0.3);
  }

  playCrowdBoo() {
    if (!this.audioCtx) return;
    const ctx = this.audioCtx;
    const now = ctx.currentTime;
    // Suspiro decepcionante
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.5);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    osc.start(now);
    osc.stop(now + 0.5);
  }

  // ═══════════════════════════════════════════════════════════
  // RENDER HTML
  // ═══════════════════════════════════════════════════════════
  render() {
    // Generar shot indicators (bolitas)
    let shotsHTML = '';
    for (let i = 0; i < this.maxAttempts; i++) {
      shotsHTML += `<div id="shot-dot-${i}" style="
        width: 28px; height: 28px; border-radius: 50%;
        background: rgba(255,255,255,0.15);
        border: 2px solid rgba(255,255,255,0.3);
        display: flex; align-items: center; justify-content: center;
        font-size: 14px; transition: all 0.3s ease;
      ">⚽</div>`;
    }

    this.container.innerHTML = `
      <div style="text-align: center; padding: 1rem; position: relative;">
        
        <!-- Header con decoración River -->
        <div style="
          display: flex; align-items: center; justify-content: center; gap: 1rem;
          margin-bottom: 0.5rem;
        ">
          <img src="/assets/river/Escudo.png" style="width: 45px; height: 45px; filter: drop-shadow(0 2px 6px rgba(211,47,47,0.4));" alt="River"/>
          <h2 style="
            font-size: 2rem; font-family: var(--font-title);
            background: linear-gradient(135deg, #D32F2F, #B71C1C);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            margin: 0;
          ">
            Penales del Monumental
          </h2>
          <img src="/assets/river/Escudo.png" style="width: 45px; height: 45px; filter: drop-shadow(0 2px 6px rgba(211,47,47,0.4));" alt="River"/>
        </div>

        <p style="font-size: 1rem; color: var(--text-secondary); margin-bottom: 0.8rem;">
          🎯 Apuntá · Cargá potencia · ¡Pateá!
        </p>

        <!-- Canvas -->
        <div style="display: flex; justify-content: center; margin: 0 auto;">
          <canvas id="penales-canvas" width="${this.W}" height="${this.H}" style="
            border-radius: 16px;
            cursor: crosshair;
            box-shadow: 0 4px 30px rgba(211,47,47,0.15), 0 0 60px rgba(0,0,0,0.1);
            max-width: 100%;
            border: 3px solid rgba(211,47,47,0.2);
          "></canvas>
        </div>

        <!-- Shot indicators -->
        <div style="
          display: flex; gap: 10px; justify-content: center;
          margin: 1rem 0 0.5rem;
        ">
          ${shotsHTML}
        </div>

        <!-- Score / Instructions -->
        <div id="pg-instructions" style="
          font-size: 1.2rem; font-weight: 600;
          padding: 0.5rem; min-height: 2rem;
          color: var(--text-primary);
        ">
          🎯 Mové el mouse para apuntar, click para cargar potencia
        </div>

        <!-- Botón continuar (hidden) -->
        <button id="continue-btn" class="btn btn-primary" style="
          display: none; font-size: 1.3rem; margin-top: 1rem;
          padding: 1rem 3rem;
          background: linear-gradient(135deg, #D32F2F, #B71C1C);
          box-shadow: 0 6px 20px rgba(211,47,47,0.3);
        ">
          Seguir Entrenando ⚽→
        </button>

        <!-- Franja diagonal River decorativa -->
        <div style="
          position: absolute; top: 0; right: 0; width: 120px; height: 120px;
          overflow: hidden; pointer-events: none;
        ">
          <div style="
            position: absolute; top: 15px; right: -35px;
            width: 150px; height: 20px;
            background: linear-gradient(90deg, #D32F2F 33%, #FFF 33%, #FFF 66%, #D32F2F 66%);
            transform: rotate(45deg); opacity: 0.15;
          "></div>
        </div>
      </div>
    `;

    this.canvas = document.getElementById('penales-canvas');
    this.ctx = this.canvas.getContext('2d');

    this.setupEvents();
    this.resetShot();
    this.gameLoop();
  }

  // ═══════════════════════════════════════════════════════════
  // EVENTS
  // ═══════════════════════════════════════════════════════════
  setupEvents() {
    this.cleanupEvents();

    this._handlers.move = (e) => {
      if (this.phase !== 'aiming' && this.phase !== 'charging') return;
      const rect = this.canvas.getBoundingClientRect();
      const sx = this.W / rect.width;
      const sy = this.H / rect.height;
      const mx = (e.clientX - rect.left) * sx;
      const my = (e.clientY - rect.top) * sy;

      const dx = mx - this.ballStart.x;
      const dy = my - this.ballStart.y;
      let angle = Math.atan2(dy, dx);

      // Limitar rango: solo hacia el arco (arriba)
      const min = -Math.PI + 0.25;
      const max = -0.25;
      angle = Math.max(min, Math.min(max, angle));
      this.aimAngle = angle;
    };

    this._handlers.down = (e) => {
      e.preventDefault();
      if (this.phase === 'aiming') {
        this.phase = 'charging';
        this.power = 0;
        this.powerDir = 1;
        this.chargeTime = 0;
        this.playChargeLoop();
        this.updateInstructions('💪 ¡Cargando! Soltá para patear...');
      }
    };

    this._handlers.up = (e) => {
      e.preventDefault();
      if (this.phase === 'charging') {
        this.stopChargeSound();
        this.kick();
      }
    };

    // Touch
    this._handlers.touchstart = (e) => {
      e.preventDefault();
      const t = e.touches[0];
      // Simular move para actualizar ángulo
      const ev = { clientX: t.clientX, clientY: t.clientY };
      this._handlers.move(ev);
      this._handlers.down(e);
    };

    this._handlers.touchmove = (e) => {
      e.preventDefault();
      const t = e.touches[0];
      this._handlers.move({ clientX: t.clientX, clientY: t.clientY });
    };

    this._handlers.touchend = (e) => {
      e.preventDefault();
      this._handlers.up(e);
    };

    this.canvas.addEventListener('mousemove', this._handlers.move);
    this.canvas.addEventListener('mousedown', this._handlers.down);
    this.canvas.addEventListener('mouseup', this._handlers.up);
    this.canvas.addEventListener('touchstart', this._handlers.touchstart, { passive: false });
    this.canvas.addEventListener('touchmove', this._handlers.touchmove, { passive: false });
    this.canvas.addEventListener('touchend', this._handlers.touchend, { passive: false });
  }

  cleanupEvents() {
    if (!this.canvas) return;
    for (const [evt, fn] of Object.entries(this._handlers)) {
      const evName = evt === 'down' ? 'mousedown' : evt === 'up' ? 'mouseup' : evt === 'move' ? 'mousemove' : evt;
      this.canvas.removeEventListener(evName, fn);
    }
    this._handlers = {};
  }

  // ═══════════════════════════════════════════════════════════
  // GAME LOGIC
  // ═══════════════════════════════════════════════════════════
  resetShot() {
    this.phase = 'aiming';
    this.power = 0;
    this.chargeTime = 0;
    this.ball.x = this.ballStart.x;
    this.ball.y = this.ballStart.y;
    this.ball.vx = 0;
    this.ball.vy = 0;
    this.ball.spin = 0;
    this.ball.trail = [];
    this.keeper.x = this.goal.x + this.goal.w / 2;
    this.keeper.targetX = this.keeper.x;
    this.keeper.diving = false;
    this.keeper.diveDir = 0;
    this.keeper.armAngle = 0;
    this.particles = [];
    this.shakeIntensity = 0;
    this.flash = { active: false, color: '', alpha: 0 };
    this.updateInstructions('🎯 Apuntá y hacé click para cargar potencia');
  }

  kick() {
    this.phase = 'flying';
    this.attempts++;

    // Sonido de patada
    this.playKickSound();

    // Velocidad: range 8-14 basado en potencia
    const speed = 8 + (this.power / 100) * 6;
    this.ball.vx = Math.cos(this.aimAngle) * speed;
    this.ball.vy = Math.sin(this.aimAngle) * speed;

    // Agregar spin sutil basado en poder (efecto)
    this.ball.spin = (this.power > 70 ? 1 : -1) * (this.power / 100) * 0.3;

    // Partículas de patada
    this.spawnParticles(this.ballStart.x, this.ballStart.y, 15, '#4CAF50', 3);

    // Arquero reacciona
    const ballEndX = this.ballStart.x + this.ball.vx * 25;
    const goalCenter = this.goal.x + this.goal.w / 2;

    // IA del arquero: 40% chance de adivinar el lado correcto
    const guessCorrect = Math.random() < 0.4;
    if (guessCorrect) {
      this.keeper.targetX = ballEndX;
    } else {
      // Tirarse al otro lado
      if (ballEndX > goalCenter) {
        this.keeper.targetX = this.goal.x + this.goal.w * 0.2;
      } else {
        this.keeper.targetX = this.goal.x + this.goal.w * 0.8;
      }
    }

    this.keeper.diving = true;
    this.keeper.speed = 4 + Math.random() * 2;
    this.keeper.diveDir = this.keeper.targetX > this.keeper.x ? 1 : -1;

    this.updateInstructions('⚽ ¡Ahí va!');
  }

  updateInstructions(text) {
    const el = document.getElementById('pg-instructions');
    if (el) el.textContent = text;
  }

  // ═══════════════════════════════════════════════════════════
  // PARTICLES
  // ═══════════════════════════════════════════════════════════
  spawnParticles(x, y, count, color, sizeBase) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 4;
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.015 + Math.random() * 0.02,
        size: sizeBase + Math.random() * 3,
        color
      });
    }
  }

  spawnConfetti(x, y) {
    const colors = ['#D32F2F', '#FFFFFF', '#FFD700', '#4CAF50', '#2196F3'];
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        life: 1,
        decay: 0.008 + Math.random() * 0.008,
        size: 3 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        isConfetti: true
      });
    }
  }

  // ═══════════════════════════════════════════════════════════
  // UPDATE
  // ═══════════════════════════════════════════════════════════
  gameLoop() {
    if (!this.gameActive) return;
    this.frameCount++;
    this.update();
    this.draw();
    this.animFrame = requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    // CHARGE: barra oscilante + efectos en pelota
    if (this.phase === 'charging') {
      this.power += this.powerDir * this.powerSpeed;
      this.chargeTime++;
      if (this.power >= 100) { this.power = 100; this.powerDir = -1; }
      else if (this.power <= 0) { this.power = 0; this.powerDir = 1; }

      this.updateChargeSound();

      // Partículas de energía alrededor de la pelota
      if (this.chargeTime % 3 === 0 && this.power > 20) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 20 + Math.random() * 15;
        const pColor = this.power > 70 ? '#F44336' : this.power > 40 ? '#FF9800' : '#4CAF50';
        this.particles.push({
          x: this.ballStart.x + Math.cos(angle) * dist,
          y: this.ballStart.y + Math.sin(angle) * dist,
          vx: Math.cos(angle + Math.PI) * 0.8,
          vy: Math.sin(angle + Math.PI) * 0.8,
          life: 1,
          decay: 0.04,
          size: 2 + (this.power / 100) * 4,
          color: pColor
        });
      }

      // Screen shake sutil con potencia alta
      if (this.power > 75) {
        this.shakeIntensity = (this.power - 75) / 25 * 2;
      }
    }

    // FLYING
    if (this.phase === 'flying') {
      // Guardar trail
      this.ball.trail.push({ x: this.ball.x, y: this.ball.y });
      if (this.ball.trail.length > 12) this.ball.trail.shift();

      // Mover pelota
      this.ball.x += this.ball.vx;
      this.ball.y += this.ball.vy;
      this.ball.vy += 0.12; // gravedad
      this.ball.vx += this.ball.spin; // efecto lateral

      // Perspectiva: pelota se achica al alejarse
      const progressY = 1 - Math.max(0, (this.ball.y - this.goal.y) / (this.ballStart.y - this.goal.y));
      this.ball.radius = 12 - progressY * 4; // 12 → 8
      if (this.ball.radius < 5) this.ball.radius = 5;

      // Mover arquero
      if (this.keeper.diving) {
        const kd = this.keeper.targetX - this.keeper.x;
        if (Math.abs(kd) > 2) {
          this.keeper.x += Math.sign(kd) * this.keeper.speed;
          this.keeper.armAngle = this.keeper.diveDir * 0.6; // brazos extendidos
        }
      }

      // Check: pelota en zona de gol
      if (this.ball.y <= this.goal.y + this.goal.h) {
        this.checkGoal();
      }

      // Pelota fuera
      if (this.ball.y < -30 || this.ball.x < -30 || this.ball.x > this.W + 30 || this.ball.y > this.H + 30) {
        this.shotResult(false, '❌ ¡Afuera!', 'miss');
      }
    }

    // CELEBRATING (post-gol animation timer)
    if (this.phase === 'celebrating') {
      this.celebrateTimer--;
      if (this.celebrateTimer <= 0) {
        this.afterResult();
      }
    }

    // Update partículas
    this.particles = this.particles.filter(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.isConfetti) p.vy += 0.1; // gravedad en confetti
      p.life -= p.decay;
      return p.life > 0;
    });

    // Screen shake decay
    if (this.shakeIntensity > 0 && this.phase !== 'charging') {
      this.shakeIntensity *= 0.9;
      if (this.shakeIntensity < 0.1) this.shakeIntensity = 0;
    }
    this.shakeX = (Math.random() - 0.5) * this.shakeIntensity * 2;
    this.shakeY = (Math.random() - 0.5) * this.shakeIntensity * 2;

    // Flash decay
    if (this.flash.active) {
      this.flash.alpha *= 0.94;
      if (this.flash.alpha < 0.01) this.flash.active = false;
    }
  }

  checkGoal() {
    const b = this.ball;
    const g = this.goal;
    const k = this.keeper;

    // Dentro del arco?
    if (b.x >= g.x + 10 && b.x <= g.x + g.w - 10 && b.y >= g.y) {
      // Rango del arquero
      const keeperReach = k.diving ? k.w * 0.8 : k.w * 0.5;
      const keeperLeft = k.x - keeperReach;
      const keeperRight = k.x + keeperReach;

      if (b.x >= keeperLeft && b.x <= keeperRight && Math.abs(b.y - k.y) < k.h) {
        this.shotResult(false, '🧤 ¡Atajadón de Armani!', 'save');
      } else {
        this.score++;
        this.shotResult(true, '⚽ ¡GOOOOOL! ¡DALE RIVER!', 'goal');
      }
    } else if (b.y <= g.y + g.h) {
      // Palo?
      const nearLeftPost = Math.abs(b.x - g.x) < 12;
      const nearRightPost = Math.abs(b.x - (g.x + g.w)) < 12;
      const nearCrossbar = b.y <= g.y + 8 && b.x > g.x && b.x < g.x + g.w;

      if (nearLeftPost || nearRightPost || nearCrossbar) {
        this.shotResult(false, '🥅 ¡Al palo! ¡Qué cerca!', 'post');
      }
    }
  }

  shotResult(isGoal, message, type) {
    this.phase = 'celebrating';
    this.celebrateTimer = isGoal ? 90 : 60; // frames

    this.updateInstructions(message);

    // Update shot dot
    const dot = document.getElementById(`shot-dot-${this.attempts - 1}`);
    if (dot) {
      dot.style.background = isGoal ? '#4CAF50' : '#F44336';
      dot.style.borderColor = isGoal ? '#4CAF50' : '#F44336';
      dot.innerHTML = isGoal ? '⚽' : '✗';
      dot.style.transform = 'scale(1.3)';
      setTimeout(() => dot.style.transform = 'scale(1)', 300);
    }

    // Efectos según tipo
    if (type === 'goal') {
      this.playCrowdCheer();
      this.spawnConfetti(this.ball.x, this.ball.y);
      this.shakeIntensity = 8;
      this.flash = { active: true, color: '#4CAF50', alpha: 0.4 };
    } else if (type === 'save') {
      this.playSaveSound();
      this.playCrowdBoo();
      this.spawnParticles(this.keeper.x, this.keeper.y, 10, '#FFA726', 3);
      this.flash = { active: true, color: '#FF9800', alpha: 0.3 };
    } else if (type === 'post') {
      this.playPostSound();
      this.shakeIntensity = 5;
      this.spawnParticles(this.ball.x, this.ball.y, 12, '#FFD700', 2);
      this.flash = { active: true, color: '#FFD700', alpha: 0.3 };
    } else {
      this.playCrowdBoo();
    }
  }

  afterResult() {
    if (this.attempts >= this.maxAttempts) {
      this.endGame();
    } else {
      this.resetShot();
    }
  }

  // ═══════════════════════════════════════════════════════════
  // DRAW
  // ═══════════════════════════════════════════════════════════
  draw() {
    const ctx = this.ctx;
    const W = this.W;
    const H = this.H;

    ctx.save();
    ctx.translate(this.shakeX, this.shakeY);

    // ═══ CANCHA ═══
    const grassGrad = ctx.createLinearGradient(0, 0, 0, H);
    grassGrad.addColorStop(0, '#1B5E20');
    grassGrad.addColorStop(0.4, '#2E7D32');
    grassGrad.addColorStop(1, '#388E3C');
    ctx.fillStyle = grassGrad;
    ctx.fillRect(0, 0, W, H);

    // Franjas de pasto
    ctx.fillStyle = 'rgba(76, 175, 80, 0.12)';
    for (let i = 0; i < H; i += 30) {
      if (i % 60 === 0) ctx.fillRect(0, i, W, 30);
    }

    // ═══ ARCO con perspectiva ═══
    const g = this.goal;

    // Red de fondo
    ctx.fillStyle = 'rgba(200, 200, 200, 0.06)';
    ctx.fillRect(g.x, g.y, g.w, g.h);

    // Patrón de red
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 0.5;
    for (let x = g.x; x <= g.x + g.w; x += 12) {
      ctx.beginPath(); ctx.moveTo(x, g.y); ctx.lineTo(x, g.y + g.h); ctx.stroke();
    }
    for (let y = g.y; y <= g.y + g.h; y += 12) {
      ctx.beginPath(); ctx.moveTo(g.x, y); ctx.lineTo(g.x + g.w, y); ctx.stroke();
    }

    // Palos y travesaño (con sombra)
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 8;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 7;
    ctx.strokeRect(g.x, g.y, g.w, g.h);
    ctx.shadowBlur = 0;

    // ═══ FLASH ═══
    if (this.flash.active) {
      ctx.fillStyle = this.flash.color + Math.floor(this.flash.alpha * 255).toString(16).padStart(2, '0');
      ctx.fillRect(0, 0, W, H);
    }

    // ═══ ÁREA ═══
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    ctx.strokeRect(60, g.y - 10, W - 120, g.h + 210);

    // Media luna
    ctx.beginPath();
    ctx.arc(W / 2, g.y + g.h + 200, 60, Math.PI, 0, true);
    ctx.stroke();

    // Punto penal
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(this.ballStart.x, this.ballStart.y, 4, 0, Math.PI * 2);
    ctx.fill();

    // ═══ ARQUERO con camiseta River ═══
    this.drawKeeper(ctx);

    // ═══ LÍNEA DE APUNTADO ═══
    if (this.phase === 'aiming' || this.phase === 'charging') {
      this.drawAimLine(ctx);
    }

    // ═══ BARRA DE POTENCIA ═══
    if (this.phase === 'charging') {
      this.drawPowerBar(ctx);
    }

    // ═══ TRAIL ═══
    if (this.ball.trail.length > 1) {
      for (let i = 0; i < this.ball.trail.length - 1; i++) {
        const t = this.ball.trail[i];
        const alpha = (i / this.ball.trail.length) * 0.5;
        const size = (i / this.ball.trail.length) * this.ball.radius;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(t.x, t.y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // ═══ PELOTA ═══
    this.drawBall(ctx);

    // ═══ PARTÍCULAS ═══
    this.particles.forEach(p => {
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      if (p.isConfetti) {
        // Confetti rectangular rotado
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.x * 0.05 + this.frameCount * 0.1);
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.globalAlpha = 1;

    ctx.restore();
  }

  drawKeeper(ctx) {
    const k = this.keeper;
    const cx = k.x;
    const cy = k.y;

    ctx.save();
    ctx.translate(cx, cy);

    // Diving angle
    if (k.diving) {
      ctx.rotate(k.diveDir * 0.3);
    }

    // ── PIERNAS (shorts oscuros) ──
    ctx.fillStyle = '#1A1A1A';
    ctx.fillRect(-12, 18, 10, 22);
    ctx.fillRect(2, 18, 10, 22);

    // ── CUERPO / CAMISETA RIVER ──
    // Fondo blanco
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(-k.w / 2, -k.h / 2 + 10, k.w, k.h * 0.55, 4);
    ctx.fill();

    // Franja diagonal roja de River
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(-k.w / 2, -k.h / 2 + 10, k.w, k.h * 0.55, 4);
    ctx.clip();

    ctx.fillStyle = '#D32F2F';
    ctx.beginPath();
    ctx.moveTo(-k.w / 2 - 5, -k.h / 2 + 10);
    ctx.lineTo(k.w / 2 + 5, -k.h / 2 + 10 + k.h * 0.55);
    ctx.lineTo(k.w / 2 + 5, -k.h / 2 + 10 + k.h * 0.55 - 14);
    ctx.lineTo(-k.w / 2 - 5, -k.h / 2 + 24);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // ── BRAZOS + GUANTES ──
    const armY = -k.h / 2 + 20;

    // Brazo izquierdo
    ctx.save();
    ctx.translate(-k.w / 2, armY);
    ctx.rotate(-0.3 - k.armAngle);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(-18, -4, 18, 8);
    // Guante
    ctx.fillStyle = '#FFA726';
    ctx.beginPath();
    ctx.arc(-20, 0, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Brazo derecho
    ctx.save();
    ctx.translate(k.w / 2, armY);
    ctx.rotate(0.3 + k.armAngle);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, -4, 18, 8);
    // Guante
    ctx.fillStyle = '#FFA726';
    ctx.beginPath();
    ctx.arc(20, 0, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // ── CABEZA ──
    ctx.fillStyle = '#FFCC80';
    ctx.beginPath();
    ctx.arc(0, -k.h / 2, 13, 0, Math.PI * 2);
    ctx.fill();

    // Pelo
    ctx.fillStyle = '#5D4037';
    ctx.beginPath();
    ctx.arc(0, -k.h / 2 - 3, 13, Math.PI, 0);
    ctx.fill();

    // Ojos
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(-4, -k.h / 2 - 1, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(4, -k.h / 2 - 1, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  drawAimLine(ctx) {
    const lineLen = 60 + (this.power / 100) * 80;
    const endX = this.ballStart.x + Math.cos(this.aimAngle) * lineLen;
    const endY = this.ballStart.y + Math.sin(this.aimAngle) * lineLen;

    // Línea de mira: dots progresivos (más satisfactorios)
    const steps = 10;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = this.ballStart.x + (endX - this.ballStart.x) * t;
      const y = this.ballStart.y + (endY - this.ballStart.y) * t;
      const dotSize = 2 + t * 3;
      const alpha = 0.3 + t * 0.5;

      if (this.phase === 'charging') {
        const hue = 120 - this.power * 1.2;
        ctx.fillStyle = `hsla(${hue}, 80%, 55%, ${alpha})`;
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      }

      ctx.beginPath();
      ctx.arc(x, y, dotSize, 0, Math.PI * 2);
      ctx.fill();
    }

    // Target circle al final
    ctx.strokeStyle = this.phase === 'charging'
      ? `hsl(${120 - this.power * 1.2}, 80%, 55%)`
      : 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(endX, endY, 12, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Crosshair
    ctx.beginPath();
    ctx.moveTo(endX - 8, endY);
    ctx.lineTo(endX + 8, endY);
    ctx.moveTo(endX, endY - 8);
    ctx.lineTo(endX, endY + 8);
    ctx.stroke();
  }

  drawPowerBar(ctx) {
    const barX = 18;
    const barY = 80;
    const barW = 24;
    const barH = 280;

    // Sombra
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.beginPath();
    ctx.roundRect(barX - 3, barY - 3, barW + 6, barH + 6, 8);
    ctx.fill();

    // Fondo
    ctx.fillStyle = 'rgba(30, 30, 30, 0.9)';
    ctx.beginPath();
    ctx.roundRect(barX, barY, barW, barH, 6);
    ctx.fill();

    // Fill con gradiente
    const fillH = (this.power / 100) * barH;
    const grad = ctx.createLinearGradient(barX, barY + barH, barX, barY);
    grad.addColorStop(0, '#4CAF50');
    grad.addColorStop(0.4, '#FFC107');
    grad.addColorStop(0.7, '#FF9800');
    grad.addColorStop(1, '#F44336');
    ctx.fillStyle = grad;

    ctx.beginPath();
    ctx.roundRect(barX + 2, barY + barH - fillH + 2, barW - 4, fillH - 2, 4);
    ctx.fill();

    // Glow en la parte superior del fill
    if (this.power > 30) {
      const glowColor = this.power > 70 ? '#F44336' : this.power > 40 ? '#FF9800' : '#4CAF50';
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 12;
      ctx.fillStyle = glowColor;
      ctx.beginPath();
      ctx.arc(barX + barW / 2, barY + barH - fillH + 4, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Indicador triangular
    ctx.fillStyle = '#FFFFFF';
    const indY = barY + barH - fillH;
    ctx.beginPath();
    ctx.moveTo(barX + barW + 4, indY - 6);
    ctx.lineTo(barX + barW + 14, indY);
    ctx.lineTo(barX + barW + 4, indY + 6);
    ctx.closePath();
    ctx.fill();

    // Porcentaje
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${Math.round(this.power)}%`, barX + barW / 2, barY - 8);

    // Zona marcas "sweet spot"
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1;
    [25, 50, 75].forEach(pct => {
      const y = barY + barH - (pct / 100) * barH;
      ctx.beginPath();
      ctx.moveTo(barX, y);
      ctx.lineTo(barX + barW, y);
      ctx.stroke();
    });
  }

  drawBall(ctx) {
    const b = this.ball;

    // Sombra
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.beginPath();
    ctx.ellipse(b.x + 3, b.y + 4, b.radius, b.radius * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Glow cuando carga
    if (this.phase === 'charging' && this.power > 20) {
      const hue = 120 - this.power * 1.2;
      const glowSize = b.radius + 6 + Math.sin(this.frameCount * 0.15) * 3;
      ctx.shadowColor = `hsl(${hue}, 80%, 55%)`;
      ctx.shadowBlur = 15 + (this.power / 100) * 15;
      ctx.fillStyle = `hsla(${hue}, 80%, 55%, 0.15)`;
      ctx.beginPath();
      ctx.arc(b.x, b.y, glowSize, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Pelota base
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctx.fill();

    // Borde
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Pentágonos de la pelota (rotación)
    const rot = this.phase === 'flying' ? this.frameCount * 0.2 : 0;
    ctx.fillStyle = '#333';
    for (let i = 0; i < 5; i++) {
      const a = rot + (i * Math.PI * 2) / 5;
      const px = b.x + Math.cos(a) * b.radius * 0.5;
      const py = b.y + Math.sin(a) * b.radius * 0.5;
      ctx.beginPath();
      ctx.arc(px, py, b.radius * 0.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Pulsar cuando se carga
    if (this.phase === 'charging') {
      const pulse = 1 + Math.sin(this.chargeTime * 0.12) * 0.08 * (this.power / 100);
      // ya dibujado arriba, el glow hace el efecto
    }
  }

  // ═══════════════════════════════════════════════════════════
  // END GAME
  // ═══════════════════════════════════════════════════════════
  endGame() {
    this.gameActive = false;
    this.stopChargeSound();
    if (this.animFrame) cancelAnimationFrame(this.animFrame);

    const message = this.maxAttempts === 0
      ? '¡No tuviste tiros esta vez! 😅 ¡Respondé más preguntas bien!'
      : this.score >= this.maxAttempts
        ? '¡TODOS ADENTRO! 🏆 ¡Crack!'
        : this.score >= this.maxAttempts * 0.6
          ? '¡Golazo! 👏 ¡Buen promedio!'
          : this.score >= 1
            ? '¡Bien ahí! 💪 ¡Seguí practicando!'
            : '¡Armani fue el mejor hoy! 🧤';

    this.updateInstructions(message);

    // Pantalla final sobre el canvas
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(0, 0, this.W, this.H);

    // Escudo River
    if (this.shieldImg.complete) {
      ctx.drawImage(this.shieldImg, this.W / 2 - 30, this.H / 2 - 90, 60, 60);
    }

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 32px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${this.score}/${this.maxAttempts} Goles`, this.W / 2, this.H / 2 + 5);

    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#BBBBBB';

    // Cortar mensaje si es muy largo
    const maxLen = 40;
    const displayMsg = message.length > maxLen ? message.substring(0, maxLen) + '...' : message;
    ctx.fillText(displayMsg, this.W / 2, this.H / 2 + 40);

    // Franja River decorativa en el overlay
    ctx.fillStyle = 'rgba(211, 47, 47, 0.3)';
    ctx.save();
    ctx.translate(this.W / 2, this.H / 2);
    ctx.rotate(-0.15);
    ctx.fillRect(-this.W, -6, this.W * 2, 12);
    ctx.restore();

    const continueBtn = document.getElementById('continue-btn');
    if (continueBtn) {
      continueBtn.style.display = 'inline-block';
    }
  }

  onComplete(callback) {
    const check = () => {
      const btn = document.getElementById('continue-btn');
      if (btn) {
        btn.addEventListener('click', () => {
          this.cleanupEvents();
          this.stopChargeSound();
          callback();
        });
      } else {
        setTimeout(check, 100);
      }
    };
    check();
  }
}
