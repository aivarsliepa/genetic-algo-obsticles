// stuff that indentifies agents, in this game just directions they are making
class DNA {
  constructor() {
    this.directions = [];
  }

  getNextDirection() {
    const nextMove = p5.Vector.fromAngle(random(TWO_PI));
    this.directions.push(nextMove);
    return nextMove;
  }
}
