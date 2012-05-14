var monodom = DOMAIN([[3,5]])([3])
DRAW(monodom);

var bidom = DOMAIN([[3,5],[4,5]])([3,3])
DRAW(bidom);

var tridom = DOMAIN([[3,5],[4,5],[0,1]])([3,3,2])
DRAW(tridom);

//retta traslata di 1

var domain = DOMAIN([[0,10]])([10]);

var mapping = function(array){
var u = array[0];

return [u,1];
};

var mapped = MAP(mapping)(domain);

//bisettrice

var domBise = DOMAIN([[0,10]])([10]);

var mappingBis = function(array){
	var u = array[0];

	return [u,u];
};

var mappedBis = MAP(mappingBis)(domBise);

DRAW(mappedBis);

//sinusoide

var domSinus = DOMAIN([[0,2*Math.PI]])([10]);

var mappingSin = function(array){
var u = array[0];

return [u, SIN(u)];
}
var mappedSin = MAP(mappingSin)(domSinus);

DRAW(mappedSin);

//circonferenza


var drawCircle = function(r, n){
var domCircle = DOMAIN([[0,2*Math.PI]])([n]);
var mappingCircle = function(array){
	var u = array[0];
	var x = Math.cos(u);
	var y = Math.sin(u);

	return [r*x, r*y];
}

var mappedCir = MAP(mappingCircle)(domCircle);

DRAW(mappedCir);
}

//cilindro

var drawCilynder = function(r,h,n,m, color){
	var domCil = DOMAIN([[0,2*Math.PI],[0,h]])([n,m]);
	var mappingCil = function(array){
		var u = array[0];
		var v = array[1];

		var x = Math.cos(u);
		var y = Math.sin(u);
		return [r*x, r*y, v];
	};
	var mappedCil = MAP(mappingCil)(domCil);
	COLOR(color)(mappedCil);

	DRAW(mappedCil);
}

//sphere

var drawSphere = function(r,n,m, color){
	var domSphere = DOMAIN([[0,Math.PI],[0,2*Math.PI]])([n, m]);
	var mappingSphere = function(array){
		var u = array[0] - PI/2;
		var v = array[1];

		var z = r * SIN(u);
		var x = r * COS(u) * SIN(v);
		var y = r * COS(u) * COS(v);

		return [x, y, z];
	}
	var mappedSphere = MAP(mappingSphere)(domSphere);
	COLOR(color)(mappedSphere);

	DRAW(mappedSphere);
}

//Cone
var drawCone = function(r,h,n,m,color){
	var domCone = DOMAIN([[0,2*PI],[0,h]])([n,m]);
	var mappingCone = function(array){
		var u = array[0];
		var v = array[1];

		var scale = (h - v)/h;
		var x = r * scale * SIN(u);
		var y = r * scale * COS(u);
		var z = v;
	
		return [x, y, z];
	}
	var mappedCone = MAP(mappingCone)(domCone);
	COLOR(color)(mappedCone);

	DRAW(mappedCone);
}



z = raggio * sen(alpha);
y = raggio * cos(alpha)*sin(beta);
x = raggio * cos(alpha)*cos(beta);

