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
	return this;
}

//passo funzione come parametro e verifico se il punto è sopra, sotto, o sulla retta rappresentata dalla funzione

Point.prototype.pointMembership = function(rect){
	if(rect(this.x,this.y) > 0) return 1;
	else if(rect(this.x, this.y) == 0) return 0;
	else return -1;
}

Point.prototype.distance = function(line){
	var num = Math.abs(line.a*this.x + line.b + this.y + line.c)
	var den = Math.sqrt(line.a * line.a + line.b*line.b);
	return num/den;
}
//

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

//

var filtPosSum = function(array){
	var temp = array.filter(function(item,index,array){return item>0});
	return temp.reduce(function(prev,current){return prev+current});

}

//


var randomPoint = function(){
	var x = (Math.random() * 200) - 100;
	var y = (Math.random() * 200) - 100;
	return new Point(x, y);
}

//

var arrayRandom = function(number){
	var array = [];

	for (var i = 0; i < number; i++) {
		array.push(randomPoint());
	};

	return array;
}

//filtrare punti del semipiano positivo in un array definito dalla bisettrice primo e terzo quadrante

var filterPosPoints = function(array){
	return array.filter(function(item){
		return (item.y - item.x) >=0;
	});
}

// line

var Line = function(a, b, c){
this.a = a;
this.b = b;
this.c = c;
};
