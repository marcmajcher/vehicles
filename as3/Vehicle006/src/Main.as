package 
{
	import flash.display.Sprite;
	import flash.events.Event;
	import model.*;
	import util.Vector;
	import view.WorldView;
	
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
			
			for (var i:int = 0; i < 100; i++) {
				var vehicle:Vehicle = new Vehicle(Math.random() * 800, Math.random() * 600);
				vehicle.velocity = new Vector(Math.random() * 6 - 3, Math.random() * 6 - 3);
				_world.addVehicle(vehicle);
			}
			
			_world.start();
		}
		
	}
	
}