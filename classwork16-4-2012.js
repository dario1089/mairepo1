var cuboid = CUBOID([2, 20]);
var tCuboid = T([0, 1])([-1, -19])(cuboid);

var rotate = function(alpha){
	return function(object){
		return R([2])([alpha * PI/180])(object);
	}
}

var comp = function(alpha){
	return COMP([T([1])([-18]), R([2])(alpha * PI/180)]);
}

var arm = function(angs){
	return STRUCT([tCuboid ,comp(angs[0]), tCuboid, comp(angs[1]), tCuboid, comp(angs[2]), tCuboid])
}

DRAW(arm([45, 45, 45]));