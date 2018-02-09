(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

/* global p5 */

const vehicles = require('./lib/vehicles');

const fn = () => {
  // new p5(vehicles[0], 'vehicles000');
  // new p5(vehicles[1], 'vehicles001');
  // new p5(vehicles[2], 'vehicles002');
  new p5(vehicles[3], 'vehicles003');
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
    return this;
  }

  sub(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
    return this;
  }

  scale(n) {
    this.x *= n;
    this.y *= n;
    return this;
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  set length(len) {
    const angle = this.angle;
    this.x = Math.cos(angle) * len;
    this.y = Math.sin(angle) * len;
  }

  get angle() {
    return Math.atan2(this.y, this.x);
  }
  set angle(a) {
    const len = this.length;
    this.x = Math.cos(a) * len;
    this.y = Math.sin(a) * len;
  }

  // returns the x, y given, rotate by the vector
  rotate(xin, yin) {
    const radians = Math.atan2(this.y, this.x);
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
    this.velocity = new Vector(0, 0);
    this.steer = () => {};
    this.brain = {};

    this.thickness = config.VEHICLE_THICKNESS;
    this.size = config.VEHICLE_SIZE;
  }

  step() {
    this.steer();

    const len = this.velocity.length;
    if (len < config.VEHICLE_MIN_SPEED) {
      this.velocity.length = config.VEHICLE_MIN_SPEED;
    }
    else if (len > config.VEHICLE_MAX_SPEED) {
      this.velocity.length = config.VEHICLE_MAX_SPEED;
    }

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

    p.noFill();
    p.beginShape();
    p.vertex(this.position.x + tail1.x, this.position.y + tail1.y);
    p.vertex(this.position.x, this.position.y);
    p.vertex(this.position.x + tail2.x, this.position.y + tail2.y);
    p.endShape();
  }

  drawTrail(buffer) {
    buffer.noStroke();
    buffer.fill(config.TRAILS_COLOR);
    buffer.ellipse(this.position.x / 2, this.position.y / 2, this.size * 0.7);
  }

}

module.exports = Vehicle;

},{"./Vector":2,"./config":5}],4:[function(require,module,exports){
'use strict';

const config = require('./config');

class World {
  constructor() {
    this.running = false;
    this.showVehicles = true;
    this.toggle = false;
    this.trails = false;
    this.vehicles = [];
  }

  start() {
    this.running = true;
  }

  stop() {
    this.running = false;
  }

  addVehicle(vehicle) {
    this.vehicles.push(vehicle);
  }

  addCanvas(p5) {
    this.p5 = p5;

    p5.setup = () => {
      p5.createCanvas(config.WINDOW_WIDTH, config.WINDOW_HEIGHT);
      this.trailBuffer = p5.createGraphics(p5.width, p5.height);
    };

    p5.draw = () => {
      if (this.running || this.toggle) {
        p5.background(config.BACKGROUND_COLOR);
        if (this.trails) {
          p5.image(this.trailBuffer, 0, 0, p5.width, p5.height);
        }

        // move all vehicles, then draw them
        // NB: vehicles move in order, not simultaneously
        if (!this.toggle) {
          this.vehicles.forEach((vehicle) => {
            vehicle.step();
          });
        }
        this.vehicles.forEach((vehicle) => {
          if (!this.toggle) {
            vehicle.drawTrail(this.trailBuffer);
          }
          if (this.showVehicles) {
            vehicle.draw();
          }
        });
      }
    };

    const keyActions = {
      32: () => { // space - pause/resume
        this.running = !this.running;
      },
      83: () => { // s - do one step
        if (!this.running) {
          this.running = true;
          p5.redraw();
          this.running = false;
        }
      },
      84: () => { // t - toggle trail view
        this.toggle = true;
        this.trails = !this.trails;
        p5.redraw();
        this.toggle = false;
      },
      86: () => { //v - toggle vehicle view
        this.toggle = true;
        this.showVehicles = !this.showVehicles;
        p5.redraw();
        this.toggle = false;
      }
    };

    p5.keyPressed = () => {
      if (p5.keyCode in keyActions) {
        keyActions[p5.keyCode]();
      }
    };
  }
}

module.exports = World;

},{"./config":5}],5:[function(require,module,exports){
'use strict';

module.exports = {
  WINDOW_WIDTH: 640,
  WINDOW_HEIGHT: 480,

  VEHICLE_COLOR: 'rgba(0,0,0,1)',
  VEHICLE_MIN_SPEED: 0.5,
  VEHICLE_MAX_SPEED: 3,
  VEHICLE_MAX_TURN: 10,
  VEHICLE_SIZE: 6,
  VEHICLE_THICKNESS: 2,

  BACKGROUND_COLOR: '#fff',
  TRAILS_COLOR: 'rgba(0,0,0,0.002)',
};

},{}],6:[function(require,module,exports){
'use strict';

module.exports = [
  require('./vehicles000'),
  require('./vehicles001'),
  require('./vehicles002'),
  require('./vehicles003'),
];

},{"./vehicles000":7,"./vehicles001":8,"./vehicles002":9,"./vehicles003":10}],7:[function(require,module,exports){
'use strict';

const World = require('./World');
const Vehicle = require('./Vehicle');
const Vector = require('./Vector');

const sketch = function (p5) {
  const world = new World();
  world.addCanvas(p5);

  const vehicle = new Vehicle(p5);
  vehicle.velocity = new Vector(1, 0);

  world.addVehicle(vehicle);

  world.start();
};

module.exports = sketch;

},{"./Vector":2,"./Vehicle":3,"./World":4}],8:[function(require,module,exports){
'use strict';

const config = require('./config');
const World = require('./World');
const Vehicle = require('./Vehicle');
const Vector = require('./Vector');

const numVehicles = 100;

const sketch = function (p5) {
  const world = new World();
  world.addCanvas(p5);

  for (let i = 0; i < numVehicles; i++) {
    const vehicle = new Vehicle(p5);
    const r = Math.random;
    vehicle.velocity = new Vector(r() * 2 - 1, r() * 2 - 1);
    vehicle.position = new Vector(r() * config.WINDOW_WIDTH, r() * config.WINDOW_HEIGHT);
    world.addVehicle(vehicle);
  }

  world.start();
};

module.exports = sketch;

},{"./Vector":2,"./Vehicle":3,"./World":4,"./config":5}],9:[function(require,module,exports){
'use strict';

const config = require('./config');
const World = require('./World');
const Vehicle = require('./Vehicle');
const Vector = require('./Vector');

const numVehicles = 100;

const sketch = function (p5) {
  const world = new World();
  world.addCanvas(p5);
  world.trails = true;

  for (let i = 0; i < numVehicles; i++) {
    const vehicle = new Vehicle(p5);
    const r = Math.random;
    vehicle.velocity = new Vector(r() * 2 - 1, r() * 2 - 1);
    vehicle.position = new Vector(r() * config.WINDOW_WIDTH, r() * config.WINDOW_HEIGHT);
    world.addVehicle(vehicle);
  }

  world.start();
};

module.exports = sketch;

},{"./Vector":2,"./Vehicle":3,"./World":4,"./config":5}],10:[function(require,module,exports){
'use strict';

const config = require('./config');
const World = require('./World');
const Vehicle = require('./Vehicle');
const Vector = require('./Vector');

const numVehicles = 100;

const sketch = function (p5) {

  const steerfn = function () {
    if (!this.brain.noiseOffset) {
      this.brain.noiseOffset = Math.random() * 100000;
      this.brain.t = 0;
      this.brain.dt = 0.01;
    }

    const degrees = p5.noise(this.brain.t + this.brain.noiseOffset, 0) - 0.5;
    const accel = p5.noise(0, this.brain.t + this.brain.noiseOffset) - 0.5;

    this.velocity.angle = this.velocity.angle + degrees / 10;
    this.velocity.length = this.velocity.length + accel / 10;

    this.brain.t += this.brain.dt;
  };

  const world = new World();
  world.addCanvas(p5);
  world.trails = true;

  for (let i = 0; i < numVehicles; i++) {
    const vehicle = new Vehicle(p5);
    const r = Math.random;
    vehicle.velocity = new Vector(r() * 2 - 1, r() * 2 - 1);
    vehicle.position = new Vector(r() * config.WINDOW_WIDTH, r() * config.WINDOW_HEIGHT);
    vehicle.steer = steerfn;
    world.addVehicle(vehicle);
  }

  world.start();
};

module.exports = sketch;

},{"./Vector":2,"./Vehicle":3,"./World":4,"./config":5}]},{},[1]);
