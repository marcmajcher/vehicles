package  
{
	import flash.events.EventDispatcher;
	
	/**
	 * @author Marc Majcher
	 * 
	 * Model for a generic vehicle.
	 */
	
	public class Vehicle extends EventDispatcher
	{
		private var _x:Number;
		private var _y:Number;
		private var _velocity:Vector = new Vector(0, 0);
		
		public function Vehicle(x:Number, y:Number) 
		{
			_x = x;
			_y = y;
			update();
		}
		
		public function set velocity(v:Vector):void {
			_velocity = v;
		}
		
		public function update():void {
			_x += _velocity.x;
			_y += _velocity.y;
			dispatchEvent(new VehicleEvent(VehicleEvent.UPDATE_VEHICLE));
		}
		
		public function get x():Number {
			return _x;
		}
		public function get y():Number {
			return _y;
		}
		
	}
	
}