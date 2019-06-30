const AGENT_RADIUSS = 5;
const AGENT_VELOCITY_LIMIT = 50;

class Agent {
  constructor() {
    this.isAlive = true;
    this.dna = new DNA();
    this.position = createVector(startingPoint.position.x, startingPoint.position.y);
    this.velocity = createVector(0, 0);
    this.fitnessScore = 0;
    this.reachedFinish = false;
    this.movesTaken = 0;
  }

  draw() {
    fill(0);
    circle(this.position.x, this.position.y, AGENT_RADIUSS * 2);
  }

  update() {
    this.movesTaken++;
    this.velocity.add(this.dna.getNextDirection());
    this.velocity.limit(AGENT_VELOCITY_LIMIT);
    this.position.add(this.velocity);

    // canvas borders check
    if (this.position.x <= 0 || this.position.x >= WIDTH || this.position.y <= 0 || this.position.y >= HEIGHT) {
      this.isAlive = false;
    }

    // finish reached check
    if (distance(this.position, finishPoint.position) < finishPoint.radiuss + AGENT_RADIUSS) {
      this.reachedFinish = true;
      this.isAlive = false;
    }

    // obsticle check
    for (let i = 0; i < obsticles.length; i++) {
      const obs = obsticles[i];
      if (
        obs.position.x <= this.position.x &&
        obs.position.x + obs.size >= this.position.x &&
        obs.position.y <= this.position.y &&
        obs.position.y + obs.size >= this.position.y
      ) {
        this.isAlive = false;
        break;
      }
    }
  }

  reproduce() {
    const child = new Agent();
    child.dna = this.dna.copy();
    return child;
  }
}
