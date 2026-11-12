/**
 * Scene 3 — "The Letter"
 * A deeply personal, handwritten-style letter from Prudhvi to Sravani (Oye).
 * The emotional peak and core of the keepsake.
 */

export class Scene3 {
  constructor() {
    this.container = null;
    this.root = null;
    this.sceneManager = null;
    this.isOpen = false;
    this.timeouts = [];
  }

  mount(parentContainer) {
    this.container = parentContainer;

    this.root = document.createElement('div');
    this.root.className = 'scene-letter';
    this.root.id = 'scene-3';

    this.root.innerHTML = `
      <!-- Ambient Radiant Warmth Layer -->
      <div class="letter-ambient-glow" id="letter-aura" aria-hidden="true"></div>

      <!-- Main Stage Container -->
      <div class="letter-stage-container" id="letter-stage-container">

        <!-- ==============================================
             1. CLOSED ENVELOPE / DISCOVERY STATE
             ============================================== -->
        <div class="letter-closed-stage" id="letter-closed-stage">
          <p class="envelope-prologue">
            There are some things I never really said.<br/>
            <span>Maybe this is the easiest way to say them.</span>
          </p>

          <h1 class="envelope-title">A Letter to Oye</h1>

          <!-- Closed Envelope Artwork -->
          <div class="envelope-art-wrapper" id="envelope-art-btn" role="button" tabindex="0" aria-label="Open the letter">
            <svg class="envelope-art-svg" viewBox="0 0 220 150" fill="none">
              <!-- Envelope Body Background -->
              <rect x="10" y="15" width="200" height="120" rx="10" fill="#181924" stroke="rgba(217,163,104,0.3)" stroke-width="1.2"/>
              
              <!-- Envelope Bottom Flaps -->
              <path d="M 10,135 L 110,75 L 210,135" stroke="rgba(255,255,255,0.08)" stroke-width="1" fill="#141520"/>
              <path d="M 10,15 L 110,75 L 10,135" stroke="rgba(255,255,255,0.06)" stroke-width="1" fill="#161722"/>
              <path d="M 210,15 L 110,75 L 210,135" stroke="rgba(255,255,255,0.06)" stroke-width="1" fill="#161722"/>
              
              <!-- Top Flap Fold -->
              <path d="M 10,15 L 110,80 L 210,15 Z" fill="#1c1d2a" stroke="rgba(217,163,104,0.4)" stroke-width="1.2"/>
              
              <!-- Wax Seal Monogram -->
              <circle class="envelope-seal-pulse" cx="110" cy="80" r="18" fill="#d9a368"/>
              <circle cx="110" cy="80" r="14" stroke="rgba(0,0,0,0.35)" stroke-width="1" fill="none"/>
              <text x="110" y="85" font-family="'Newsreader', serif" font-size="13" font-style="italic" font-weight="600" fill="#121218" text-anchor="middle">Oye</text>
            </svg>
          </div>

          <p class="envelope-cue-text">A letter I should have written sooner.</p>

          <button class="btn-open-letter" id="btn-open-letter" aria-label="Open the letter">
            <svg class="seal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span>Open the letter</span>
          </button>
        </div>

        <!-- ==============================================
             2. OPEN LETTER / PARCHMENT READING STATE
             ============================================== -->
        <div class="letter-open-stage" id="letter-open-stage">
          <article class="letter-parchment-sheet">
            
            <!-- Parchment Header Emblem -->
            <header class="letter-parchment-header">
              <span class="letter-mark-oye">Oye</span>
              
              <!-- Six dots representing the gang of six -->
              <div class="letter-gang-six-dots" title="Prudhvi, Jaya, Mohan, Bhargavi, Pallavi, Sravani" aria-label="The gang of six">
                <span class="gang-dot dot-prudhvi"></span>
                <span class="gang-dot"></span>
                <span class="gang-dot"></span>
                <span class="gang-dot"></span>
                <span class="gang-dot"></span>
                <span class="gang-dot dot-oye"></span>
              </div>

              <span class="letter-date-stamp">13 November</span>
            </header>

            <!-- Salutation -->
            <h1 class="letter-salutation">Dear Oye,</h1>

            <!-- Letter Body Content -->
            <div class="letter-body-content">
              <p>I don't really know how to start this.</p>
              <p>Maybe because there are some things that are easy to remember but surprisingly difficult to say.</p>

              <p>I've known you since we were kids.</p>
              <p>Back then, I don't think either of us knew how many memories those school days would leave behind.</p>

              <p>I still remember joining St. Joseph's in 6th class as the new guy who barely knew anyone.</p>
              <p>I was quiet.</p>
              <p>I was awkward.</p>
              <p>And honestly, talking to people — especially girls — wasn't exactly my strongest skill.</p>

              <p>Then Bhargavi helped me get comfortable with everyone.</p>
              <p>And somehow, the six of us became a little group of our own.</p>

              <div class="letter-gang-roster" aria-label="Our gang">
                <span>Prudhvi.</span>
                <span>Jaya.</span>
                <span>Mohan.</span>
                <span>Bhargavi.</span>
                <span>Pallavi.</span>
                <span>And you.</span>
                <span class="gang-name-highlight">Oye.</span>
              </div>

              <p>I still don't know exactly when you became “Oye”.</p>
              <p>I just know that somewhere along the way, your actual name became something I hardly ever used.</p>
              <p>And somehow, that name felt like it belonged only to our friendship.</p>

              <p>I remember how we used to argue over stupid things.</p>
              <p>I remember getting angry with you in 7th class and not talking to you for two days.</p>
              <p>I remember seeing you cry.</p>
              <p>At the time, I was just angry.</p>
              <p>But somewhere inside that moment, I realised something important.</p>

              <p class="letter-core-highlight">I didn't actually want to lose you as a friend.</p>

              <p>That was probably one of the first times I understood how much a friendship could matter to me.</p>

              <p>And then there were all those normal days.</p>
              <p>The jokes.</p>
              <p>The teasing.</p>
              <p>The random madness.</p>
              <p>The six of us watching movies at Bhargavi's house.</p>
              <p>Nothing extraordinary.</p>
              <p>But somehow, those ordinary days became some of my favourite memories.</p>

              <p>Then life moved on.</p>
              <p>You had your studies.</p>
              <p>Your BiPC days.</p>
              <p>The hostel.</p>
              <p>And that dream of becoming a doctor.</p>
              <p>I had my own B.Tech journey.</p>
              <p>Our lives became different.</p>
              <p>Our conversations slowly became fewer.</p>
              <p>And then, somehow, almost four years passed.</p>

              <p>I don't want to make those years sound like someone's fault.</p>
              <p>They weren't.</p>
              <p>Life changed.</p>
              <p>People changed.</p>
              <p>Circumstances changed.</p>
              <p>And somewhere in between all of that, we just became less present in each other's everyday lives.</p>

              <p>But I would be lying if I said I never missed it.</p>

              <p class="letter-core-highlight">I missed those stupid little questions.</p>

              <div class="letter-messages-callout">
                <span class="letter-message-line">“tinnava?”</span>
                <span class="letter-message-line">“eda unnavu?”</span>
                <span class="letter-message-line">“em chesthunnav Oye?”</span>
                <span class="letter-message-line classic">“tinnava ledha tinkakapothe netho matladanu.”</span>
              </div>

              <p>Back then, they were just normal messages.</p>
              <p>Now, I realise how special those little things were.</p>
              <p>I missed having someone randomly check on me.</p>
              <p>I missed talking without thinking about every word.</p>
              <p>And honestly…</p>

              <p class="letter-core-highlight">I think I also missed the old version of myself.</p>

              <p>The one who could talk to you without becoming shy.</p>
              <p>The one who didn't overthink everything.</p>
              <p>The one who could just be Prudhvi.</p>

              <p>Then I saw you again after all those years.</p>
              <p>At Bhargavi's marriage.</p>
              <p>And somehow, after wanting that moment for so long, I became quiet.</p>
              <p>I wanted to talk.</p>
              <p>I wanted to say so many things.</p>
              <p>But when the moment actually came, I couldn't.</p>
              <p>I don't even know why I became like that.</p>
              <p>Maybe four years is a long time.</p>
              <p>Maybe people grow.</p>
              <p>Maybe old friendships sometimes need time to find their new shape.</p>
              <p>I don't know.</p>

              <p>And I don't want to pretend that everything can magically become exactly how it was before.</p>
              <p>It can't.</p>
              <p>We aren't those school kids anymore.</p>
              <p>We have our own lives now.</p>
              <p>Our own responsibilities.</p>
              <p>Our own dreams.</p>
              <p>And I respect that.</p>

              <p>But there is one thing I want you to know.</p>
              <p>I'm genuinely happy that you were part of my life.</p>
              <p>I'm grateful for every stupid argument, every laugh, every movie at Bhargavi's house, every random conversation, and every little memory that made those years what they were.</p>

              <p>And I am genuinely proud of the dream you are chasing.</p>
              <p>I hope you become the doctor you want to become.</p>
              <p>I hope life gives you everything you work for.</p>
              <p>And whenever life becomes difficult, I hope you have people around you who make it a little easier.</p>

              <p>I don't know what our friendship will look like from here.</p>
              <p>I don't know if we will ever talk exactly like we did when we were younger.</p>

              <p class="letter-core-highlight">And I'm not writing this expecting anything from you.</p>

              <p>I just wanted you to know what has been sitting quietly in my mind for a long time.</p>
              <p>I still care about you.</p>
              <p>I still value our friendship.</p>
              <p>And if someday we get the chance to create a few new memories, I'd genuinely be happy about that.</p>
              <p>Not because we have to bring the past back.</p>
              <p>But because maybe we can create something new from where we are now.</p>

              <p>So, Oye…</p>
              <p>Thank you.</p>
              <p>Thank you for being one of those people who became part of my childhood without either of us knowing how important those days would become.</p>
              <p>Thank you for the memories.</p>
              <p>Thank you for the laughter.</p>
              <p>And thank you for simply being you.</p>

              <p>Whatever happens from here…</p>
              <p>I'm glad I met you.</p>

              <p class="letter-core-highlight">I'm glad you became my Oye.</p>

              <p>And I'll always be grateful that our paths crossed.</p>

              <!-- Closing Sign-off -->
              <div class="letter-sign-off-block">
                <p class="letter-birthday-closing">Happy Birthday, Oye.</p>
                <p>I hope 13 November brings you a little extra happiness.</p>
                <p>And I hope the life ahead of you is even better than the one you dream about today.</p>

                <p class="letter-signature">— Prudhvi</p>
                <span class="letter-dedication">For my Oye.</span>
                <span class="letter-final-greeting">Happy Birthday. <span style="color: #d9a368;">❤️</span></span>
              </div>
            </div>
          </article>

          <!-- Outro Transition to Scene 4: Closing Page -->
          <section class="letter-outro-section revealed" id="letter-outro-section">
            <p class="outro-line">Some stories aren't about going back.</p>
            <p class="outro-line emphasis">They're about being grateful that they happened…</p>
            <p class="outro-line softer">…and being open to whatever comes next.</p>

            <button class="btn-scene4-transition btn-scene9-transition" id="btn-scene4-go" aria-label="One last thing">
              <span>One last thing</span>
              <span class="arrow" aria-hidden="true">→</span>
            </button>
          </section>
        </div>

      </div>
    `;

    this.parentContainer = parentContainer;
    parentContainer.appendChild(this.root);

    this.cacheElements();
    this.bindEvents();
  }

