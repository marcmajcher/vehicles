'use strict';

const config = require('./config');
const Vector = require('./Vector');

class Vehicle {
  constructor(p) {
    this.p = p;
    this.position = new Vector(10, config.WINDOW_HEIGHT / 2);
    this.velocity = new Vector(1, 0);

    this.thickness = 2;
    this.size = 10;
  }

  step() {
    this.position.add(this.velocity);
    this.wrap();
  }

  wrap() {
    // check edges and wrap
    const width = this.p.width + this.size;
    const height = this.p.height + this.size;

    if (this.position.x < 0) {
      this.position.x = width;
    }
    else if (this.position.x > width) {
      this.position.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = height;
    }
    else if (this.position.y > height) {
      this.position.y = 0;
    }
  }

  draw() {
    const p = this.p;
    p.stroke(config.VEHICLE_COLOR);
    p.strokeWeight(this.thickness);

    const tail1 = this.velocity.rotate(this.position.x - this.size, this.position.y - this.size);
    const tail2 = this.velocity.rotate(this.position.x - this.size, this.position.y + this.size);

    p.beginShape();
    p.vertex(tail1.x, tail1.y);
    p.vertex(this.position.x, this.position.y);
    p.vertex(tail2.x, tail2.y);
    p.endShape();
  }

}

module.exports = Vehicle;
