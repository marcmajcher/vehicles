package util 
{
	
	/**
	 * ...
	 * @author Marc Majcher
	 */
	public class Vector 
	{
		private var _x:Number;
		private var _y:Number;
		
		public function Vector(x:Number=0, y:Number=0) 
		{
			_x = x;
			_y = y;
		}
		
		public function get x():Number {
			return _x;
		}
		public function get y():Number {
			return _y;
		}
	}
	
}