function Point(x,y){
	this.x=x;
	this.y=y;
	this.getDistance = function(p2){
		return Math.sqrt(Math.pow((p2.x - this.x),2)+Math.pow((p2.y - this.y),2));
	};
}

function Triangle(p1,p2,p3){
	this.p1 = p1;
	this.p2 = p2;
	this.p3 = p3;

	this.getPerimeter = function(){
		return p1.getDistance(p2) + p2.getDistance(p3) + p3.getDistance(p1);
	};

	this.getArea = function(){
		var l1 = p1.getDistance(p2);
		var l2 = p2.getDistance(p3);
		var l3 = p3.getDistance(p1);
		var semip = ((l1 + l2 + l3)/2);
		return Math.sqrt(semip * (semip - l1) * (semip - l2) * (semip - l3));
	};
}