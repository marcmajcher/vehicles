'use strict';

class WorldModel {
  constructor() {
    this.vehicles = [];
  }

  addVehicle(vehicle) {
    this.vehicles.push(vehicle);
  }

  step() {
    this.vehicles.forEach((v) => {
      v.step();
    });
  }

  draw() {
    this.vehicles.forEach((v) => {
      v.draw();
    });
  }
}

module.exports = WorldModel;
