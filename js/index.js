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

},{"./lib/vehicles":6}],2:[function(require,module,exports){
'use strict';

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(vec) {
    this.x += vec.x;
    this.y += vec.y;
  }

  // returns the x, y given, rotate by the vector
  rotate(xin, yin) {
    const radians = Math.atan2(this.y, this.x);
    console.log('RAD', radians, 'SIN', Math.sin(radians), "COS", Math.cos(radians));
    const x = xin * Math.cos(radians) - yin * Math.sin(radians);
    const y = xin * Math.sin(radians) + yin * Math.cos(radians);
    return {
      x,
      y
    };
  }
}

module.exports = Vector;

},{}],3:[function(require,module,exports){
'use strict';

const config = require('./config');
const Vector = require('./Vector');

class Vehicle {
  constructor(p) {
    this.p = p;
    this.position = new Vector(10, config.WINDOW_HEIGHT / 2);
    this.velocity = new Vector(1, 1);

    this.thickness = 2;
    this.size = 10;
  }

  step() {
    this.position.add(this.velocity);
    this.wrap();
  }

  wrap() {
    // check edges and wrap
    const width = this.p.width + this.size;
    const height = this.p.height + this.size;

    if (this.position.x < 0) {
      this.position.x = width;
    }
    else if (this.position.x > width) {
      this.position.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = height;
    }
    else if (this.position.y > height) {
      this.position.y = 0;
    }
  }

  draw() {
    const p = this.p;
    p.stroke(config.VEHICLE_COLOR);
    p.strokeWeight(this.thickness);

    const tail1 = this.velocity.rotate(-this.size, -this.size);
    const tail2 = this.velocity.rotate(-this.size, this.size);

    p.beginShape();
    p.vertex(this.position.x + tail1.x, this.position.y + tail1.y);
    p.vertex(this.position.x, this.position.y);
    p.vertex(this.position.x + tail2.x, this.position.y + tail2.y);
    p.endShape();
  }

}

module.exports = Vehicle;

},{"./Vector":2,"./config":5}],4:[function(require,module,exports){
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

      // move all vehicles, then draw them
      // NB: vehicles move in order, not simultaneously
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

},{"./Vehicle":3,"./config":5}],5:[function(require,module,exports){
'use strict';

module.exports = {
  WINDOW_WIDTH: 640,
  WINDOW_HEIGHT: 480,
  BACKGROUND_COLOR: '#fff',
  VEHICLE_COLOR: 'rgba(0,0,0,1)',
};

},{}],6:[function(require,module,exports){
'use strict';

module.exports = [
  require('./vehicles000'),
  // new require('./vehicles001')()
];

},{"./vehicles000":7}],7:[function(require,module,exports){
'use strict';

const World = require('./World');

const sketch = function (p) {
  const world = new World();
  world.addCanvas(p);
};

module.exports = sketch;

},{"./World":4}]},{},[1]);
