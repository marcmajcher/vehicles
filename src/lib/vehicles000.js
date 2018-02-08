'use strict';

const World = require('./World');

const sketch = function (p) {
  const world = new World();
  world.addCanvas(p);
};

module.exports = sketch;
