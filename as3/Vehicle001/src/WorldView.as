package  
{
	import flash.display.Sprite;
	
	/**
	 * @author Marc Majcher
	 */
	
	public class WorldView extends Sprite
	{
		private var _world:World;
		
		public function WorldView(world:World) 
		{
			_world = world;
			_world.addEventListener(WorldEvent.UPDATE_WORLD, onUpdate);
		}
		
		private function onUpdate(evt:WorldEvent):void {
			clearChildren();
			for each (var vehicle:Vehicle in _world.vehicles) {
				var vv:VehicleView = new VehicleView(vehicle);
				vv.x = 100;
				vv.y = 100;
				addChild(vv);
			}
		}
		
		private function clearChildren():void {
			while (numChildren > 0) {
				removeChildAt(0);
			}
		}
		
	}
	
}