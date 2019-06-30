const MUTATION_CHANCE = 0.005;

// stuff that indentifies agents, in this game just directions they are making
class DNA {
  constructor() {
    this.directions = [];
  }

  generateDirection() {
    return p5.Vector.fromAngle(random(TWO_PI));
  }

  getNextDirection() {
    if (this.directions.length > currentMove + 1) {
      return this.directions[currentMove];
    }

    const nextMove = this.generateDirection();
    this.directions.push(nextMove);
    return nextMove;
  }

  copy() {
    const copyOfSelf = new DNA();
    copyOfSelf.directions = this.directions.map(direction => direction.copy());
    return copyOfSelf;
  }

  mutate() {
    for (let i = 0; i < this.directions.length; i++) {
      if (MUTATION_CHANCE >= random(1)) {
        this.directions[i] = this.generateDirection();
      }
    }
  }
}
