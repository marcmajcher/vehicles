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
		
		public function set x(val:Number):void {
			_x = val;
		}
		public function get x():Number {
			return _x;
		}
		public function set y(val:Number):void {
			_y = val;
		}
		public function get y():Number {
			return _y;
		}
		
		public function get length():Number {
			return Math.sqrt(_x * _x + _y * _y);
		}
		public function set length(l:Number):void {
			var a:Number = angle;
			_x = Math.cos(a) * l;
			_y = Math.sin(a) * l;
		}
		public function get angle():Number {
			return Math.atan2(_y, _x);
		}
		public function set angle(a:Number):void {
			var l:Number = length;
			_x = Math.cos(a) * l;
			_y = Math.sin(a) * l;
		}
		
		public function add(vec:Vector):Vector {
			return new Vector(_x + vec.x, _y + vec.y);
		}
		public function subtract(vec:Vector):Vector {
			return new Vector(_x - vec.x, _y - vec.y);
		}
		public function multiply(num:Number):Vector {
			return new Vector(_x * num, _y * num);
		}
		public function divide(num:Number):Vector {
			return new Vector(_x / num, _y / num);
		}
		
		public function max(num:Number):Vector {
			length = Math.min(num, length);
			return this;
		}
		
		public function reverse():Vector {
			_x = -_x;
			_y = -_y;
			return this;
		}
		
		public function normalize():Vector {
			if (length == 0) {
				_x = 1;
			}
			else {
				var l:Number = length;
				_x /= l;
				_y /= l;
			}
			return this;
		}
		
		public function toString():String {
			return "Vector (" + _x + ", " + _y + ")";
		}
	}
	
}