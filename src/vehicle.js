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
