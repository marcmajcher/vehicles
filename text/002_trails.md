# Vehicle 2

## Trails

in World:

> p5.setup = () => {
>   p5.createCanvas(config.WINDOW_WIDTH, config.WINDOW_HEIGHT);
>   this.trailBuffer = p5.createGraphics(p5.width, p5.height);
> };
>
> p5.draw = () => {
>   if (this.running) {
>     p5.background(config.BACKGROUND_COLOR);
>     if (this.trails) {
>       p5.image(this.trailBuffer, 0, 0, p5.width, p5.height);
>     }
>
>     // move all vehicles, then draw them
>     // NB: vehicles move in order, not simultaneously
>     this.vehicles.forEach((vehicle) => {
>       vehicle.step();
>     });
>     this.vehicles.forEach((vehicle) => {
>       vehicle.drawTrail(this.trailBuffer);
>       if (this.showVehicles) {
>         vehicle.draw();
>       }
>     });
>   }
>

in Vehicle

> drawTrail(buffer) {
>   buffer.noStroke();
>   buffer.fill(config.TRAILS_COLOR);
>   buffer.ellipse(this.position.x / 2, this.position.y / 2, this.size * 0.7);
> }



And also added some key stuff

> p5.keyPressed = () => {
>   if (p5.keyCode === 32) { // space
>     this.showVehicles = !this.showVehicles;
>   }
>   else if (p5.keyCode === 84) {
>     this.trails = !this.trails;
>   }
>   // console.log(p5.keyCode);
> };
