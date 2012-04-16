var cuboid = CUBOID([2, 20]);
var tCuboid = T([0, 1])([-1, -19])(cuboid);
DRAW(tCuboid);

var rotate = function(alpha){
	return function(object){
		return R([0,1])([alpha * PI/180, alpha * PI/180]);
	}
}

var rCuboid = rotate(90)(tCuboid);
DRAW(rCuboid);