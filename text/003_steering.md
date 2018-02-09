# Vehicle 3

## Steering

> const steerfn = function () {
>   this.velocity = new Vector(1, 1);
> };
>
> const sketch = function (p5) {
>   const world = new World();
>   world.addCanvas(p5);
>   world.trails = true;
>
>   for (let i = 0; i < numVehicles; i++) {
>     const vehicle = new Vehicle(p5);
>     const r = Math.random;
>     vehicle.velocity = new Vector(r() * 2 - 1, r() * 2 - 1);
>     vehicle.position = new Vector(r() * config.WINDOW_WIDTH, r() * config.WINDOW_HEIGHT);
>     vehicle.steer = steerfn;
>     world.addVehicle(vehicle);
>   }
>
>   world.start();
> };

in Vehicle:

>   constructor(p) {
> this.steer = () => {};
> }

> step() {
>   this.steer();
>   this.position.add(this.velocity);
>   this.wrap();
> }

Also added a bunch of sweet key control stuff to toggle vehicles and trails on and off, play/pause/step the sketch, and restart it.

Pulled the brains of the vehicles out into an steer() method that is attached to the vehicle, and the initial setup to an init() method that's passed into the world. Now we're cooking.

Changed the steer method to turn and accelerate randomly with Perlin noise, so the vehicles wander some. NEAT.
