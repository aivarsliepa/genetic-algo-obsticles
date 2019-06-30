// Point of interest (start, finish)
class Point {
  /**
   * @param {number} x
   * @param {number} y
   * @param {boolean} isStart
   * @param {boolean} isFinish
   */
  constructor(x, y, isStart, isFinish) {
    this.position = createVector(x, y);
    this.isStart = isStart;
    this.isFinish = isFinish;
    this.radiuss = 10;
  }

  draw() {
    if (this.isStart) {
      fill(255);
    } else if (this.isFinish) {
      fill(0, 255, 0);
    }
    circle(this.position.x, this.position.y, this.radiuss * 2);
  }
}
