# vehicles

Here's the deal. I've got a set of vehicles simulations in actionscript, and I'm going to move them over to p5/javascript, and write up the stuff I started writing about them before. And then keep going.

The vehicles are based on/inspired by [Braitenberg vehicles](https://en.wikipedia.org/wiki/Braitenberg_vehicle), but diverge significantly pretty quickly, as I add my own takes on stuff.

By necessity, I'm going to talk a little bit about implementation, with vectors and whatnot, up top, but hopefully won't mess the explanations up with too much technical garbage too quickly.

## What is a vehicle?

At the simplest level, a vehicle is an object that moves autonomously in an environment, with sensors that measure one or more inputs and motors that drive its motion according to some kind of rules based on those inputs.

>Depending on how sensors and wheels are connected, the vehicle exhibits different behaviors (which can be goal-oriented). This means that, depending on the sensor-motor wiring, it appears to strive to achieve certain situations and to avoid others, changing course when the situation changes.
