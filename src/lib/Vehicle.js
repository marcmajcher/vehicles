'use strict';

const config = require('./config');
const Vector = require('./Vector');

class Vehicle {
  constructor(p) {
    this.p = p;
    this.position = new Vector(10, config.WINDOW_HEIGHT / 2);
    this.velocity = new Vector(0, 0);
    this.steer = () => {};

    this.thickness = config.VEHICLE_THICKNESS;
    this.size = config.VEHICLE_SIZE;
  }

  step() {
    this.steer();
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

    const tail1 = this.velocity.rotate(-this.size, -this.size);
    const tail2 = this.velocity.rotate(-this.size, this.size);

    p.noFill();
    p.beginShape();
    p.vertex(this.position.x + tail1.x, this.position.y + tail1.y);
    p.vertex(this.position.x, this.position.y);
    p.vertex(this.position.x + tail2.x, this.position.y + tail2.y);
    p.endShape();
  }

  drawTrail(buffer) {
    buffer.noStroke();
    buffer.fill(config.TRAILS_COLOR);
    buffer.ellipse(this.position.x / 2, this.position.y / 2, this.size * 0.7);
  }

}

module.exports = Vehicle;
