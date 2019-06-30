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

function setup() {
  createCanvas(WIDTH, HEIGHT).parent("sketch-container");
  startingPoint = new Point(200, 200, true, false);
  finishPoint = new Point(WIDTH - 20, HEIGHT / 2, false, true);
  population = new Population();
}

function draw() {
  background(240);
  startingPoint.draw();
  finishPoint.draw();

  population.update();
  population.draw();
}

// wrapper for dist
function distance(pos1, pos2) {
  return dist(pos1.x, pos1.y, pos2.x, pos2.y);
}
