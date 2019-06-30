const MAX_POPULATION = 200;

class Population {
  constructor() {
    /**
     * @type {Agent[]}
     */
    this.agents = [];

    for (let i = 0; i < MAX_POPULATION; i++) {
      this.agents.push(new Agent());
    }
  }

  draw() {
    this.agents.forEach(agent => agent.draw());
  }

  update() {
    const aliveAgents = this.agents.filter(agent => agent.isAlive);

    if (aliveAgents.length > 0) {
      aliveAgents.forEach(agent => agent.update());
      currentMove++;
    } else {
      currentMove = 0;
      this.calculateFitness();
      this.naturalSelection();
      this.mutation();
    }
  }

  calculateFitness() {
    this.agents.forEach(agent => {
      let score = (1 / distance(agent.position, finishPoint.position)) * 1000;
      if (agent.reachedFinish) {
        score *= 2;
      }
      agent.fitnessScore = score;
    });
  }

  naturalSelection() {
    this.agents.sort((a, b) => b.fitnessScore - a.fitnessScore);
    const fitnessSum = this.agents.reduce((acc, agent) => agent.fitnessScore + acc, 0);

    const newAgents = [];

    while (newAgents.length < MAX_POPULATION) {
      let randScore = random(fitnessSum);
      for (let i = 1; i < this.agents.length; i++) {
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
    this.agents.forEach(agent => agent.dna.mutate());
  }
}
