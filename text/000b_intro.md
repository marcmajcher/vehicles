# Vehicle 0

## Vectors!

> class Vector {
>   constructor(x, y) {
>     this.x = x;
>     this.y = y;
>   }
> }

Now we can just keep a vector for position and velocity in our vehicle:

> this.position = new Vector(10, config.WINDOW_HEIGHT / 2);
> this.velocity = new Vector(1, 0);

And just add the velocity to the current position each step to move it:

> step() {
>   this.position.add(this.velocity);
> }

And now! We just need to draw the vehicle pointing in the right direction in the vehicle's draw() method:

> const tail1 = this.velocity.rotate(this.position.x - this.size, this.position.y - this.size);
> const tail2 = this.velocity.rotate(this.position.x - this.size, this.position.y + this.size);
>
> p.beginShape();
> p.vertex(tail1.x, tail1.y);
> p.vertex(this.position.x, this.position.y);
> p.vertex(tail2.x, tail2.y);
> p.endShape();

And that'll do it! Or not... We'll also have to add the addition and rotation methods to our Vector class:

> add(vec) {
>   this.x += vec.x;
>   this.y += vec.y;
> }
>
> rotate(xin, yin) {
>   const radians = Math.atan2(this.y, this.x);
>   const x = xin * Math.cos(radians) - yin * Math.sin(radians);
>   const y = xin * Math.sin(radians) + yin * Math.cos(radians);
>   return { x, y };
> }

And NOW that'll do it. Nothing has changed on the outside, but our insides got a little bit smarter.

Let's just add one more little detail to how our vehicle moves. Right now, if it goes off the edge (it will run off the right edge pretty quickly in our current setup), it's gone forever. We'd like our vehicles to stick around a while, so we're going to have vehicles that go off the edge wrap around to the other edge. (This makes our world a torus, shaped like a donut with the top and bottom edges touching, and the right and left edges touching.) To do this, we're just going to add a little check to our vehicle's step() method:

> step() {
>   this.position.add(this.velocity);
>   this.wrap();
> }

And do our checking in a new wrap() method, with a little wiggle room to make it smoother:

> wrap() {
>   const width = this.p.width + this.size;
>   const height = this.p.height + this.size;
>
>   if (this.position.x < 0) {
>     this.position.x = width;
>   }
>   else if (this.position.x > width) {
>     this.position.x = 0;
>   }
>   if (this.position.y < 0) {
>     this.position.y = height;
>   }
>   else if (this.position.y > height) {
>     this.position.y = 0;
>   }
> }

And *THAT'S* it.
