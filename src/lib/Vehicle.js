'use strict';

const VEHICLE_COLOR = '#000';
const WINDOW_WIDTH = 640;
const WINDOW_HEIGHT = 480;

class Vehicle {
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

module.exports = Vehicle;
