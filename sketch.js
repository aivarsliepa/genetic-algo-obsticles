const WIDTH = 800;
const HEIGHT = 600;

/**
 * @type {Population}
 */
let population;

function setup() {
  createCanvas(WIDTH, HEIGHT).parent("sketch-container");
  population = new Population();
}

function draw() {
  background(240);
  population.update();
  population.draw();
}
