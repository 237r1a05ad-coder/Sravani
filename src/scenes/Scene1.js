/**
 * Scene 1 — "The Door"
 * Initial quiet, mysterious date-entry screen.
 * Validates date of birth: 13 / 11 / 2005.
 * On success, transitions smoothly to Scene 2 ("Yes, I know it's you").
 */

export class Scene1 {
  constructor() {
    this.container = null;
    this.root = null;
    this.sceneManager = null;
    this.timeouts = [];
    this.isUnlocked = false;

    // Target DOB constants
    this.CORRECT_DD = '13';
    this.CORRECT_MM = '11';
    this.CORRECT_YYYY = '2005';
  }

  mount(parentContainer) {
    this.container = parentContainer;

    this.root = document.createElement('div');
    this.root.className = 'scene-door';
    this.root.id = 'scene-1';

    this.root.innerHTML = `
      <!-- Opening Text Reveal Sequence -->
      <div class="intro-sequence" id="intro-sequence" aria-live="polite">
        <div class="intro-line intro-line-oye" id="intro-line-oye">Oye.</div>
        <div class="intro-line intro-line-step2" id="intro-line-step2">Before you go any further...</div>
        <div class="intro-line intro-line-step3" id="intro-line-step3">There's one little thing I need to know.</div>
      </div>

      <!-- Date of Birth Interaction Container -->
      <div class="dob-wrapper" id="dob-wrapper">
        <h2 class="dob-title" id="dob-prompt">When is your birthday?</h2>

        <div class="date-input-slate" id="date-slate" role="group" aria-label="Enter date of birth">
          <input
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            maxlength="2"
            class="date-input date-input-dd"
            id="input-dd"
            placeholder="DD"
            aria-label="Day, two digits"
            autocomplete="off"
            spellcheck="false"
          />

          <span class="date-divider" aria-hidden="true">/</span>

          <input
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            maxlength="2"
            class="date-input date-input-mm"
            id="input-mm"
            placeholder="MM"
            aria-label="Month, two digits"
            autocomplete="off"
            spellcheck="false"
          />

          <span class="date-divider" aria-hidden="true">/</span>

          <input
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            maxlength="4"
            class="date-input date-input-yyyy"
            id="input-yyyy"
            placeholder="YYYY"
            aria-label="Year, four digits"
            autocomplete="off"
            spellcheck="false"
          />

          <!-- Action Button -->
          <button class="submit-btn" id="submit-btn" aria-label="Unlock story" disabled>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <div class="date-hint">Press Enter ↵ to continue</div>

        <!-- Feedback for Wrong Entry -->
        <div class="feedback-area" id="feedback-area" aria-live="polite">
          <p class="feedback-line feedback-line-incorrect-1" id="feedback-line-1">Hmm... I don't think that's quite right.</p>
          <p class="feedback-line feedback-line-incorrect-2" id="feedback-line-2">Try again, Oye.</p>
        </div>
      </div>
    `;

    this.parentContainer = parentContainer;
    parentContainer.appendChild(this.root);

    this.cacheElements();
    this.bindEvents();
  }

  cacheElements() {
    this.introSeq = this.root.querySelector('#intro-sequence');
    this.lineOye = this.root.querySelector('#intro-line-oye');
    this.lineStep2 = this.root.querySelector('#intro-line-step2');
    this.lineStep3 = this.root.querySelector('#intro-line-step3');

    this.dobWrapper = this.root.querySelector('#dob-wrapper');
    this.dateSlate = this.root.querySelector('#date-slate');
    this.inputDD = this.root.querySelector('#input-dd');
    this.inputMM = this.root.querySelector('#input-mm');
    this.inputYYYY = this.root.querySelector('#input-yyyy');
    this.submitBtn = this.root.querySelector('#submit-btn');

    this.feedbackArea = this.root.querySelector('#feedback-area');
    this.feedbackLine1 = this.root.querySelector('#feedback-line-1');
    this.feedbackLine2 = this.root.querySelector('#feedback-line-2');
  }

