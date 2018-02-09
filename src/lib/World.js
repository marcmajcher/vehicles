'use strict';

const config = require('./config');

class World {
  constructor() {
    this.running = false;
    this.showVehicles = true;
    this.trails = false;
    this.vehicles = [];
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
      this.trailBuffer = p5.createGraphics(p5.width, p5.height);
    };

    p5.draw = () => {
      if (this.running) {
        p5.background(config.BACKGROUND_COLOR);
        if (this.trails) {
          p5.image(this.trailBuffer, 0, 0, p5.width, p5.height);
        }

        // move all vehicles, then draw them
        // NB: vehicles move in order, not simultaneously
        this.vehicles.forEach((vehicle) => {
          vehicle.step();
        });
        this.vehicles.forEach((vehicle) => {
          if (this.trails) {
            vehicle.drawTrail(this.trailBuffer);
          }
          if (this.showVehicles) {
            vehicle.draw();
          }
        });
      }
    };

    p5.keyPressed = () => {
      if (p5.keyCode === 32) { // space
        this.showVehicles = !this.showVehicles;
      }
    };
  }
}

module.exports = World;
