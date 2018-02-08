'use strict';

const config = require('./config');
const Vehicle = require('./Vehicle');

class WorldView {
  constructor(model) {
    this.model = model;
  }

  addCanvas(p5) {
    this.p5 = p5;

    p5.setup = () => {
      p5.createCanvas(config.WINDOW_WIDTH, config.WINDOW_HEIGHT);
      p5.background(config.BACKGROUND_COLOR);

      for (let i = 0; i < 1000; i++) {
        const vehicle = new Vehicle(p5);
        this.model.addVehicle(vehicle);
      }
    };

    p5.draw = () => {
      this.model.step();
      this.model.draw();
    };

  }
}

module.exports = WorldView;
