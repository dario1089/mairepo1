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
var arcoLaterale = [];
var pointsArco1 = [[0,0,0],[0.1,0.5,0],[0.8,0.5,0],[0.9,0,0]];
var knots = makeKnots(pointsArco1);
var curve = NUBS(S0)(2)(knots)(pointsArco1);

var hArco = 1;
var points = [[0,hArco,0],[0.9,hArco,0],[0.9,hArco,0]];
var curve2 = NUBS(S0)(2)([0,0,0,1,1,1])(points);

var arco = BEZIER(S1)([curve,curve2]);
var arco1 = MAP(arco)(domain2d);
arcoLaterale.push(arco1);
var arco2 = T([2])([0.5])(arco1);
arcoLaterale.push(arco2);
var zPezzo = 0.5;
points = [[0.375,0.49,-0.05],[0.525,0.49,-0.05],[0.625,hArco,-0.05],[0.275,hArco,-0.05]];
var points2 = points.map(function(p){return [p[0], p[1], p[2]+zPezzo+0.1]});
points = points.concat(points2);

var pezzo = SIMPLICIAL_COMPLEX(points)([[0,1,2,3],[4,0,3,7],[1,5,6,2],[3,2,6,7],[5,4,7,6],[4,5,1,0]]);
arcoLaterale.push(pezzo);

var pointsArco2 = pointsArco1.map(function(p){return [p[0],p[1],p[2]+0.5]});
knots = makeKnots(pointsArco2);
curve2 = NUBS(S0)(2)(knots)(pointsArco2);
var volta = BEZIER(S1)([curve,curve2]);
volta = MAP(volta)(domain2d);
arcoLaterale.push(volta);

var spacePillars = 0.9;
var zBase = 1.9;
var zPillar=(zBase-0.05- spacePillars) / 2; 
var hPillar = 2;
var hPillar2= 1;
hBase = 0.3;
var xBase = 0.5;
var pillar = SIMPLEX_GRID([[-0.9,zPillar],[hPillar2],[xBase]]);
arcoLaterale.push(pillar);
var pillar2 = T([0])([-spacePillars-zPillar])(pillar);
arcoLaterale.push(pillar2);

arcoLaterale = STRUCT(arcoLaterale);
DRAW(arcoLaterale);