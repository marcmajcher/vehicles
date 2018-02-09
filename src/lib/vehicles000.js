'use strict';

const World = require('./World');
const Vehicle = require('./Vehicle');
const Vector = require('./Vector');

const sketch = function (p5) {
  const world = new World();
  world.addCanvas(p5);

  const vehicle = new Vehicle(p5);
  vehicle.velocity = new Vector(1, 0);

  world.addVehicle(vehicle);

  world.start();
};

module.exports = sketch;
