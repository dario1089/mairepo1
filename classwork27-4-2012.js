var threeBuilding = POLYLINE([[0,0],[0,9],[3,9],[3,8],[1,8],[1,5],[3,5],[3,4],[1,4],[1,1],[3,1],[3,0],[0,0]]);

var secondThreeBuilding = T([0,1])([7,9])(R([0,1])(PI)(threeBuilding));

var building = STRUCT([threeBuilding ,secondThreeBuilding]);

//DRAW(building);


var tredbuilding = COLOR([1,0,0])(EXTRUDE([2])(building));

//DRAW(tredbuilding);

var roof = COLOR([0,0,1,0.5])(BOUNDARY(T([2])([2])(CUBOID([7,9,0.5]))));
//DRAW(roof);

var tot = function(domain, points){
var poly = POLYLINE([points[0], points[1]]);
var hermitMapping = CUBIC_HERMITE(S0)(points);
var curve = MAP(hermitMapping)(domain);
DRAW(curve);
DRAW(COLOR([1,0,0])(poly));
}

var totBez = function(domain, points){
var poly = POLYLINE(points);
var bezierMapping = BEZIER(S0)(points);
var curve = MAP(bezierMapping)(domain);
DRAW(curve);
DRAW(COLOR([1,0,0])(poly));
}



//var domain = INTERVALS(1)(20);

//totBez(domain, [[0,0],[3,1],[1,2],[2,3],[3,2]]);



var totCardSpline = function(domain, points){
var poly = POLYLINE(points);
var cubicMapping = CUBIC_CARDINAL(domain);
var curve = SPLINE(cubicMapping)(points);
DRAW(curve);
DRAW(COLOR([1,0,0])(poly));
}

var domain = INTERVALS(1)(40);
var controlPoints = [[5, 2.5],[4.5, 2],[3.5, 1],[2.5, 2],[4.5, 4],[3.5, 5],[2.5, 4],[4.5, 2.5],[6, 1]];
totCardSpline(domain, controlPoints);



var totUBSpline = function(domain, points){
var poly = POLYLINE(points);
var cubicMapping = CUBIC_UBSPLINE(domain);
var curve = SPLINE(cubicMapping)(points);
DRAW(curve);
DRAW(COLOR([1,0,0])(poly));
}

var domain = INTERVALS(1)(40);
var controlPoints = [[-3, 6],[-4, 2],[-3, -1],[-1, 1],[1.5, 1.5],[3,4],[5,5],[7,2],[6, -2],[2,-3]];
totUBSpline(domain, controlPoints);


/////////////

var domain = PROD1x1([INTERVALS(1)(16), INTERVALS(1)(16)]);
var profile1 = BEZIER(S0)([[2, 0.5],[1.5, 1.5],[2, 2.5],[1.5, 3.5]]);

var curve = MAP(profile1)(INTERVALS(1)(40));





var f = function(p){
	return 500 + p[0];
}

DRAW(MAP(f)([curve]));


var domain = PROD1x1([INTERVALS(1)(16),INTERVALS(1)(16)]);
var domain1 = INTERVALS(1)(16);
var c0 = BEZIER(S0)([[0,0,0],[10,0,0]]);
var curve0 = MAP(c0)(INTERVALS(1)(40));
var c1 = BEZIER(S0)([[0,2,0],[8,3,0],[9,2,0]]);
var c2 = BEZIER(S0)([[0,4,1],[7,5,-1],[8,5,1],[12,4,0]]);
var c3 = BEZIER(S0)([[0,6,0],[9,6,3],[10,6,-1]]);
var out = MAP(BEZIER(S1)([c0,c1,c2,c3]))(domain);



