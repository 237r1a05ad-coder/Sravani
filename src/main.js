/**
 * Main Application Entry Point
 * Orchestrates Ambient Environment, SceneManager, and the streamlined 4-page keepsake:
 * Page 1: The Door (Date Verification)
 * Page 2: "Yes, I know it's you" (Recognition & Welcome)
 * Page 3: The Letter (Complete Heartfelt Letter to Oye)
 * Page 4: One Last Thing (Closing Celebration, Doctor Dream & Replay)
 */

import { AmbientBackground } from './components/AmbientBackground.js';
import { SceneManager } from './core/SceneManager.js';
import { Scene1 } from './scenes/Scene1.js';
import { Scene2 } from './scenes/Scene2.js';
import { Scene3 } from './scenes/Scene3.js';
import { Scene4 } from './scenes/Scene4.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Atmospheric Canvas & Ambient Lighting
  const canvas = document.getElementById('ambient-canvas');
  const glow = document.getElementById('ambient-glow');
  const ambientBg = new AmbientBackground(canvas, glow);

  // 2. Initialize Core Scene Manager
  const container = document.getElementById('scene-container');
  const sceneManager = new SceneManager(container);
  window.sceneManager = sceneManager; // Dev convenience for direct testing

  // 3. Connect Atmosphere to Scene Events
  sceneManager.on('scene:warmth', (level) => {
    ambientBg.setWarmth(level);
  });

  // 4. Register the 4 Clean Keepsake Scenes
  const scene1 = new Scene1();
  sceneManager.register(1, scene1);

  const scene2 = new Scene2();
  sceneManager.register(2, scene2);

  const scene3 = new Scene3();
  sceneManager.register(3, scene3);

  const scene4 = new Scene4();
  sceneManager.register(4, scene4);

  // 5. Begin Experience at Scene 1
  sceneManager.goToScene(1);
});
