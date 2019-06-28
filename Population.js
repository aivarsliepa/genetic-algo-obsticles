class Population {
  constructor() {
    /**
     * @type {Agent[]}
     */
    this.agents = [new Agent(200, 200)];
  }

  draw() {
    this.agents.forEach(agent => agent.draw());
  }

  update() {
    this.agents.forEach(agent => agent.update());
  }
}
