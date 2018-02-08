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
		private static var idCounter:int = 1000;
		private var _id:int;
		
		private var _position:Vector;
		private var _velocity:Vector = new Vector(0, 0);
		private var _maxSpeed:Number = 5;
		
		private var _target:Vehicle;
		private var _steeringVector:Vector = new Vector(0, 0);
		
		public function Vehicle(x:Number, y:Number) 
		{
			_position = new Vector(x, y);
			_id = idCounter;
			idCounter++;
			
			update();
		}
		
		private function steer():void {
			if (_target != null) {
				var targetV:Vector = _position.subtract(_target.position);
				targetV.normalize();
				targetV = targetV.multiply(_maxSpeed);
				
				_steeringVector = _velocity.subtract(targetV);
			}
		}
		
		
		public function set target(t:Vehicle):void {
			_target = t;
		}
		
		public function set velocity(v:Vector):void {
			_velocity = v;
		}
		public function get velocity():Vector {
			return _velocity;
		}
		
		public function update():void {
			// update velocity
			steer();
			_velocity = _velocity.add(_steeringVector);
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
		
		public function get position():Vector {
			return _position;
		}
		
	}
	
}