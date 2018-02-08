(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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

},{"./lib/vehicles":5}],2:[function(require,module,exports){
'use strict';

const config = require('./config');

class Vehicle {
  constructor(p) {
    this.p = p;
    this.x = 10;
    this.y = config.WINDOW_HEIGHT / 2;
    this.thickness = 2;
    this.size = 10;
  }

  step() {
    this.x += 1;
  }

  draw() {
    this.p.stroke(config.VEHICLE_COLOR);
    this.p.strokeWeight(this.thickness);

    this.p.beginShape();
    this.p.vertex(this.x - this.size, this.y - this.size);
    this.p.vertex(this.x, this.y);
    this.p.vertex(this.x - this.size, this.y + this.size);
    this.p.endShape();
  }
}

module.exports = Vehicle;

},{"./config":4}],3:[function(require,module,exports){
'use strict';

const config = require('./config');
const Vehicle = require('./Vehicle');

class World {
  constructor() {
    this.vehicles = [];
  }

  addCanvas(p5) {
    this.p5 = p5;

    p5.setup = () => {
      p5.createCanvas(config.WINDOW_WIDTH, config.WINDOW_HEIGHT);

      for (let i = 0; i < 1; i++) {
        const vehicle = new Vehicle(p5);
        this.vehicles.push(vehicle);
      }
    };

    p5.draw = () => {
      p5.background(config.BACKGROUND_COLOR);

      this.vehicles.forEach((vehicle) => {
        vehicle.step();
      });
      this.vehicles.forEach((vehicle) => {
        vehicle.draw();
      });
    };

  }
}

module.exports = World;

},{"./Vehicle":2,"./config":4}],4:[function(require,module,exports){
'use strict';

module.exports = {
  WINDOW_WIDTH: 640,
  WINDOW_HEIGHT: 480,
  BACKGROUND_COLOR: '#fff',
  VEHICLE_COLOR: 'rgba(0,0,0,1)',
};

},{}],5:[function(require,module,exports){
'use strict';

module.exports = [
  require('./vehicles000'),
  // new require('./vehicles001')()
];

},{"./vehicles000":6}],6:[function(require,module,exports){
'use strict';

const World = require('./World');

const sketch = function (p) {
  const world = new World();
  world.addCanvas(p);
};

module.exports = sketch;

},{"./World":3}]},{},[1]);
