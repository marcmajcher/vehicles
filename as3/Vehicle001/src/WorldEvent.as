package  
{
	import flash.events.Event;
	
	/**
	 * @author Marc Majcher
	 */
	
	public class WorldEvent extends Event 
	{
		public static const UPDATE_WORLD:String = "world-event-update-world";
		public var data:Object;
		
		public function WorldEvent(type:String, eventData:Object=null, bubbles:Boolean=false, cancelable:Boolean=false) 
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
			return formatToString("WorldEvent", "type", "data", "bubbles", "cancelable", "eventPhase"); 
		}
		
	}
	
}