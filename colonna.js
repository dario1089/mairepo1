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


var zCapitello = 16;
var prof = 0.6;
var capitello = [];
var points = [[3,4,0],[3,6,0],[5,7.5,0],[8,6,0],[8,2,0],[5,0,0],[1,1,0],[-0.5,4,0],[0,7,0],[2,9,0],[6,9.5,0],[9,8,0],[10.5,4,0],[9.5,0.5,0],[7,-2,0],[-1,-1,0],[-3.5,4,0],[-2,9,0],[2,12.5,0],[8,13,0],[20,13,0]];

var knots = makeKnots(points);
var center = [5,4,0];
var spes = 0.8;
var points2 = points.map(function(p){return [ spes*p[0] + (1-spes)*center[0], spes*p[1] + (1-spes)*center[1], 0 ]});
var curve = NUBS(S0)(2)(knots)(points);
var curve2 = NUBS(S0)(2)(knots)(points2);
var capit = BEZIER(S1)([curve,curve2]);
var frontSurface1 = MAP(capit)(domain2d);
capitello.push(frontSurface1);
var latSurface = [];
var latSurface2 = [];
latSurface.push(curve);
latSurface2.push(curve2);

var points = points.map(function(p){return [p[0],p[1],p[2]+zCapitello]});
var points2 = points2.map(function(p){return [p[0],p[1],p[2]+zCapitello]});
var curve = NUBS(S0)(2)(knots)(points);
var curve2 = NUBS(S0)(2)(knots)(points2);
var capit2 = BEZIER(S1)([curve,curve2]);
var frontSurface2 = MAP(capit2)(domain2d);
capitello.push(frontSurface2);
latSurface.push(curve);
latSurface2.push(curve2);

var latSurface = BEZIER(S1)(latSurface);
var latSurface = MAP(latSurface)(domain2d);
capitello.push(latSurface);
var latSurface2 = BEZIER(S1)(latSurface2);
var latSurface2 = MAP(latSurface2)(domain2d);
capitello.push(latSurface2);
//var capitello=BEZIER(S2)([capit,capit2]);
//var capitello = MAP(capitello)(domain3d);


var center = [5,4,prof];
var pointsProfile = points2.map(function(p){return [p[0],p[1],p[2] - zCapitello+ prof]});
var curve = NUBS(S0)(2)(knots)(pointsProfile);

var fakePoint = BEZIER(S0)([center,center]);
var riempimento = BEZIER(S1)([fakePoint, curve]);
var riempimento = MAP(riempimento)(domain2d);
capitello.push(riempimento);

var center = [5,4,zCapitello - prof];
var pointsProfile = points2.map(function(p){return [p[0],p[1],p[2] - prof]});
var curve = NUBS(S0)(2)(knots)(pointsProfile);

var fakePoint = BEZIER(S0)([center,center]);
var riempimento = BEZIER(S1)([fakePoint, curve]);
var riempimento = MAP(riempimento)(domain2d);
capitello.push(riempimento);


//otherside
var l = 30;
var points = [[3,4,0],[3,6,0],[5,7.5,0],[8,6,0],[8,2,0],[5,0,0],[1,1,0],[-0.5,4,0],[0,7,0],[2,9,0],[6,9.5,0],[9,8,0],[10.5,4,0],[9.5,0.5,0],[7,-2,0],[-1,-1,0],[-3.5,4,0],[-2,9,0],[2,12.5,0],[8,13,0],[20,13,0]];
var points = points.map(function(p){return [- p[0] + l , p[1],p[2]]});

var knots = makeKnots(points);
var center = [5+l-7,4,0];
var spes = 0.8;
var points2 = points.map(function(p){return [ spes*p[0] + (1-spes)*center[0], spes*p[1] + (1-spes)*center[1], 0 ]});
var curve = NUBS(S0)(2)(knots)(points);
var curve2 = NUBS(S0)(2)(knots)(points2);
var capit = BEZIER(S1)([curve,curve2]);
var frontSurface1 = MAP(capit)(domain2d);
capitello.push(frontSurface1);
var latSurface = [];
var latSurface2 = [];
latSurface.push(curve);
latSurface2.push(curve2);

var points = points.map(function(p){return [p[0],p[1],p[2]+zCapitello]});
var points2 = points2.map(function(p){return [p[0],p[1],p[2]+zCapitello]});
var curve = NUBS(S0)(2)(knots)(points);
var curve2 = NUBS(S0)(2)(knots)(points2);
var capit2 = BEZIER(S1)([curve,curve2]);
var frontSurface2 = MAP(capit2)(domain2d);
capitello.push(frontSurface2);
latSurface.push(curve);
latSurface2.push(curve2);

var latSurface = BEZIER(S1)(latSurface);
var latSurface = MAP(latSurface)(domain2d);
capitello.push(latSurface);
var latSurface2 = BEZIER(S1)(latSurface2);
var latSurface2 = MAP(latSurface2)(domain2d);
capitello.push(latSurface2);
//var capitello=BEZIER(S2)([capit,capit2]);
//var capitello = MAP(capitello)(domain3d);


var center = [5+l-7,4,prof];
var pointsProfile = points2.map(function(p){return [p[0],p[1],p[2] - zCapitello+ prof]});
var curve = NUBS(S0)(2)(knots)(pointsProfile);

var fakePoint = BEZIER(S0)([center,center]);
var riempimento = BEZIER(S1)([fakePoint, curve]);
var riempimento = MAP(riempimento)(domain2d);
capitello.push(riempimento);

var center = [5+l-7,4,zCapitello - prof];
var pointsProfile = points2.map(function(p){return [p[0],p[1],p[2] - prof]});
var curve = NUBS(S0)(2)(knots)(pointsProfile);

var fakePoint = BEZIER(S0)([center,center]);
var riempimento = BEZIER(S1)([fakePoint, curve]);
var riempimento = MAP(riempimento)(domain2d);
capitello.push(riempimento);



var base = T([1])([-0.5])(SIMPLEX_GRID([[-8,14],[11],[-prof,zCapitello-2*prof]]));
var torusSurface = R([1,2])([PI/2])(TORUS_SURFACE([3, 7])([50,10]));
var torusSurface = T([0,2])([15,8])(torusSurface);

capitello.push(base);
capitello.push(torusSurface);

var capitello = STRUCT(capitello);

var capitello = S([0,1,2])([0.3,0.3,0.3])(capitello);

var hColumn = 4;
var rColumn = 0.2;
var domain = DOMAIN([[0,1],[0,2*PI]])([80,60]);
var domain1d = INTERVALS(1)(20);
var points = [[rColumn, 0, 0],[rColumn*6.3/5,0,1/3*hColumn],[rColumn,0,hColumn]];
var pColumn = NUBS(S0)(2)([0,0,0,1,1,1])(points);
var mappingColumn = ROTATIONAL_SURFACE(pColumn);
var column = S([0,1,2])([10,10,10])(MAP(mappingColumn)(domain));
var column = R([1,2])([-PI/2])(column);
var column = T([0,1,2])([4.5,-40-0.8,2.5])(column);





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
var base = R([1,2])([-PI/2])(MAP(mappingColumn)(domain));
base = T([0,1,2])([4.5,-43,2.5])(base);

var qBase = T([0,1,2])([0.5,-43.5,-1.5])(CUBOID([8,1,8]));

column = STRUCT([capitello, column,base,qBase]);
DRAW(column);