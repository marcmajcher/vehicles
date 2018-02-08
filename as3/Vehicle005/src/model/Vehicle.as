package model 
{
	import event.VehicleEvent;
	import flash.events.EventDispatcher;
	import util.Vector;
	
	/**
	 * @author Marc Majcher
	 * 
	 * Model for a generic vehicle.
	 */
	
	public class Vehicle extends EventDispatcher
	{
		private var _position:Vector;
		private var _velocity:Vector = new Vector(0, 0);
		private var _maxSpeed:Number = 5;
		
		private var _turnVector:Vector = new Vector(.1, 0);
		
		public function Vehicle(x:Number, y:Number) 
		{
			_position = new Vector(x, y);
			update();
		}
		
		public function set velocity(v:Vector):void {
			_velocity = v;
		}
		public function get velocity():Vector {
			return _velocity;
		}
		
		public function update():void {
			// update velocity
			//_velocity = _velocity.add(_turnVector);
			//_turnVector.angle = _turnVector.angle + (Math.random() - .5) / 10;
			_velocity.angle = _velocity.angle + (Math.random() - .5) / 10;
			
			_velocity.max(_maxSpeed);

			// update position
			_position = _position.add(_velocity);
			dispatchEvent(new VehicleEvent(VehicleEvent.UPDATE_VEHICLE));
		}
		
		public function get x():Number {
			return _position.x;
		}
		public function set x(newx:Number):void {
			_position.x = newx;
		}
		public function get y():Number {
			return _position.y;
		}
		public function set y(newy:Number):void {
			_position.y = newy;
		}
		
	}
	
}