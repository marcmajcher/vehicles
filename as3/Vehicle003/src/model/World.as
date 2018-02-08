﻿package model  
{
	import event.WorldEvent;
	import flash.events.EventDispatcher;
	import flash.events.TimerEvent;
	import flash.utils.Timer;

	/**
	 * @author Marc Majcher
	 */

	 public class World extends EventDispatcher
	{
		private const TIMER_STEP:int = 30;
		private const WORLD_WIDTH:int = 800;
		private const WORLD_HEIGHT:int = 600;
		
		private var _vehicles:Array = new Array();
		private var _worldTimer:Timer = new Timer(TIMER_STEP);

		public function World() 
		{
			_worldTimer.addEventListener(TimerEvent.TIMER, onTimer);

		}
		
		public function addVehicle(v:Vehicle):void {
			_vehicles.push(v);
			dispatchEvent(new WorldEvent(WorldEvent.UPDATE_WORLD));
		}
		
		public function get vehicles():Array {
			return _vehicles;
		}
		
		public function start():void {
			_worldTimer.start();
		}
		
		private function onTimer(evt:TimerEvent):void {
			for each (var vehicle:Vehicle in _vehicles) {
				// wrap vehicles
				if (vehicle.x > WORLD_WIDTH) {
					vehicle.x = 0;
				}
				else if (vehicle.x < 0) {
					vehicle.x = WORLD_WIDTH;
				}
				
				if (vehicle.y > WORLD_HEIGHT) {
					vehicle.y = 0;
				}
				else if (vehicle.y < 0) {
					vehicle.y = WORLD_HEIGHT;
				}
				
				vehicle.update();
			}
		}
		
	}
	
}