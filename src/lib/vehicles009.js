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

  const updateBoredom = function () {
    if (this.brain.bored) {
      this.color = config.VEHICLE_COLOR;
      this.brain.boredom--;
      if (this.brain.boredom <= 0) {
        this.brain.bored = false;
      }
    }
    else {
      this.color = 'rgb(51,0,0)';
      if (Math.random() < 0.5) {
        this.brain.boredom++;
      }
      if (this.brain.boredom >= config.MAX_BOREDOM) {
        this.brain.bored = true;
      }
    }
  };

  const followTarget = function () {
    if (this.brain.target) {
      updateBoredom.call(this);
      if (!this.brain.bored) {
        const targetVector = this.brain.target.position.clone();
        targetVector.sub(this.position);
        targetVector.normalize();
        this.velocity.add(targetVector);
      }
    }
    perlinSteer.call(this, 2);
  };

  const init = function () {

    for (let i = 0; i < this.numVehicles; i++) {
      const vehicle = new Vehicle(p5);
      const r = Math.random;
      vehicle.position = new Vector(r() * config.WINDOW_WIDTH, r() * config.WINDOW_HEIGHT);
      vehicle.velocity = new Vector(r() * 2 - 1, r() * 2 - 1);
      vehicle.brain.target = this.vehicles[Math.floor(Math.random() * this.vehicles.length)];
      vehicle.brain.boredom = Math.floor(Math.random() * config.MAX_BOREDOM);
      vehicle.steer = followTarget;

      this.addVehicle(vehicle);
    }
  };

  const world = new World();
  world.addCanvas(p5);
  world.init = init;
  world.start();
};

module.exports = sketch;
