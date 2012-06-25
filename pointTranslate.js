function Point(x,y){
	this.x=x;
	this.y=y;
	this.getDistance = function(p2){
		return Math.sqrt(Math.pow((p2.x - this.x),2)+Math.pow((p2.y - this.y),2));
	};
}

Point.prototype.translate = function(dx, dy){
	this.x = this.x + dx;
	this.y = this.y +dy;
}