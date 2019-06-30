const MAX_POPULATION = 200;

class Population {
  constructor() {
    /**
     * @type {Agent[]}
     */
    this.agents = [];
    this.trainRate = 1; // must positive integer
    this.headlessMode = false;

    for (let i = 0; i < MAX_POPULATION; i++) {
      this.agents.push(new Agent());
    }
  }

  draw() {
    this.agents.forEach(agent => agent.draw());
  }

  update() {
    if (this.headlessMode) {
      this.simulateGenerations();
    } else {
      this.updateCycle();
    }
  }

  updateCycle() {
    const aliveAgents = this.agents.filter(agent => agent.isAlive);

    if (aliveAgents.length > 0) {
      aliveAgents.forEach(agent => agent.update());
      currentMove++;
    } else {
      this.startNewGeneration();

      if (this.trainRate > 1) {
        this.headlessMode = true;
      }
    }
  }

  simulateGenerations() {
    for (let i = 1; i < this.trainRate; i++) {
      this.simulateOneGeneration();
    }

    this.headlessMode = false;
  }

  simulateOneGeneration() {
    let aliveAgents = this.agents.filter(agent => agent.isAlive);

    while (aliveAgents.length > 0) {
      aliveAgents.forEach(agent => agent.update());
      currentMove++;
      aliveAgents = this.agents.filter(agent => agent.isAlive);
    }

    this.startNewGeneration();
  }

  startNewGeneration() {
    this.calculateFitness();
    this.naturalSelection();
    this.mutation();
    currentMove = 0;
  }

  calculateFitness() {
    this.agents.forEach(agent => this.setFitnessForAgent(agent));
  }

  /**
   * @param {Agent} agent
   */
  setFitnessForAgent(agent) {
    let score = (1 / distance(agent.position, finishPoint.position)) * 1000;

    if (agent.reachedFinish) {
      // when finish reached, evaluate less moves as higher score
      const movesTakenCoefficient = Math.pow(currentMove / agent.movesTaken, 2);
      score *= movesTakenCoefficient;
      // console.log("finished score", score, "movesTakenCoefficient", movesTakenCoefficient);
    } else {
      // when finish is not reached, evaluate more moves taken, to encourage discovering new/longer paths
      const movesTakenCoefficient = map(agent.movesTaken, 0, currentMove, 1, 3);
      score *= movesTakenCoefficient;
      // console.log("NOT FINISHED score", score, "movesTakenCoefficient", movesTakenCoefficient);
    }
    agent.fitnessScore = score;
  }

  // debug function
  debugDrawFitnessScores() {
    /**
     * @type {Agent[]}
     */
    const debugAgents = [];

    for (let i = 20; i < WIDTH; i += 80) {
      for (let j = 20; j < HEIGHT; j += 80) {
        const debugAgent = new Agent();
        debugAgent.position = createVector(i, j);
        debugAgent.movesTaken = 100;
        debugAgents.push(debugAgent);
      }
    }

    debugAgents.forEach(agent => {
      this.setFitnessForAgent(agent);
      textAlign(CENTER);
      textSize(10);
      text(agent.fitnessScore.toFixed(0), agent.position.x, agent.position.y);
    });
  }

  naturalSelection() {
    this.agents.sort((a, b) => b.fitnessScore - a.fitnessScore);
    const fitnessSum = this.agents.reduce((acc, agent) => agent.fitnessScore + acc, 0);

    // take one instance of best agent, which will not be mutated
    const newAgents = [this.agents[0].reproduce()];

    while (newAgents.length < MAX_POPULATION) {
      let randScore = random(fitnessSum);
      for (let i = 0; i < this.agents.length; i++) {
        const agent = this.agents[i];
        if (agent.fitnessScore > randScore) {
          newAgents.push(agent.reproduce());
          break;
        } else {
          randScore -= agent.fitnessScore;
        }
      }
    }

    this.agents = newAgents;
  }

  mutation() {
    // don't mutate the previous best agent (which is first in array)
    for (let i = 1; i < this.agents.length; i++) {
      this.agents[i].dna.mutate();
    }
  }
}
