import ClientEngine from 'lance-gg/src/ClientEngine';
import MobileControls from './MobileControls';
import KeyboardControls from './KeyboardControls';
import GvBRenderer from './GvBRenderer';

export default class GvBClientEngine extends ClientEngine {
  constructor(gameEngine, options) {
    super(gameEngine, options, GvBRenderer);

    this.gameEngine.on('client__preStep', this.preStep, this);
  }

  step(t, dt, physicsOnly) {
    super.step(t, dt, physicsOnly);
  }

  start() {
    super.start();

    if (this.renderer.isReady) {
      this.onRendererReady();
    } else {
      this.renderer.once('ready', this.onRendererReady, this);
    }

    this.gameEngine.on('objectAdded', (obj) => {
      if (obj.constructor.name === 'Battlefield') {
        this.gameEngine.battlefield = obj;
      }
    });

    this.networkMonitor.on('RTTUpdate', (e) => {
      this.renderer.updateHUD(e);
    });
  }

  // extend ClientEngine connect to add own events
  connect() {
    return super.connect().then(() => {
      this.socket.on('disconnect', () => {
        document.body.classList.add('disconnected');
        document.body.classList.remove('gameActive');
      });

      this.socket.on('metaDataUpdate', (e) => {
        this.gameEngine.metaData = e;
        this.renderer.onMetaDataUpdate();
      });
    });
  }

  onRendererReady() {
    this.connect();

    // Game input
    // eslint-disable-next-line no-undef
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
      this.controls = new MobileControls(this.renderer);
      this.renderer.enableFullScreen();
    } else {
      this.controls = new KeyboardControls(this.renderer);
    }
  }

  // our pre-step is to process inputs that are "currently pressed" during the game step
  preStep() {
    if (this.controls) {
      if (this.controls.activeInput.up) {
        this.sendInput('up', { movement: true });
      }

      if (this.controls.activeInput.left) {
        this.sendInput('left', { movement: true });
      }

      if (this.controls.activeInput.right) {
        this.sendInput('right', { movement: true });
      }

      if (this.controls.activeInput.down) {
        this.sendInput('down', { movement: true });
      }
    }
  }
}
