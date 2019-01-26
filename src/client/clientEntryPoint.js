import GvBClientEngine from './GvBClientEngine';
import GvBGameEngine from '../common/GvBGameEngine';

const options = {
  delayInputCount: 3,
  scheduler: 'render-schedule',
  syncOptions: {
    sync: 'extrapolate',
    localObjBending: 0.6,
    remoteObjBending: 0.8,
    bendingIncrements: 6,
  },
  autoConnect: false, // ????
};

const gameEngine = new GvBGameEngine(options);
const clientEngine = new GvBClientEngine(gameEngine, options);

// eslint-disable-next-line no-undef
document.addEventListener('DOMContentLoaded', () => clientEngine.start());
