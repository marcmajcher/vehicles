'use strict';

const config = require('./config');
const Vehicle = require('./Vehicle');

class World {
  constructor() {
    this.vehicles = [];
  }

  addCanvas(p5) {
    this.p5 = p5;

    p5.setup = () => {
      p5.createCanvas(config.WINDOW_WIDTH, config.WINDOW_HEIGHT);

      for (let i = 0; i < 1; i++) {
        const vehicle = new Vehicle(p5);
        this.vehicles.push(vehicle);
      }
    };

    p5.draw = () => {
      p5.background(config.BACKGROUND_COLOR);

      // move all vehicles, then draw them
      // NB: vehicles move in order, not simultaneously
      this.vehicles.forEach((vehicle) => {
        vehicle.step();
      });
      this.vehicles.forEach((vehicle) => {
        vehicle.draw();
      });
    };

  }
}

module.exports = World;
