package view 
{
	import event.VehicleEvent;
	import flash.display.Sprite;
	import model.Vehicle;
	
	/**
	 * @author Marc Majcher
	 */
	
	public class VehicleView extends Sprite
	{
		private var _vehicle:Vehicle;
		private var _color:int = 0;
		
		public function VehicleView(vehicle:Vehicle) 
		{
			_vehicle = vehicle
			_vehicle.addEventListener(VehicleEvent.UPDATE_VEHICLE, onUpdate);
			draw();
		}
		
		private function draw():void {
			graphics.lineStyle(2, _color);
			graphics.moveTo( -5, -5);
			graphics.lineTo(0, 0);
			graphics.lineTo( -5, 5);
		}
		
		private function onUpdate(evt:VehicleEvent):void {
			x = evt.target.x;
			y = evt.target.y;
			var vx:Number = evt.target.velocity.x;
			var vy:Number = evt.target.velocity.y; 
			rotation = Math.atan2(vy, vx) * 180 / Math.PI;
		}
		
	}
	
}