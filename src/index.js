'use strict';

/* global p5 */

const vehicles = require('./lib/vehicles');

const fn = () => {
  // new p5(vehicles[0], 'vehicles000');
  // new p5(vehicles[1], 'vehicles001');
  // new p5(vehicles[2], 'vehicles002');
  // new p5(vehicles[3], 'vehicles003');
  // new p5(vehicles[4], 'vehicles004');
  // new p5(vehicles[5], 'vehicles005');
  // new p5(vehicles[6], 'vehicles006');
  // new p5(vehicles[7], 'vehicles007');
  // new p5(vehicles[8], 'vehicles008');
  // new p5(vehicles[9], 'vehicles009');
  new p5(vehicles[10], 'vehicles0010');
};

if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
  fn();
}
else {
  document.addEventListener('DOMContentLoaded', fn);
}
