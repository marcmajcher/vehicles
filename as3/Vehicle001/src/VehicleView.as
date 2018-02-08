package  
{
	import flash.display.Sprite;
	
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
			graphics.moveTo( -10, -10);
			graphics.lineTo(0, 0);
			graphics.lineTo( -10, 10);
		}
		
		private function onUpdate(evt:VehicleEvent):void {
			x = evt.target.x;
			y = evt.target.y;
			rotation = Math.atan2(y, x) * 180 / Math.PI;
		}
		
	}
	
}