  bindEvents() {
    const inputs = [this.inputDD, this.inputMM, this.inputYYYY];

    inputs.forEach((input, index) => {
      // Only permit numbers
      input.addEventListener('input', (e) => {
        input.value = input.value.replace(/[^0-9]/g, '');
        this.clearFeedback();
        this.updateButtonState();

        // Auto-advance to next input when field filled
        if (input === this.inputDD && input.value.length === 2) {
          this.inputMM.focus();
        } else if (input === this.inputMM && input.value.length === 2) {
          this.inputYYYY.focus();
        } else if (input === this.inputYYYY && input.value.length === 4) {
          this.validateDOB();
        }
      });

      // Backspace navigation
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
          inputs[index - 1].focus();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          this.validateDOB();
        }
      });

      // Clear feedback on focus
      input.addEventListener('focus', () => {
        this.clearFeedback();
      });
    });

    this.submitBtn.addEventListener('click', () => {
      this.validateDOB();
    });
  }

  updateButtonState() {
    const isReady =
      this.inputDD.value.length === 2 &&
      this.inputMM.value.length === 2 &&
      this.inputYYYY.value.length === 4;

    this.submitBtn.disabled = !isReady;
    this.submitBtn.classList.toggle('ready', isReady);
  }

  async validateDOB() {
    if (this.isUnlocked) return;

    const dd = this.inputDD.value.trim().padStart(2, '0');
    const mm = this.inputMM.value.trim().padStart(2, '0');
    const yyyy = this.inputYYYY.value.trim();

    if (dd.length < 2 || mm.length < 2 || yyyy.length < 4) {
      return;
    }

    if (dd === this.CORRECT_DD && mm === this.CORRECT_MM && yyyy === this.CORRECT_YYYY) {
      this.handleCorrectDOB();
    } else {
      this.handleIncorrectDOB();
    }
  }

  async handleCorrectDOB() {
    this.isUnlocked = true;
    this.clearFeedback();

    // Disable inputs
    this.inputDD.disabled = true;
    this.inputMM.disabled = true;
    this.inputYYYY.disabled = true;
    this.submitBtn.disabled = true;

    // Room warmth glow expands
    if (this.sceneManager) {
      this.sceneManager.emit('scene:warmth', 0.85);
    }

    // Fade out DOB wrapper smoothly
    this.dobWrapper.classList.add('exiting');
    await this.wait(800);

    // Transition smoothly to Scene 2: "Yes, I know it's you"
    if (this.sceneManager) {
      this.sceneManager.goToScene(2);
    }
  }

  handleIncorrectDOB() {
    this.dateSlate.classList.add('shake');
    this.feedbackLine1.classList.add('revealed');
    this.feedbackLine2.classList.add('revealed');

    this.wait(550).then(() => {
      this.dateSlate.classList.remove('shake');
    });

    this.inputDD.focus();
    this.inputDD.select();
  }

  clearFeedback() {
    this.feedbackLine1.classList.remove('revealed');
    this.feedbackLine2.classList.remove('revealed');
  }

  async enter() {
    this.root.classList.add('active');
    this.isUnlocked = false;

    if (this.sceneManager) {
      this.sceneManager.emit('scene:warmth', 0.25);
    }

    // Paced opening reveal
    await this.wait(400);
    this.lineOye.classList.add('revealed');

    await this.wait(1200);
    this.lineStep2.classList.add('revealed');

    await this.wait(1400);
    this.lineStep3.classList.add('revealed');

    await this.wait(1600);
    this.introSeq.classList.add('settled');

    await this.wait(600);
    this.dobWrapper.classList.add('active');

    // Auto-focus day input
    this.inputDD.focus();
  }

  async exit() {
    if (!this.root) return;
    this.root.style.opacity = '0';
    this.root.style.transform = 'translateY(-20px)';
    await this.wait(1000);
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
