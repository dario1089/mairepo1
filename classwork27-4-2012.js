var threeBuilding = POLYLINE([[0,0],[0,9],[3,9],[3,8],[1,8],[1,5],[3,5],[3,4],[1,4],[1,1],[3,1],[3,0],[0,0]]);

var secondThreeBuilding = T([0,1])([7,9])(R([0,1])(PI)(threeBuilding));

var building = STRUCT([threeBuilding ,secondThreeBuilding]);

//DRAW(building);


var tredbuilding = EXTRUDE([2])(building);

//DRAW(tredbuilding);



var selector = INTERVALS(1)(20);
var points = [[0,0],[3,2],[4,-1],[7,3],[9,0], [11,1], [12,0]];
var curve = SPLINE(CUBIC_CARDINAL(selector))(points);
var curve2 = SPLINE(CUBIC_CARDINAL(selector,3))(points);
var curve3 = SPLINE(CUBIC_CARDINAL(selector,66666))(points);
var curve4 = SPLINE(CUBIC_CARDINAL(selector, 0.1))(points);

DRAW(COLOR([1,0,0])(curve));
DRAW(COLOR([0,0,1])(curve2));
DRAW(COLOR([1,1,0])(curve3));
DRAW(COLOR([1,1,1])(curve4));




