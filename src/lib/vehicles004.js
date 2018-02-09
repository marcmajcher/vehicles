'use strict';

const config = require('./config');
const World = require('./World');
const Vehicle = require('./Vehicle');
const Vector = require('./Vector');

const sketch = function (p5) {

  const steering = function () {
    let degrees = 0;
    let accel = 0;
    this.velocity.angle = this.velocity.angle + degrees / 20;
    this.velocity.length = this.velocity.length + accel / 30;
  };

  const init = function () {
    const target = new Vector(config.WINDOW_WIDTH / 2, config.WINDOW_HEIGHT / 2);

    for (let i = 0; i < this.numVehicles; i++) {
      const vehicle = new Vehicle(p5);
      const r = Math.random;
      vehicle.velocity = new Vector(r() * 2 - 1, r() * 2 - 1);
      vehicle.position = new Vector(r() * config.WINDOW_WIDTH, r() * config.WINDOW_HEIGHT);
      vehicle.steer = steering;
      vehicle.brain.target = target;
      this.addVehicle(vehicle);
    }
  };

  const world = new World();
  world.addCanvas(p5);
  world.init = init;
  world.start();
};

module.exports = sketch;
