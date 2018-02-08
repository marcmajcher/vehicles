package event
{
	import flash.events.Event;
	
	/**
	 * @author Marc Majcher
	 */
	
	public class VehicleEvent extends Event 
	{
		public static const UPDATE_VEHICLE:String = "vehicle-event-update-world";
		public var data:Object;
		
		public function VehicleEvent(type:String, eventData:Object=null, bubbles:Boolean=false, cancelable:Boolean=false) 
		{ 
			super(type, bubbles, cancelable);
			data = eventData;
		} 
		
		public override function clone():Event 
		{ 
			return new WorldEvent(type, data, bubbles, cancelable);
		} 
		
		public override function toString():String 
		{ 
			return formatToString("VehicleEvent", "type", "data", "bubbles", "cancelable", "eventPhase"); 
		}
		
	}
	
}