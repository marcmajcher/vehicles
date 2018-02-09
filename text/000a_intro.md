# Vehicle 0

To start, we're just going to get set up and put something on the screen that moves. To do that, we're going to set up a World that uses a p5 canvas to draw on, and add one simple Vehicle to it that just moves to the right.

## Our world

> class World {
>   constructor() {
>     this.vehicles = [];
>   }
>
>   addCanvas(p5) {
>     this.p5 = p5;
>
>     p5.setup = () => {
>       p5.createCanvas(config.WINDOW_WIDTH, config.WINDOW_HEIGHT);
>
>       const vehicle = new Vehicle(p5);
>       this.vehicles.push(vehicle);
>     };
>
>     p5.draw = () => {
>       p5.background(config.BACKGROUND_COLOR);
>
>       // move all vehicles, then draw them
>       // NB: vehicles move in order, not simultaneously
>       this.vehicles.forEach((vehicle) => {
>         vehicle.step();
>       });
>       this.vehicles.forEach((vehicle) => {
>         vehicle.draw();
>       });
>     };
>
>   }
> }

## Our Vehicle

> class Vehicle {
>   constructor(p) {
>     this.p = p;
>     this.x = 10;
>     this.y = config.WINDOW_HEIGHT / 2;
>     this.thickness = 2;
>     this.size = 10;
>   }
>
>   step() {
>     this.x += 1;
>   }
>
>   draw() {
>     this.p.stroke(config.VEHICLE_COLOR);
>     this.p.strokeWeight(this.thickness);
>
>     this.p.beginShape();
>     this.p.vertex(this.x - this.size, this.y - this.size);
>     this.p.vertex(this.x, this.y);
>     this.p.vertex(this.x - this.size, this.y + this.size);
>     this.p.endShape();
>   }
> }

Then we just create the world and add it to the canvas, and it goes!

> const sketch = function (p) {
>   const world = new World();
>   world.addCanvas(p);
> };

There are a few things to notice with this. First, it can only move in one direction (to the right), and even if we did try to turn it somehow, it would still draw itself facing to the right. We could go in and fiddle with the x and y of the vehicle in the step() method, but we'd still have to do a lot of work to do more than anything very simple.

So, next up, we're going to update the Vehicle class to use a Vector. A vector is simply a thing that points to a certain x and y coordinate, but we can use it for a lot of things, that we'll see very shortly. It may seem like a weird extra step to do, but hang on.
