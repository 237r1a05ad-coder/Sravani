/**
 * AmbientBackground
 * Renders a delicate, cinematic atmosphere with floating dust motes
 * and subtle light responsiveness. Transitions into warm amber tones.
 */
export class AmbientBackground {
  constructor(canvasElement, glowElement) {
    this.canvas = canvasElement;
    this.glow = glowElement;
    this.ctx = this.canvas.getContext('2d');

    this.particles = [];
    this.particleCount = 42;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.targetWarmth = 0;
    this.currentWarmth = 0;

    this.mouse = {
      x: this.width * 0.5,
      y: this.height * 0.5,
      targetX: this.width * 0.5,
      targetY: this.height * 0.5
    };

    this.isRunning = false;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.start();
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.scale(dpr, dpr);
  }

  createParticles() {
    this.particles = [];
    const count = this.reducedMotion ? 18 : this.particleCount;

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 1.5 + 0.4,
        baseAlpha: Math.random() * 0.35 + 0.08,
        alpha: 0,
        speedX: (Math.random() - 0.5) * 0.18,
        speedY: (Math.random() - 0.5) * 0.15 - 0.05,
        phase: Math.random() * Math.PI * 2,
        frequency: Math.random() * 0.015 + 0.005
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    window.addEventListener('pointermove', (e) => {
      this.mouse.targetX = e.clientX;
      this.mouse.targetY = e.clientY;
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stop();
      } else {
        this.start();
      }
    });
  }

  setWarmth(level) {
    this.targetWarmth = Math.max(0, Math.min(1, level));
    if (this.glow) {
      if (level > 0.5) {
        this.glow.classList.add('warmth-active');
      } else {
        this.glow.classList.remove('warmth-active');
      }
    }
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.render = this.render.bind(this);
    requestAnimationFrame(this.render);
  }

  stop() {
    this.isRunning = false;
  }

  render(timestamp) {
    if (!this.isRunning) return;

    // Smoothly ease mouse coordinates
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.04;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.04;

    // Smooth warmth transition
    this.currentWarmth += (this.targetWarmth - this.currentWarmth) * 0.02;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Dynamic color interpolation
    // Mystery cool twilight (RGB: 190, 200, 220) -> Golden ember warmth (RGB: 235, 185, 120)
    const r = Math.round(190 + (235 - 190) * this.currentWarmth);
    const g = Math.round(200 + (185 - 200) * this.currentWarmth);
    const b = Math.round(220 + (120 - 220) * this.currentWarmth);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      if (!this.reducedMotion) {
        p.phase += p.frequency;
        p.x += p.speedX;
        p.y += p.speedY;

        // Subtle mouse repulsion/drift
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const force = (1 - dist / 180) * 0.12;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        // Screen boundary wrap
        if (p.x < -10) p.x = this.width + 10;
        if (p.x > this.width + 10) p.x = -10;
        if (p.y < -10) p.y = this.height + 10;
        if (p.y > this.height + 10) p.y = -10;
      }

      // Breathing shimmer opacity
      const shimmer = Math.sin(p.phase) * 0.25 + 0.75;
      const alpha = p.baseAlpha * shimmer * (1 + this.currentWarmth * 0.4);

      this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size * (1 + this.currentWarmth * 0.25), 0, Math.PI * 2);
      this.ctx.fill();
    }

    requestAnimationFrame(this.render);
  }
}

