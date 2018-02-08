'use strict';

/* global p5 */

const vehicles = require('./lib/vehicles');

const fn = () => {
  new p5(vehicles[0], 'vehicles000');
  // new p5(vehicles[1], 'vehicles001');
};

if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
  fn();
}
else {
  document.addEventListener('DOMContentLoaded', fn);
}
