'use strict';

const config = require('./config');

class Vehicle {
  constructor(p) {
    this.p = p;
    this.x = config.WINDOW_WIDTH / 2;
    this.y = config.WINDOW_HEIGHT / 2;
    this.t = Math.random() * 10000;
    this.dt = 0.01;
  }

  step() {
    const p = this.p;
    this.x = this.x + p.noise(this.t, 0) - 0.5;
    this.y = this.y + p.noise(0, this.t) - 0.5;
    this.t += this.dt;
  }

  draw() {
    this.p.stroke(config.VEHICLE_COLOR);
    this.p.point(this.x, this.y);
  }
}

module.exports = Vehicle;
