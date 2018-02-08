'use strict';

const config = require('./config');

class Vehicle {
  constructor(p) {
    this.p = p;
    this.x = 10;
    this.y = config.WINDOW_HEIGHT / 2;
    this.thickness = 2;
    this.size = 10;
  }

  step() {
    this.x += 1;
  }

  draw() {
    this.p.stroke(config.VEHICLE_COLOR);
    this.p.strokeWeight(this.thickness);

    this.p.beginShape();
    this.p.vertex(this.x - this.size, this.y - this.size);
    this.p.vertex(this.x, this.y);
    this.p.vertex(this.x - this.size, this.y + this.size);
    this.p.endShape();
  }
}

module.exports = Vehicle;
