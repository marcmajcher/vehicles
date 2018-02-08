'use strict';

const config = require('./config');
const Vehicle = require('./Vehicle');

const sketch = function (p) {

  const vehicle = new Vehicle(p);

  p.setup = () => {
    p.createCanvas(config.WINDOW_WIDTH, config.WINDOW_HEIGHT);
    p.background(config.BACKGROUND_COLOR);
  };

  p.draw = () => {
    vehicle.step();
    vehicle.display();
  };

};

module.exports = sketch;
