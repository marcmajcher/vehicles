package view 
{
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.Graphics;
	import flash.display.Sprite;
	import flash.geom.ColorTransform;
	import flash.geom.Matrix;
	import flash.text.TextField;
	import model.Vehicle;
	import model.World;
	import event.WorldEvent;
	
	/**
	 * @author Marc Majcher
	 */
	
	public class WorldView extends Sprite
	{
		private const SHOW_TRAILS:Boolean = true;
		private var _world:World;
		private var _trails:Bitmap;
		
		private var _vehicleViews:Array;
		
		public function WorldView(world:World) 
		{
			_world = world;
			_world.addEventListener(WorldEvent.INIT_WORLD, onInit);
			_world.addEventListener(WorldEvent.UPDATE_WORLD, onUpdate);
			clearWorldView();
		}
		
		public function clearWorldView():void {
			while (numChildren > 0) {
				removeChildAt(0);
			}
			var trailData:BitmapData = new BitmapData(World.WORLD_WIDTH, World.WORLD_HEIGHT, false);
			_trails = new Bitmap(trailData);
			_trails.x = _trails.y = 0;			
			addChild(_trails);
		}
		
		private function onInit(evt:WorldEvent):void {
			clearWorldView();
			_vehicleViews = new Array();
			for each (var vehicle:Vehicle in _world.vehicles) {
				var vv:VehicleView = new VehicleView(vehicle);
				addChild(vv);
				_vehicleViews.push(vv);
			}
		}
		
		private function onUpdate(evt:WorldEvent):void {
			if (SHOW_TRAILS) {
				var matrix:Matrix = new Matrix();
				var transform:ColorTransform = new ColorTransform(0, 0, 0, .05);
				var rad:Number = Math.PI / 180;
				
				_trails.bitmapData.lock();
				for each (var vv:VehicleView in _vehicleViews) {
					matrix.identity();
					matrix.rotate(vv.rotation * rad);
					matrix.translate(vv.x, vv.y);
					_trails.bitmapData.draw(vv, matrix, transform);
				}
				_trails.bitmapData.unlock();
			}
		}
			
	}
	
}