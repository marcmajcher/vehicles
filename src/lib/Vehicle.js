'use strict';

const config = require('./config');
const Vector = require('./Vector');

class Vehicle {
  constructor(p) {
    this.p = p;
    this.position = new Vector(10, config.WINDOW_HEIGHT / 2);
    this.velocity = new Vector(0, 0);
    this.steer = () => {};
    this.brain = {};

    this.color = config.VEHICLE_COLOR;
    this.trailColor = config.TRAILS_COLOR;
    this.thickness = config.VEHICLE_THICKNESS;
    this.size = config.VEHICLE_SIZE;
    this.size2 = (this.size * 2.2) * (this.size * 2.2); // for collisions
  }

  step() {
    this.steer();

    const len = this.velocity.length;
    if (len < config.VEHICLE_MIN_SPEED) {
      this.velocity.length = config.VEHICLE_MIN_SPEED;
    }
    else if (len > config.VEHICLE_MAX_SPEED) {
      this.velocity.length = config.VEHICLE_MAX_SPEED;
    }

    this.position.add(this.velocity);
    this.wrap();
  }

  collide(vehicle) {
    const COLL_OFF = 1.1;
    const p1 = this.position;
    const p2 = vehicle.position;
    let distance = Math.abs((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
    if (distance < this.size2) {
      distance = Math.sqrt(distance);
      const midpoint = p1.clone().add(p2).scale(0.5);
      p1.x = midpoint.x + this.size * COLL_OFF * (p1.x - p2.x) / distance;
      p1.y = midpoint.y + this.size * COLL_OFF * (p1.y - p2.y) / distance;
      p2.x = midpoint.x + vehicle.size * COLL_OFF * (p2.x - p1.x) / distance;
      p2.y = midpoint.y + vehicle.size * COLL_OFF * (p2.y - p1.y) / distance;
    }
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
    p.stroke(this.color);
    p.strokeWeight(this.thickness);

    const tail1 = this.velocity.rotate(-this.size / 2, -this.size);
    const center = this.velocity.rotate(this.size / 2, 0);
    const tail2 = this.velocity.rotate(-this.size / 2, this.size);

    p.noFill();
    p.beginShape();
    p.vertex(this.position.x + tail1.x, this.position.y + tail1.y);
    p.vertex(this.position.x + center.x, this.position.y + center.y);
    p.vertex(this.position.x + tail2.x, this.position.y + tail2.y);
    p.endShape();
  }

  drawTrail(buffer) {
    buffer.noStroke();
    buffer.fill(this.trailColor);
    buffer.ellipse(this.position.x / 2, this.position.y / 2, this.size * 0.7);
  }

}

module.exports = Vehicle;
