class Point {

  
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  update(dt) {
    this.x += dt * 20;
  }
  
  draw() {
    point(this.x, this.y)
  }
  
}