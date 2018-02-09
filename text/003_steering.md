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
