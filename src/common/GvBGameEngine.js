import GameEngine from 'lance-gg/src/GameEngine';
import CannonPhysicsEngine from 'lance-gg/src/physics/CannonPhysicsEngine';
import ThreeVector from 'lance-gg/src/serialize/ThreeVector';
import Player from './Player';

export default class GvBGameEngine extends GameEngine {
  constructor(options) {
    super(options);

    this.physicsEngine = new CannonPhysicsEngine({ gameEngine: this });

    this.metadata = {
      teams: {
        green: {
          players: [],
          score: 0,
        },
        blue: {
          players: [],
          score: 0,
        },
      },
    };

    this.on('server__init', this.gameInit.bind(this));
  }

  gameInit() {}

  step(isReenact, t, dt, physicsOnly) {
    super.step(isReenact, t, dt, physicsOnly);

    this.world.forEachObject((id, o) => {
      // do stuff
    });
  }

  registerClasses(serializer) {
    // serializer.registerClass(Player); ?
  }

  makePlayer(playerId, team) {
    // check if there is already a player object for this player
    // if not, make it and spawn it somewhere
    const existing = this.world.queryObject({ playerId });
    if (existing) {
      return existing;
    }

    const position = new ThreeVector(0, 10, 0);
    const player = new Player(this, position);
    player.playerId = playerId;
    player.setTeam(team);
    this.addObjectToWorld(player);

    return player;
  }

  moveBorderLine() {} // TODO: probably

  processInput(inputData, playerId) {
    super.processInput(inputData, playerId);
    // check for player object
    // if exists, handle movement mechanics
    // might not be needed, since player has no accelerate/turn mechanic?
  }
}
