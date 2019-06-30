class Obsticle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.size = 20;
  }

  draw() {
    fill(155);
    rect(this.position.x, this.position.y, this.size, this.size);
  }
}
