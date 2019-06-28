const AGENT_DIAMETER = 10;
const AGENT_VELOCITY_LIMIT = 5;

class Agent {
  constructor(x, y) {
    // this.isDead = false;
    this.dna = new DNA();
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
  }

  draw() {
    // fill(0);
    circle(this.position.x, this.position.y, AGENT_DIAMETER);
  }

  update() {
    this.velocity.add(this.dna.getNextDirection());
    this.velocity.limit(AGENT_VELOCITY_LIMIT);
    this.position.add(this.velocity);
  }
}
