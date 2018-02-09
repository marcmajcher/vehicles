'use strict';

const config = require('./config');

class World {
  constructor() {
    this.vehicles = [];
    this.running = false;
  }

  start() {
    this.running = true;
  }

  stop() {
    this.running = false;
  }

  addVehicle(vehicle) {
    this.vehicles.push(vehicle);
  }

  addCanvas(p5) {
    this.p5 = p5;

    p5.setup = () => {
      p5.createCanvas(config.WINDOW_WIDTH, config.WINDOW_HEIGHT);
    };

    p5.draw = () => {
      if (this.running) {
        p5.background(config.BACKGROUND_COLOR);

        // move all vehicles, then draw them
        // NB: vehicles move in order, not simultaneously
        this.vehicles.forEach((vehicle) => {
          vehicle.step();
        });
        this.vehicles.forEach((vehicle) => {
          vehicle.draw();
        });
      }
    };

  }
}

module.exports = World;
