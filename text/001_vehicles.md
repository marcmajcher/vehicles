# Vehicle 1

## Lots of Vehicles!

Okay, we can do one better: ONE HUNDRED VEHICLES

I've updated the world and vehicle classes so we can set them up from the outside, and we're going to add a hundred vehicles with random velocities and starting positions and set them running.

> const world = new World();
> world.addCanvas(p5);
>
> for (let i = 0; i < numVehicles; i++) {
>   const vehicle = new Vehicle(p5);
>   const r = Math.random;
>   vehicle.velocity = new Vector(r() * 2 - 1, r() * 2 - 1);
>   vehicle.position = new Vector(r() * config.WINDOW_WIDTH, r() * config.WINDOW_HEIGHT);
>   world.addVehicle(vehicle);
> }
>
> world.start();

LOOKIT ALL THE BIRDS
