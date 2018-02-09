'use strict';

const config = require('./config');
const World = require('./World');
const Vehicle = require('./Vehicle');
const Vector = require('./Vector');

const numVehicles = 1;

const sketch = function (p5) {

  const steerfn = function () {
    if (!this.brain.noiseOffset) {
      this.brain.noiseOffset = Math.random() * 100000;
      this.brain.t = 0;
      this.brain.dt = 0.01;
    }

    const degrees = p5.noise(this.brain.t + this.brain.noiseOffset, 0) - 0.5;
    // world.trailBuffer.stroke(p5.noise(this.brain.t + this.brain.noiseOffset, 0) * 255);
    // const linex = (this.brain.t * 100) % p5.width;
    // world.trailBuffer.line(linex / 2, 20, linex / 2, 40);

    const accel = p5.noise(0, this.brain.t + this.brain.noiseOffset) - 0.5;
    this.velocity.angle = this.velocity.angle + degrees / 10;
    this.velocity.length = this.velocity.length + accel / 5;

    this.brain.t += this.brain.dt;
  };

  const world = new World();
  world.addCanvas(p5);
  world.trails = true;

  for (let i = 0; i < numVehicles; i++) {
    const vehicle = new Vehicle(p5);
    const r = Math.random;
    vehicle.velocity = new Vector(r() * 2 - 1, r() * 2 - 1);
    vehicle.position = new Vector(r() * config.WINDOW_WIDTH, r() * config.WINDOW_HEIGHT);
    vehicle.steer = steerfn;
    world.addVehicle(vehicle);
  }

  world.start();
};

module.exports = sketch;
