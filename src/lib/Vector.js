'use strict';

const config = require('./config');

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
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

  worldSub(vec) {
    // this.x -= vec.x;
    // this.y -= vec.y;
    // return this;

    let xdiff = this.x - vec.x;
    if (xdiff > (config.WINDOW_WIDTH / 2)) {
      xdiff -= config.WINDOW_WIDTH;
    }
    else if (xdiff < (config.WINDOW_WIDTH / -2)) {
      xdiff += config.WINDOW_WIDTH;
    }
    this.x = xdiff;

    let ydiff = this.y - vec.y;
    if (ydiff > (config.WINDOW_HEIGHT / 2)) {
      ydiff -= config.WINDOW_HEIGHT;
    }
    else if (ydiff < (config.WINDOW_HEIGHT / -2)) {
      ydiff += config.WINDOW_HEIGHT;
    }
    this.y = ydiff;

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

  get angle() { // in radians
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
