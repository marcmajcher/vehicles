'use strict';

/* global p5 */

const WINDOW_WIDTH = 640;
const WINDOW_HEIGHT = 480;
const BACKGROUND_COLOR = '#fff';
const VEHICLE_COLOR = '#000';

class Walker {
  constructor(p) {
    this.p = p;
    this.x = WINDOW_WIDTH / 2;
    this.y = WINDOW_HEIGHT / 2;
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
    this.p.stroke(VEHICLE_COLOR);
    this.p.point(this.x, this.y);
  }
}

const sketch = function (p) {

  const walker = new Walker(p);

  p.setup = () => {
    p.createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
    p.background(BACKGROUND_COLOR);
  };

  p.draw = () => {
    walker.step();
    walker.display();
  };

};

new p5(sketch);
