var makeKnots = function(points){
	var knots = [0,0,0];
	var tot = points.length;
	for(var i=1;i<=tot-3;i++)
	knots.push(i);
	knots.push(i);
	knots.push(i);
	knots.push(i);
return knots;}
var domain = INTERVALS(1)(80);
var domain2d = DOMAIN([[0,1],[0,1]])([80,10]);
var domain3d = DOMAIN([[0,1],[0,1],[0,1]])([80,10,1]);

var points = [[0,0,0],[0.1,0.5,0],[0.8,0.5,0],[0.9,0,0]];
var knots = makeKnots(points);
var curve = NUBS(S0)(2)(knots)(points);
var c = MAP(curve)(domain);

var hArco = 1;
var points = [[0,hArco,0],[0.9,hArco,0],[0.9,hArco,0]];
var knots = makeKnots(points);
var curve2 = NUBS(S0)(2)([0,0,0,1,1,1])(points);

var arco = BEZIER(S1)([curve,curve2]);
var c2 = MAP(arco)(domain2d);
var zPezzo = 2;
points = [[0.375,0.49,-0.05],[0.525,0.49,-0.05],[0.625,hArco,-0.05],[0.275,hArco,-0.05]];
var points2 = points.map(function(p){return [p[0], p[1], p[2]+zPezzo+0.1]});
points = points.concat(points2);

var pezzo = SIMPLICIAL_COMPLEX(points)([[0,1,2,3],[4,0,3,7],[1,5,6,2],[3,2,6,7],[5,4,7,6],[4,5,1,0]]);
DRAW(pezzo);

DRAW(c2);