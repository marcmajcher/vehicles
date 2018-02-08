(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

const VEHICLE_COLOR = '#000';
const WINDOW_WIDTH = 640;
const WINDOW_HEIGHT = 480;

class Vehicle {
  constructor(p) {
    this.p = p;
    this.x = WINDOW_WIDTH / 2;
    this.y = WINDOW_HEIGHT / 2;
    this.t = 0;
    this.dt = 0.01;
  }

  step() {
    const p = this.p;
    this.x = this.x + p.noise(this.t, 0) - 0.5;
    this.y = this.y + p.noise(0, this.t) - 0.5;
    this.t += this.dt;
  }

  display() {
    this.p.stroke(VEHICLE_COLOR);
    this.p.point(this.x, this.y);
  }
}

module.exports = Vehicle;

},{}],2:[function(require,module,exports){
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

},{"./Vehicle":1}],3:[function(require,module,exports){
'use strict';

/* global p5 */

const sketch = require('./lib/sketch');

const fn = () => {
  new p5(sketch, 'firstSketch');
};

if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
  fn();
}
else {
  document.addEventListener('DOMContentLoaded', fn);
}

},{"./lib/sketch":2}]},{},[3]);
