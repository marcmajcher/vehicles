'use strict';

const config = require('./config');

class World {
  constructor() {
    this.init = () => {};
    this.collide = true;
    this.numVehicles = config.NUM_VEHICLES;
    this.running = false;
    this.showVehicles = true;
    this.toggle = false;
    this.trails = true;
    this.vehicles = [];
  }

  start() {
    this.vehicles = [];
    this.init();
    this.running = true;
  }

  pause() {
    this.running = false;
  }

  play() {
    this.running = true;
  }

  addVehicle(vehicle) {
    this.vehicles.push(vehicle);
  }

  step() {
    // move all vehicles, then draw them
    // NB: vehicles move in order, not simultaneously
    if (!this.toggle) {
      for (let i = 0; i < this.vehicles.length; i++) {
        this.vehicles[i].step();
        for (let j = i + 1; this.collide && j < this.vehicles.length; j++) {
          this.vehicles[i].collide(this.vehicles[j]);
        }
      }

    }
    this.vehicles.forEach((vehicle) => {
      if (!this.toggle) {
        vehicle.drawTrail(this.trailBuffer);
      }
      if (this.showVehicles) {
        vehicle.draw();
      }
    });
  }

  addCanvas(p5) {
    p5.setup = () => {
      p5.createCanvas(config.WINDOW_WIDTH, config.WINDOW_HEIGHT);
      this.trailBuffer = p5.createGraphics(p5.width, p5.height);
    };

    p5.draw = () => {
      if (this.running || this.toggle) {
        p5.background(config.BACKGROUND_COLOR);
        if (this.trails) {
          p5.image(this.trailBuffer, 0, 0, p5.width, p5.height);
        }

        this.step();
      }
    };

    const keyActions = {
      32: () => { // space - pause/resume
        this.running = !this.running;
      },
      67: () => { // c - collide
        this.collide = !this.collide;
      },
      82: () => { // r - restart
        this.trailBuffer = p5.createGraphics(p5.width, p5.height); // can't do p5 stuff out there
        this.start();
      },
      83: () => { // s - do one step
        if (!this.running) {
          this.running = true;
          p5.redraw();
          this.running = false;
        }
      },
      84: () => { // t - toggle trail view
        this.toggle = true;
        this.trails = !this.trails;
        p5.redraw();
        this.toggle = false;
      },
      86: () => { //v - toggle vehicle view
        this.toggle = true;
        this.showVehicles = !this.showVehicles;
        p5.redraw();
        this.toggle = false;
      }
    };

    p5.keyPressed = () => {
      if (p5.keyCode in keyActions) {
        keyActions[p5.keyCode]();
      }
    };
  }
}

module.exports = World;
