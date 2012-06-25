var domain = INTERVALS(1)(80);
var domain2d = DOMAIN([[0,1],[0,1]])([80,10]);
var domain3d = DOMAIN([[0,1],[0,1],[0,1]])([80,10,1]);
var makeKnots = function(points){
	var knots = [0,0,0];
	var tot = points.length;
	for(var i=1;i<=tot-3;i++)
	knots.push(i);
	knots.push(i);
	knots.push(i);
	knots.push(i);
return knots;}

var points = [[0,0,0],[4,0,0],[4,0,1],[3,0,1],[3,0,2],[2,0,2],[2,0,3],[0,0,3]];
var knots = makeKnots(points);
var curve = NUBS(S0)(2)(knots)(points);

var domain = DOMAIN([[0,1],[0,2*PI]])([80,60]);
var mappingColumn = ROTATIONAL_SURFACE(curve);
var base = MAP(mappingColumn)(domain);
DRAW(base);