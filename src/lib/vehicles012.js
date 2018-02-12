'use strict';

// FOLLOW/conga

const config = require('./config');
const World = require('./World');
const Vehicle = require('./Vehicle');
const Vector = require('./Vector');

const sketch = function (p5) {

  const perlinSteer = function (factor = 1) {
    if (!this.brain.noiseOffset) {
      this.brain.noiseOffset = Math.random() * 100000;
      this.brain.t = 0;
      this.brain.dt = 0.01;
    }

    const degrees = p5.noise(this.brain.t + this.brain.noiseOffset, 0) - 0.5;
    const accel = p5.noise(0, this.brain.t + this.brain.noiseOffset) - 0.5;

    this.velocity.angle = this.velocity.angle + (degrees / 20) * factor;
    this.velocity.length = this.velocity.length + (accel / 30) * factor;

    this.brain.t += this.brain.dt;
  };

  const targetSteer = function (flee = false) {
    if (this.brain.target) {
      if (!this.brain.bored) {
        let targetVector = this.brain.target.position.clone();
        targetVector.worldSub(this.position);
        targetVector.normalize();
        if (flee) {
          targetVector.scale(-1);
        }
        this.velocity.add(targetVector);
      }
    }
  };

  const steer = function () {
    targetSteer();
    perlinSteer(2);
  };

  const init = function () {
    for (let i = 0; i < this.numVehicles; i++) {
      const vehicle = new Vehicle(p5);
      const r = Math.random;
      vehicle.velocity = new Vector(r() * 2 - 1, r() * 2 - 1);
      vehicle.position = new Vector(r() * config.WINDOW_WIDTH, r() * config.WINDOW_HEIGHT);

      vehicle.brain.target = this.vehicles[Math.floor(Math.random() * this.vehicles.length)];
      vehicle.steer = targetSteer;
      this.addVehicle(vehicle);
    }
  };

  const world = new World();
  world.addCanvas(p5);
  world.init = init;
  world.start();
};

module.exports = sketch;
