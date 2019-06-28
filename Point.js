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
  }
}
