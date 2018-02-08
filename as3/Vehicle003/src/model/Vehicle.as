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
		private var _x:Number;
		private var _y:Number;
		private var _facing:Vector;
		private var _velocity:Vector = new Vector(0, 0);
		
		public function Vehicle(x:Number, y:Number) 
		{
			_x = x;
			_y = y;
			update();
		}
		
		public function set velocity(v:Vector):void {
			_velocity = v;
			_facing = v;
		}
		public function get velocity():Vector {
			return _velocity;
		}
		
		public function update():void {
			_x += _velocity.x;
			_y += _velocity.y;
			dispatchEvent(new VehicleEvent(VehicleEvent.UPDATE_VEHICLE));
		}
		
		public function get x():Number {
			return _x;
		}
		public function set x(newx:Number):void {
			_x = newx;
			//dispatchEvent(new VehicleEvent(VehicleEvent.UPDATE_VEHICLE));
		}
		public function set y(newy:Number):void {
			_y = newy;
			//dispatchEvent(new VehicleEvent(VehicleEvent.UPDATE_VEHICLE));
		}
		public function get y():Number {
			return _y;
		}
		
	}
	
}