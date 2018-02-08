(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

const config = require('./config');

class Vehicle {
  constructor(p) {
    this.p = p;
    this.x = config.WINDOW_WIDTH / 2;
    this.y = config.WINDOW_HEIGHT / 2;
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
    this.p.stroke(config.VEHICLE_COLOR);
    this.p.point(this.x, this.y);
  }
}

module.exports = Vehicle;

},{"./config":2}],2:[function(require,module,exports){
'use strict';

module.exports = {
  WINDOW_WIDTH: 640,
  WINDOW_HEIGHT: 480,
  BACKGROUND_COLOR: '#fff',
  VEHICLE_COLOR: '#000',
};

},{}],3:[function(require,module,exports){
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

},{"./Vehicle":1,"./config":2}],4:[function(require,module,exports){
'use strict';

module.exports = [
  require('./vehicle000')
];

},{"./vehicle000":3}],5:[function(require,module,exports){
'use strict';

/* global p5 */

const vehicles = require('./lib/vehicles');

const fn = () => {
  new p5(vehicles[0], 'vehicle000');
};

if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
  fn();
}
else {
  document.addEventListener('DOMContentLoaded', fn);
}

},{"./lib/vehicles":4}]},{},[5]);
