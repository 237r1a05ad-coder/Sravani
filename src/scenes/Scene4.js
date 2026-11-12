/**
 * Scene 4 — Closing Page
 * The final, heartfelt closing moment of the keepsake.
 * Preserves the final card, signature, and warm closing wish.
 */

export class Scene4 {
  constructor() {
    this.container = null;
    this.root = null;
    this.sceneManager = null;
    this.timeouts = [];
  }

  mount(parentContainer) {
    this.container = parentContainer;

    this.root = document.createElement('div');
    this.root.className = 'scene-finale';
    this.root.id = 'scene-4';

    this.root.innerHTML = `
      <!-- Radiant Golden Celebration Halo -->
      <div class="finale-ambient-glow climax-glow" id="finale-aura" aria-hidden="true"></div>

      <!-- Main Narrative Container -->
      <div class="finale-narrative-container" id="finale-narrative-container">

        <!-- Final Signature & Closing Stage -->
        <div class="final-signature-stage" id="final-stage">
          
          <!-- Keepsake Message Card -->
          <div class="final-clean-card" id="b5-card">
            <h2 class="final-card-heading">Happy Birthday, Oye.</h2>
            <p class="final-card-sentiment">With all the memories, all the laughter, and a little hope for the future…</p>
            <span class="final-author-signature">— Prudhvi</span>
          </div>

          <!-- Closing Sentiments -->
          <div class="final-closing-lines-block">
            <p class="final-closing-line" id="b5-line-1">I'm glad I met you.</p>
          </div>

          <!-- Climax Banner -->
          <h1 class="final-climax-banner" id="b5-climax">
            Now go make this birthday yours. <span class="heart">❤️</span>
          </h1>

          <!-- Replay Button -->
          <div class="replay-container" id="b5-replay">
            <button class="btn-replay-story" id="btn-replay-story" aria-label="Replay our story from the beginning">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 4v6h6"/>
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
              </svg>
              <span>Replay our story</span>
            </button>
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
    this.card = this.root.querySelector('#b5-card');
    this.line1 = this.root.querySelector('#b5-line-1');
    this.line2 = this.root.querySelector('#b5-line-2');
    this.climax = this.root.querySelector('#b5-climax');
    this.replay = this.root.querySelector('#b5-replay');
    this.btnReplay = this.root.querySelector('#btn-replay-story');
    this.aura = this.root.querySelector('#finale-aura');
  }

  bindEvents() {
    if (this.btnReplay) {
      this.btnReplay.addEventListener('click', () => {
        this.replayStory();
      });
    }
  }

  async enter() {
    this.root.classList.add('active');

    if (this.sceneManager) {
      this.sceneManager.emit('scene:warmth', 1.0);
    }

    // Paced entrance sequence for the final closing screen
    await this.wait(300);
    if (this.card) this.card.classList.add('revealed');

    await this.wait(600);
    if (this.line1) this.line1.classList.add('revealed');

    await this.wait(500);
    if (this.line2) this.line2.classList.add('revealed');

    await this.wait(700);
    if (this.climax) this.climax.classList.add('revealed');
    this.announceScreenReader("Now go make this birthday yours.");

    await this.wait(800);
    if (this.replay) this.replay.classList.add('revealed');
  }

  async replayStory() {
    this.root.classList.add('exiting');
    this.announceScreenReader("Restarting our story from the beginning...");

    await this.wait(800);

    if (this.sceneManager) {
      this.sceneManager.goToScene(1);
    }
  }

  announceScreenReader(message) {
    const srEl = document.getElementById('sr-announcements');
    if (srEl) {
      srEl.textContent = message;
    }
  }

  async exit() {
    if (!this.root) return;
    this.root.style.opacity = '0';
    this.root.style.transform = 'translateY(-20px)';
    await this.wait(800);
  }

  destroy() {
    this.timeouts.forEach(t => clearTimeout(t));
    this.timeouts = [];
    if (this.root && this.root.parentNode) {
      this.root.parentNode.removeChild(this.root);
    }
  }

  wait(ms) {
    return new Promise(resolve => {
      const timeoutId = setTimeout(resolve, ms);
      this.timeouts.push(timeoutId);
    });
  }
}