  cacheElements() {
    this.closedStage = this.root.querySelector('#letter-closed-stage');
    this.openStage = this.root.querySelector('#letter-open-stage');
    this.btnOpen = this.root.querySelector('#btn-open-letter');
    this.envelopeBtn = this.root.querySelector('#envelope-art-btn');
    this.btnScene4 = this.root.querySelector('#btn-scene4-go');
    this.aura = this.root.querySelector('#letter-aura');
  }

  bindEvents() {
    const handleOpen = () => this.openLetter();

    if (this.btnOpen) {
      this.btnOpen.addEventListener('click', handleOpen);
    }

    if (this.envelopeBtn) {
      this.envelopeBtn.addEventListener('click', handleOpen);
      this.envelopeBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleOpen();
        }
      });
    }

    if (this.btnScene4) {
      this.btnScene4.addEventListener('click', () => {
        this.transitionToScene4();
      });
    }
  }

  async openLetter() {
    if (this.isOpen) return;
    this.isOpen = true;

    this.announceScreenReader("Opening the letter to Oye.");

    // Fade out closed envelope stage
    if (this.closedStage) {
      this.closedStage.style.opacity = '0';
      this.closedStage.style.transform = 'translateY(-15px)';
      await this.wait(700);
      this.closedStage.classList.add('hidden');
    }

    // Warm up the radiant aura
    if (this.aura) {
      this.aura.classList.add('open-glow');
    }
    if (this.sceneManager) {
      this.sceneManager.emit('scene:warmth', 0.95);
    }

    // Reveal the open letter parchment
    if (this.openStage) {
      this.openStage.classList.add('active');
    }

    // Scroll smoothly to top of the parchment
    this.root.scrollTo({ top: 0, behavior: 'smooth' });

    this.announceScreenReader("Dear Oye, I don't really know how to start this. Maybe because there are some things that are easy to remember but surprisingly difficult to say.");
  }

  async transitionToScene4() {
    this.root.classList.add('exiting');
    this.announceScreenReader("Continuing to one last thing...");

    await this.wait(1000);

    if (this.sceneManager) {
      this.sceneManager.goToScene(4);
    }
  }

  announceScreenReader(message) {
    const srEl = document.getElementById('sr-announcements');
    if (srEl) {
      srEl.textContent = message;
    }
  }

  async enter() {
    this.root.classList.add('active');
    this.isOpen = false;
    if (this.closedStage) {
      this.closedStage.classList.remove('hidden');
      this.closedStage.style.opacity = '1';
      this.closedStage.style.transform = 'translateY(0)';
    }
    if (this.openStage) {
      this.openStage.classList.remove('active');
    }
    if (this.aura) {
      this.aura.classList.remove('open-glow');
    }
    if (this.sceneManager) {
      this.sceneManager.emit('scene:warmth', 0.85);
    }
    this.root.scrollTo({ top: 0 });
    await this.wait(300);
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
