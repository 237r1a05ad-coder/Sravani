/**
 * SceneManager
 * Modular state controller for managing multi-scene progression (Scenes 1 through 9).
 * Preserves Scene 1 completely while allowing subsequent scenes to be attached cleanly.
 */
export class SceneManager {
  constructor(containerElement) {
    this.container = containerElement;
    this.scenes = new Map();
    this.currentSceneId = null;
    this.isTransitioning = false;
    this.listeners = new Map();
  }

  /**
   * Register a scene implementation.
   * @param {number|string} id - Scene identifier (e.g. 1, 2, 3...)
   * @param {Object} sceneInstance - Must implement mount(), enter(), exit(), and optionally destroy()
   */
  register(id, sceneInstance) {
    sceneInstance.sceneManager = this;
    this.scenes.set(id, sceneInstance);
    return this;
  }

  /**
   * Navigate to a target scene with smooth cinematic handoff.
   * @param {number|string} targetId
   * @param {Object} [data] - Optional payload passed to the scene
   */
  async goToScene(targetId, data = {}) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    this.emit('scene:before-change', { from: this.currentSceneId, to: targetId });

    // Exit active scene if one exists
    if (this.currentSceneId && this.scenes.has(this.currentSceneId)) {
      const activeScene = this.scenes.get(this.currentSceneId);
      if (typeof activeScene.exit === 'function') {
        await activeScene.exit();
      }
    }

    // Check if the target scene is registered
    if (this.scenes.has(targetId)) {
      const nextScene = this.scenes.get(targetId);
      this.currentSceneId = targetId;
      
      // Clean container and mount new scene
      this.container.innerHTML = '';
      if (typeof nextScene.mount === 'function') {
        nextScene.mount(this.container);
      }
      if (typeof nextScene.enter === 'function') {
        await nextScene.enter(data);
      }

      this.emit('scene:changed', { sceneId: targetId });
    } else {
      // If next scene has not been built yet (e.g. Scenes 2-9)
      // Keep the transition state cleanly active without throwing errors.
      this.emit('scene:standby', { targetId, data });
    }

    this.isTransitioning = false;
  }

  /**
   * Event emitter helpers
   */
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
    return () => this.off(event, callback);
  }

  off(event, callback) {
    if (!this.listeners.has(event)) return;
    const filtered = this.listeners.get(event).filter(cb => cb !== callback);
    this.listeners.set(event, filtered);
  }

  emit(event, payload) {
    if (!this.listeners.has(event)) return;
    this.listeners.get(event).forEach(cb => {
      try {
        cb(payload);
      } catch (err) {
        console.error(`Error in event handler for ${event}:`, err);
      }
    });
  }
}

