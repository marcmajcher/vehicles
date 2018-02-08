'use strict';

const WINDOW_WIDTH = 640;
const WINDOW_HEIGHT = 480;
const BACKGROUND_COLOR = '#fff';

const Vehicle = require('./Vehicle');

const sketch = function (p) {

  const vehicle = new Vehicle(p);

  p.setup = () => {
    p.createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
    p.background(BACKGROUND_COLOR);
  };

  p.draw = () => {
    vehicle.step();
    vehicle.display();
  };

};

module.exports = sketch;
