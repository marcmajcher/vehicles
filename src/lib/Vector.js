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
