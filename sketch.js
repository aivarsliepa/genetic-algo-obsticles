const WIDTH = 1000;
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

let debug = false;

function setup() {
  createCanvas(WIDTH, HEIGHT).parent("sketch-container");
  startingPoint = new Point(10, 20, true, false);
  finishPoint = new Point(WIDTH - 10, 20, false, true);

  resetPopulation();

  // for (let i = 0; i < 25; i++) {
  //   obsticles.push(new Obsticle(WIDTH / 2, 0 + 20 * i));
  // }
}

function draw() {
  background(240);
  obsticles.forEach(obsticle => obsticle.draw());
  startingPoint.draw();
  finishPoint.draw();

  population.update();
  population.draw();
  if (debug) {
    population.debugDrawFitnessScores();
  }
}

function resetPopulation() {
  population = new Population();
}

// wrapper for dist
function distance(pos1, pos2) {
  return dist(pos1.x, pos1.y, pos2.x, pos2.y);
}

function onDebugChange(event) {
  debug = event.srcElement.checked;
}
