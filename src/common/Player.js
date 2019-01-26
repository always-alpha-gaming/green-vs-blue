import PhysicalObject3D from 'lance-gg/src/serialize/PhysicalObject3D';

export default class Player extends PhysicalObject3D {
  constructor(gameEngine, position) {
    // no options
    super(gameEngine, null, { position });
  }

  onAddToWorld(gameEngine) {
    const s = Player.DIMENSION;
    this.physicsObject = gameEngine.physicsEngine
      .addBox(s, s, s, 50, 'groundMaterial');
    const { x, y, z } = this.position;
    this.physicsObject.position.set(x, y, z);
  }

  setTeam(team) {
    this.team = team;
  }

  destroy() {
    this.gameEngine.physicsEngine.removeObject(this.physicsObject);
  }
}

Player.DIMENSION = 1; // ?
