'use strict';

/* global p5 */

class Walker {
  constructor(p) {
    this.p = p;
    this.x = p.windowWidth / 2;
    this.y = p.windowHeight / 2;
    this.t = 0;
    this.dt = 0.01;
  }

  step() {
    const p = this.p;
    this.x = this.x + p.noise(this.t, 0) - 0.5;
    this.y = this.y + p.noise(0, this.t) - 0.5;
    this.t += this.dt;
  }

  display() {
    this.p.stroke(0);
    this.p.point(this.x, this.y);
  }
}

const sketch = function (p) {

  const walker = new Walker(p);

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(200);
  };

  p.draw = () => {
    walker.step();
    walker.display();
  };

};

new p5(sketch);
