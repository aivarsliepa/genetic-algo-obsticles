const WIDTH = 800;
const HEIGHT = 600;

/**
 * @type {Population}
 */
let population;
/**
 * @type {Point}
 */
let startingPoint;
/**
 * @type {Point}
 */
let finishPoint;

let currentMove = 0;

/**
 * @type {Obsticle[]}
 */
const obsticles = [];

function setup() {
  createCanvas(WIDTH, HEIGHT).parent("sketch-container");
  startingPoint = new Point(10, 20, true, false);
  finishPoint = new Point(WIDTH - 10, 20, false, true);
  population = new Population();

  for (let i = 0; i < 25; i++) {
    obsticles.push(new Obsticle(400, 0 + 20 * i));
  }
}

function draw() {
  background(240);
  obsticles.forEach(obsticle => obsticle.draw());
  startingPoint.draw();
  finishPoint.draw();

  population.update();
  population.draw();
  // population.debugDrawFitnessScores();
}

// wrapper for dist
function distance(pos1, pos2) {
  return dist(pos1.x, pos1.y, pos2.x, pos2.y);
}
