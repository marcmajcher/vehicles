package 
{
	import flash.display.Sprite;
	import flash.events.Event;
	
	/**
	 * ...
	 * @author Marc Majcher
	 */
	public class Main extends Sprite 
	{
		private var _world:World;
		private var _worldView:WorldView;
		
		public function Main():void 
		{
			if (stage) init();
			else addEventListener(Event.ADDED_TO_STAGE, init);
		}
		
		private function init(e:Event = null):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, init);
			// entry point
			
			_world = new World();
			_worldView = new WorldView(_world);
			addChild(_worldView);
			_worldView.x = _worldView.y = 0;
			
			var vehicle:Vehicle = new Vehicle(100, 100);
			vehicle.velocity = new Vector(1, 1);
			_world.addVehicle(vehicle);
			
			_world.start();
		}
		
	}
	
}