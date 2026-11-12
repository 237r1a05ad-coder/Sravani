/**
 * Scene 2 — "Yes, I know it's you"
 * Warm, intimate recognition screen after DOB verification.
 * Confirms Oye's identity and invites her to read the private letter.
 */

export class Scene2 {
  constructor() {
    this.container = null;
    this.root = null;
    this.sceneManager = null;
    this.timeouts = [];
    this.keyHandler = null;
    this.isExiting = false;
  }

  mount(parentContainer) {
    this.container = parentContainer;

    this.root = document.createElement('div');
    this.root.className = 'scene-recognition';
    this.root.id = 'scene-2';

    this.root.innerHTML = `
      <!-- Ambient Golden Glow -->
      <div class="recognition-aura" id="recognition-aura" aria-hidden="true"></div>

      <!-- Main Content Stage -->
      <div class="recognition-stage" id="recognition-stage">
        
        <!-- Opening Confirmation Pacing -->
        <div class="recognition-pacing" id="recognition-pacing" aria-live="polite">
          <p class="pacing-line pacing-yep" id="pacing-yep">Yep.</p>
          <p class="pacing-line pacing-knew" id="pacing-knew">I knew you'd remember.</p>
        </div>

        <!-- Recognition Card -->
        <div class="recognition-card" id="recognition-card">
          <div class="recognition-date-badge" id="recognition-date">
            <span class="sparkle-icon" aria-hidden="true">✦</span>
            <span>13 · 11 · 2005</span>
            <span class="sparkle-icon" aria-hidden="true">✦</span>
          </div>

          <h1 class="recognition-title" id="recognition-title">
            Yes, I know it's you.
          </h1>

          <div class="recognition-greeting" id="recognition-greeting">
            Welcome, <span class="highlight-oye">Oye.</span>
          </div>

          <div class="recognition-divider" aria-hidden="true">
            <span class="divider-line"></span>
            <span class="divider-dot"></span>
            <span class="divider-line"></span>
          </div>

          <div class="recognition-body" id="recognition-body">
            <p class="recognition-body-line">I made this quiet little corner just for you.</p>
            <p class="recognition-body-line">No crowds. No noise. Just a story that started between six kids a long time ago.</p>
            <p class="recognition-body-line highlight">There are things I never really said out loud. Maybe this is the easiest way to say them.</p>
          </div>

          <div class="recognition-action-area" id="recognition-action">
            <button class="btn-read-letter" id="btn-read-letter" aria-label="Read your letter">
              <span class="btn-text">Read your letter</span>
              <span class="btn-arrow" aria-hidden="true">→</span>
            </button>
            <div class="btn-keyboard-hint">Press Enter ↵</div>
          </div>
        </div>

      </div>
    `;

    this.parentContainer = parentContainer;
    parentContainer.appendChild(this.root);

    this.cacheElements();
    this.bindEvents();
  }

  cacheElements() {
    this.stage = this.root.querySelector('#recognition-stage');
    this.pacing = this.root.querySelector('#recognition-pacing');
    this.lineYep = this.root.querySelector('#pacing-yep');
    this.lineKnew = this.root.querySelector('#pacing-knew');
    this.card = this.root.querySelector('#recognition-card');
    this.btnRead = this.root.querySelector('#btn-read-letter');
  }

  bindEvents() {
    if (this.btnRead) {
      this.btnRead.addEventListener('click', () => this.handleProceed());
    }

    this.keyHandler = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.handleProceed();
      }
    };
    window.addEventListener('keydown', this.keyHandler);
  }

  enter() {
    if (this.sceneManager) {
      this.sceneManager.emit('scene:warmth', 0.85);
    }

    // Paced cinematic entrance animation sequence
    this.timeouts.push(setTimeout(() => {
      if (this.lineYep) this.lineYep.classList.add('visible');
    }, 250));

    this.timeouts.push(setTimeout(() => {
      if (this.lineKnew) this.lineKnew.classList.add('visible');
    }, 850));

    this.timeouts.push(setTimeout(() => {
      if (this.card) this.card.classList.add('visible');
    }, 1500));

    this.timeouts.push(setTimeout(() => {
      if (this.btnRead) this.btnRead.focus();
    }, 2100));
  }

  handleProceed() {
    if (this.isExiting) return;
    this.isExiting = true;

    if (this.root) {
      this.root.classList.add('exiting');
    }

    this.timeouts.push(setTimeout(() => {
      if (this.sceneManager) {
        this.sceneManager.goToScene(3);
      }
    }, 600));
  }

  exit() {
    if (this.keyHandler) {
      window.removeEventListener('keydown', this.keyHandler);
      this.keyHandler = null;
    }

    this.timeouts.forEach(t => clearTimeout(t));
    this.timeouts = [];

    if (this.root && this.root.parentNode) {
      this.root.parentNode.removeChild(this.root);
    }
  }
}
