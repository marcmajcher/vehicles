(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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
  new p5(vehicles[6], 'vehicles006');
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
    // this.maxTurn = 0.3;
  }

  clone() {
    return new Vector(this.x, this.y);
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

  normalize() {
    if (this.length === 0) {
      this.x = 1;
      this.y = 0;
    }
    else {
      const len = this.length;
      this.x /= len;
      this.y /= len;
    }
    return this;
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

    this.color = config.VEHICLE_COLOR;
    this.trailColor = config.TRAILS_COLOR;
    this.thickness = config.VEHICLE_THICKNESS;
    this.size = config.VEHICLE_SIZE;
    this.size2 = (this.size * 2.2) * (this.size * 2.2); // for collisions
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

  collide(vehicle) {
    const COLL_OFF = 1.1;
    const p1 = this.position;
    const p2 = vehicle.position;
    let distance = Math.abs((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
    if (distance < this.size2) {
      distance = Math.sqrt(distance);
      const midpoint = p1.clone().add(p2).scale(0.5);
      p1.x = midpoint.x + this.size * COLL_OFF * (p1.x - p2.x) / distance;
      p1.y = midpoint.y + this.size * COLL_OFF * (p1.y - p2.y) / distance;
      p2.x = midpoint.x + vehicle.size * COLL_OFF * (p2.x - p1.x) / distance;
      p2.y = midpoint.y + vehicle.size * COLL_OFF * (p2.y - p1.y) / distance;
    }
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
    p.stroke(this.color);
    p.strokeWeight(this.thickness);

    const tail1 = this.velocity.rotate(-this.size / 2, -this.size);
    const center = this.velocity.rotate(this.size / 2, 0);
    const tail2 = this.velocity.rotate(-this.size / 2, this.size);

    p.noFill();
    p.beginShape();
    p.vertex(this.position.x + tail1.x, this.position.y + tail1.y);
    p.vertex(this.position.x + center.x, this.position.y + center.y);
    p.vertex(this.position.x + tail2.x, this.position.y + tail2.y);
    p.endShape();
  }

  drawTrail(buffer) {
    buffer.noStroke();
    buffer.fill(this.trailColor);
    buffer.ellipse(this.position.x / 2, this.position.y / 2, this.size * 0.7);
  }

}

module.exports = Vehicle;

},{"./Vector":2,"./config":5}],4:[function(require,module,exports){
'use strict';

const config = require('./config');

class World {
  constructor() {
    this.init = () => {};
    this.collide = true;
    this.numVehicles = config.NUM_VEHICLES;
    this.running = false;
    this.showVehicles = true;
    this.toggle = false;
    this.trails = true;
    this.vehicles = [];
  }

  start() {
    this.vehicles = [];
    this.init();
    this.running = true;
  }

  pause() {
    this.running = false;
  }

  play() {
    this.running = true;
  }

  addVehicle(vehicle) {
    this.vehicles.push(vehicle);
  }

  step() {
    // move all vehicles, then draw them
    // NB: vehicles move in order, not simultaneously
    if (!this.toggle) {
      for (let i = 0; i < this.vehicles.length; i++) {
        this.vehicles[i].step();
        for (let j = i + 1; this.collide && j < this.vehicles.length; j++) {
          this.vehicles[i].collide(this.vehicles[j]);
        }
      }

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

  addCanvas(p5) {
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

        this.step();
      }
    };

    const keyActions = {
      32: () => { // space - pause/resume
        this.running = !this.running;
      },
      67: () => { // c - collide
        this.collide = !this.collide;
      },
      82: () => { // r - restart
        this.trailBuffer = p5.createGraphics(p5.width, p5.height); // can't do p5 stuff out there
        this.start();
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

  NUM_VEHICLES: 100,
  VEHICLE_COLOR: 'rgba(0,0,0,1)',
  VEHICLE_MIN_SPEED: 0.5,
  VEHICLE_MAX_SPEED: 3,
  VEHICLE_MAX_TURN: 10,
  VEHICLE_SIZE: 6,
  VEHICLE_THICKNESS: 2,

  BACKGROUND_COLOR: '#fff',
  TRAILS_COLOR: 'rgba(0,0,0,0.01 )',
};

},{}],6:[function(require,module,exports){
'use strict';

module.exports = [
  require('./vehicles000'),
  require('./vehicles001'),
  require('./vehicles002'),
  require('./vehicles003'),
  require('./vehicles004'),
  require('./vehicles005'),
  require('./vehicles006'),
];

},{"./vehicles000":7,"./vehicles001":8,"./vehicles002":9,"./vehicles003":10,"./vehicles004":11,"./vehicles005":12,"./vehicles006":13}],7:[function(require,module,exports){
'use strict';

const World = require('./World');
const Vehicle = require('./Vehicle');
const Vector = require('./Vector');

const sketch = function (p5) {
  const world = new World();
  world.addCanvas(p5);
  world.trails = false;

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
  world.trails = false;

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

const sketch = function (p5) {

  const steering = function () {
    if (!this.brain.noiseOffset) {
      this.brain.noiseOffset = Math.random() * 100000;
      this.brain.t = 0;
      this.brain.dt = 0.01;
    }

    const degrees = p5.noise(this.brain.t + this.brain.noiseOffset, 0) - 0.5;
    const accel = p5.noise(0, this.brain.t + this.brain.noiseOffset) - 0.5;

    this.velocity.angle = this.velocity.angle + degrees / 20;
    this.velocity.length = this.velocity.length + accel / 30;

    this.brain.t += this.brain.dt;
  };

  const init = function () {
    for (let i = 0; i < this.numVehicles; i++) {
      const vehicle = new Vehicle(p5);
      const r = Math.random;
      vehicle.velocity = new Vector(r() * 2 - 1, r() * 2 - 1);
      vehicle.position = new Vector(r() * config.WINDOW_WIDTH, r() * config.WINDOW_HEIGHT);
      vehicle.steer = steering;
      this.addVehicle(vehicle);
    }
  };

  const world = new World();
  world.addCanvas(p5);
  world.init = init;
  world.start();
};

module.exports = sketch;

},{"./Vector":2,"./Vehicle":3,"./World":4,"./config":5}],11:[function(require,module,exports){
'use strict';

const config = require('./config');
const World = require('./World');
const Vehicle = require('./Vehicle');
const Vector = require('./Vector');

const sketch = function (p5) {

  const steering = function () {
    if (this.brain.target) {
      const targetVector = this.position.clone();
      targetVector.sub(this.brain.target);
      targetVector.normalize();

      this.velocity.sub(targetVector);
    }
  };

  const init = function () {
    const target = new Vector(config.WINDOW_WIDTH / 2, config.WINDOW_HEIGHT / 2);

    for (let i = 0; i < this.numVehicles; i++) {
      const vehicle = new Vehicle(p5);
      const r = Math.random;
      vehicle.velocity = new Vector(r() * 2 - 1, r() * 2 - 1);
      vehicle.position = new Vector(r() * config.WINDOW_WIDTH, r() * config.WINDOW_HEIGHT);
      vehicle.steer = steering;
      vehicle.brain.target = target;
      this.addVehicle(vehicle);
    }
  };

  const world = new World();
  world.addCanvas(p5);
  world.init = init;
  world.start();
};

module.exports = sketch;

},{"./Vector":2,"./Vehicle":3,"./World":4,"./config":5}],12:[function(require,module,exports){
'use strict';

// FOLLOW/conga

const config = require('./config');
const World = require('./World');
const Vehicle = require('./Vehicle');
const Vector = require('./Vector');

const sketch = function (p5) {

  const perlinSteer = function (factor = 1) {
    if (!this.brain.noiseOffset) {
      this.brain.noiseOffset = Math.random() * 100000;
      this.brain.t = 0;
      this.brain.dt = 0.01;
    }

    const degrees = p5.noise(this.brain.t + this.brain.noiseOffset, 0) - 0.5;
    const accel = p5.noise(0, this.brain.t + this.brain.noiseOffset) - 0.5;

    this.velocity.angle = this.velocity.angle + (degrees / 20) * factor;
    this.velocity.length = this.velocity.length + (accel / 30) * factor;

    this.brain.t += this.brain.dt;
  };

  const steering = function () {
    if (this.brain.target) {
      const targetVector = this.brain.target.position.clone();
      targetVector.sub(this.position);
      targetVector.normalize();
      this.velocity.add(targetVector);
    }
    perlinSteer.call(this, 5);
  };

  const init = function () {
    for (let i = 0; i < this.numVehicles; i++) {
      const vehicle = new Vehicle(p5);
      const r = Math.random;
      vehicle.velocity = new Vector(r() * 2 - 1, r() * 2 - 1);
      vehicle.position = new Vector(r() * config.WINDOW_WIDTH, r() * config.WINDOW_HEIGHT);
      if (i > 0) {
        vehicle.brain.target = this.vehicles[i - 1];
        vehicle.steer = steering;
      }
      else {
        vehicle.steer = perlinSteer;
      }
      this.addVehicle(vehicle);
    }
  };

  const world = new World();
  world.addCanvas(p5);
  world.init = init;
  world.start();
};

module.exports = sketch;

},{"./Vector":2,"./Vehicle":3,"./World":4,"./config":5}],13:[function(require,module,exports){
'use strict';

// FOLLOW/conga

const config = require('./config');
const World = require('./World');
const Vehicle = require('./Vehicle');
const Vector = require('./Vector');

const sketch = function (p5) {

  const perlinSteer = function (factor = 1) {
    if (!this.brain.noiseOffset) {
      this.brain.noiseOffset = Math.random() * 100000;
      this.brain.t = 0;
      this.brain.dt = 0.01;
    }

    const degrees = p5.noise(this.brain.t + this.brain.noiseOffset, 0) - 0.5;
    const accel = p5.noise(0, this.brain.t + this.brain.noiseOffset) - 0.5;

    this.velocity.angle = this.velocity.angle + (degrees / 20) * factor;
    this.velocity.length = this.velocity.length + (accel / 30) * factor;

    this.brain.t += this.brain.dt;
  };

  const steering = function () {
    if (this.brain.target) {
      const targetVector = this.brain.target.position.clone();
      targetVector.sub(this.position);
      targetVector.normalize();
      this.velocity.add(targetVector);
    }
    perlinSteer.call(this, 5);
  };

  const init = function () {
    for (let i = 0; i < this.numVehicles; i++) {
      const vehicle = new Vehicle(p5);
      const r = Math.random;
      vehicle.position = new Vector(r() * config.WINDOW_WIDTH, r() * config.WINDOW_HEIGHT);
      vehicle.velocity = new Vector(r() * 2 - 1, r() * 2 - 1);
      if (i > 0) {
        vehicle.brain.target = this.vehicles[i - 1];
        vehicle.steer = steering;
      }
      else {
        vehicle.steer = perlinSteer;
        vehicle.velocity.scale(config.VEHICLE_MAX_SPEED);
        vehicle.color = 'rgb(255,0,0)';
        vehicle.trailColor = 'rgba(255,0,0,0.01)';
      }
      this.addVehicle(vehicle);
    }
  };

  const world = new World();
  world.addCanvas(p5);
  world.init = init;
  world.start();
};

module.exports = sketch;

},{"./Vector":2,"./Vehicle":3,"./World":4,"./config":5}]},{},[1]);
