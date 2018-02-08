'use strict';

const WorldModel = require('./WorldModel');
const WorldView = require('./WorldView');

const sketch = function (p) {
  const world = new WorldModel();
  const worldView = new WorldView(world);
  worldView.addCanvas(p);
};

module.exports = sketch;
