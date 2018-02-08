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
		private static const BEHAVIOR_FOLLOW:String = "vehicle-behavior-follow";
		private static const BEHAVIOR_FLEE:String = "vehicle-behavior-flee";
		private static const BEHAVIOR_WANDER:String = "vehicle-behavior-wander";
		
		private var _position:Vector;
		private var _velocity:Vector = new Vector(0, 0);
		private var _maxSpeed:Number = 5;
		
		private const _boredThreshhold:int = 1000;
		private var _bored:int = Math.random() * _boredThreshhold;
		
		private var _target:Vehicle;
		private var _steeringVector:Vector = new Vector(0, 0);
		private var _behavior:String
		
		private static var idCount:int = 0;
		private var _id:int;
		
		public function Vehicle(x:Number, y:Number) 
		{
			_id = idCount;
			idCount++;
			
			_position = new Vector(x, y);
			
			if (Math.random() < .5) {
				_behavior = BEHAVIOR_FOLLOW;
			}
			else {
				_behavior = BEHAVIOR_FLEE;
			}
			
			update();
		}
		
		private function steer():void {
			if (_target != null) {
				
				// follow until bored, then flee until bored of fleeing, then follow again
				if (_bored > _boredThreshhold) {
					if (_behavior == BEHAVIOR_FOLLOW) {
						_behavior = BEHAVIOR_FLEE;
						_bored = Math.random() * _boredThreshhold;
					}
					else {
						_behavior = BEHAVIOR_WANDER
					}
				}
				else if (_bored < 0) {
					_behavior = BEHAVIOR_FOLLOW;
				}
				_bored = (_behavior != BEHAVIOR_WANDER) ? (_bored + (Math.random() * 10)) : (_bored - (Math.random() * 50));
				
				
				var targetV:Vector = _position.subtract(_target.position);
				targetV.normalize();
				targetV = targetV.multiply(_maxSpeed);
				
				if (_behavior == BEHAVIOR_FLEE) {
					_steeringVector = _velocity.subtract(targetV.reverse()); 
				}
				else if (_behavior == BEHAVIOR_FOLLOW) {
					_steeringVector = _velocity.subtract(targetV); 
				}
				else {
					_steeringVector.angle = _steeringVector.angle + (Math.random() - .5) / 10;
				}
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
		
		public function get id():int {
			return _id;
		}
		
	}
	
}