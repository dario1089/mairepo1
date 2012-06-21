var makeKnots = function(points){
	var knots = [0,0,0];
	var tot = points.length;
	for(var i=1;i<=tot-3;i++)
	knots.push(i);
	knots.push(i);
	knots.push(i);
	knots.push(i);
return knots;}

var lateral = function(){
	var domain2d = DOMAIN([[0,1],[0,1]])([80,10]);

	var hBase = 0.4;
	var xBase = 0.5;
	var zBase = 1.9;
	var base = [];
	var base1 = T([0,1,2])([0.09,3,4.1])(SIMPLEX_GRID([[xBase],[hBase],[zBase]]));
	base.push(base1);
	var base2 = T([0])([7.72])(base1);
	base.push(base2);
	var base3 = T([0,1,2])([0.14,3,4.15])(SIMPLEX_GRID([[xBase-0.1],[hBase+0.4],[zBase-0.05]]));
	base.push(base3);
	var base4 = T([0])([7.72])(base3);
	base.push(base4);
	var hPillar = 2.3;
	var spacePillars = 0.8;
	var zPillar=(zBase-0.05- spacePillars) / 2; 
	var pillars = SIMPLEX_GRID([[-0.14,xBase-0.1],[-3-hBase-0.4,hPillar],[-4.15,zPillar,-spacePillars,zPillar]])
	base.push(pillars);
	var pillars2 = T([0])([7.72])(pillars);
	base.push(pillars2);
	var baseMiddlePillars = SIMPLEX_GRID([[-0.09,xBase],[-3-hBase-0.4-hPillar,hBase],[-4.1,zPillar+0.1,-spacePillars+0.1,zPillar+0.05]]);
	base.push(baseMiddlePillars);
	var baseMiddlePillars2 = T([0])([7.72])(baseMiddlePillars);
	base.push(baseMiddlePillars2);

var arcoLaterale = [];
var pointsArco1 = [[0,0,0],[0.05,0.5,0],[spacePillars-0.05,0.5,0],[spacePillars,0,0]];
var knots = makeKnots(pointsArco1);
var curve = NUBS(S0)(2)(knots)(pointsArco1);

var hArco = 1;
var points = [[0,hArco,0],[spacePillars,hArco,0],[spacePillars,hArco,0]];
var curve2 = NUBS(S0)(2)([0,0,0,1,1,1])(points);

var arco = BEZIER(S1)([curve,curve2]);
var arco1 = MAP(arco)(domain2d);
arcoLaterale.push(arco1);
var arco2 = T([2])([xBase-0.1])(arco1);
arcoLaterale.push(arco2);
var zPezzo = xBase;
points = [[0.375,0.49,-0.05],[0.525,0.49,-0.05],[0.625,hArco,-0.05],[0.275,hArco,-0.05]];
var points2 = points.map(function(p){return [p[0], p[1], p[2]+zPezzo]});
points = points.concat(points2);

var pezzo = SIMPLICIAL_COMPLEX(points)([[0,1,2,3],[4,0,3,7],[1,5,6,2],[3,2,6,7],[5,4,7,6],[4,5,1,0]]);
var pezzo = T([0])([-0.05])(pezzo);
arcoLaterale.push(pezzo);

var pointsArco2 = pointsArco1.map(function(p){return [p[0],p[1],p[2]+(xBase-0.1)]});
knots = makeKnots(pointsArco2);
curve2 = NUBS(S0)(2)(knots)(pointsArco2);
var volta = BEZIER(S1)([curve,curve2]);
volta = MAP(volta)(domain2d);
arcoLaterale.push(volta);

var zBase = 1.9;
var hPillar2= hArco;
hBase = 0.3;
var pillar = SIMPLEX_GRID([[-spacePillars,zPillar],[hPillar2],[xBase-0.1]]);
arcoLaterale.push(pillar);
var pillar2 = T([0])([-spacePillars-zPillar])(pillar);
arcoLaterale.push(pillar2);

arcoLaterale = STRUCT(arcoLaterale);
arcoLaterale = R([0,2])([PI/2])(arcoLaterale);
arcoLaterale = T([0,1,2])([0.14,3+hBase+0.4+hPillar+hBase+0.2,4.15+spacePillars+zPillar])(arcoLaterale);
base.push(arcoLaterale);
var arcoLaterale2 = T([0])([7.72])(arcoLaterale);
base.push(arcoLaterale2);
base = S([2])([1.45])(STRUCT(base));
base = T([2])([-1.8])(base);
return base;
}

var base = function(){
var stepH = 0.13;
var stepZ = 0.155;
var rotonda = [];
////frontal
//borders

var stepsBorder = [];
var stepsBorder1 = SIMPLEX_GRID([[0.6, -4.8, 0.6],[0.6],[3.4]]);
stepsBorder.push(stepsBorder1);
var stepsBorder2 = SIMPLEX_GRID([[-0.05, 0.5,-0.05,-4.8,-0.05,0.5,-0.05],[-0.6, 0.4],[-0.05,3.35]]);
stepsBorder.push(stepsBorder2);
var stepsBorder3 = SIMPLEX_GRID([[-0.1, 0.4,-0.1,-4.8,-0.1,0.4,-0.1],[-1, 1.7],[-0.1,2.5]]);
stepsBorder.push(stepsBorder3);
var stepsBorder4 = SIMPLEX_GRID([[-0.1, 0.4,-0.1,-4.8,-0.1,0.4,-0.1],[-1-0.6-0.6, 0.5],[-0.1 - 2.5,0.8]]);
stepsBorder.push(stepsBorder4);
var stepsBorder5 = SIMPLEX_GRID([[-0.05, 0.5,-0.05,-4.8,-0.05,0.5,-0.05],[-2.7,0.3],[-0.05,3.35]]);
stepsBorder.push(stepsBorder5);
var stepsBorder6 = SIMPLEX_GRID([[-0.1, 0.4,-0.1,-4.8,-0.1,0.4,-0.1],[-1,0.4],[-0.1 - 2.5,0.8]]);
stepsBorder.push(stepsBorder6);
var hole1 = COLOR([0,0,0.1])(SIMPLEX_GRID([[-0.5,0.01],[-1-0.4,0.8],[-0.1-2.5,0.8]]));
stepsBorder.push(hole1);
var hole2 = T([0])([5])(hole1);
stepsBorder.push(hole2);
var grid = R([1,2])([PI/2])(CYL_SURFACE([0.02, 0.8])(20));
grid = T([0,1,2])([0.3,2.2,2.7])(grid);
var grid1 = T([2])([0.3])(grid);
var grid2 = T([2])([0.3])(grid1);
var vGrid1 = STRUCT([grid,grid1,grid2]);
var grid = T([0,1,2])([0.3,1.5,2.6])(CYL_SURFACE([0.02, 0.8])(20));
var grid1 = T([1])([0.3])(grid);
var grid2 = T([1])([0.3])(grid1);
var vGrid2 = STRUCT([grid,grid1,grid2]);
var vGrid = STRUCT([vGrid1,vGrid2]);
stepsBorder.push(vGrid);
var vGridRight = T([0])([5.4])(vGrid);
stepsBorder.push(vGridRight);
stepsBorder = STRUCT(stepsBorder);

//steps

var steps = [];
var steps1 = SIMPLEX_GRID([[-0.5, 5, -0.5],[0.13],[0.155]]);
var trans = T([1,2])([0.13, 0.155]);
var steps = STRUCT([steps1, trans, steps1,trans,steps1,trans, steps1,trans,steps1,trans, steps1,trans,steps1,trans, steps1,trans,steps1,trans, steps1,trans,steps1,trans, steps1,trans,steps1,trans, steps1,trans,steps1,trans,steps1,trans, steps1,trans,steps1,trans,steps1,trans, steps1,trans,steps1,trans,steps1]);


var domain2d = DOMAIN([[0,1],[0,1]])([80,10]);

var points = [[0.3,3,0.1],[1.15,3,0.1],[2,3,0.1]];
var points2 = [[0.3,1.9,0.1],[1.15,2.6,0.1],[2,1.9,0.1]];
var rect = NUBS(S0)(2)([0,0,0,1,1,1])(points);
var curve = NUBS(S0)(2)([0,0,0,1,1,1])(points2);
var upperlayer = BEZIER(S1)([curve,rect]);
var upperlayer = MAP(upperlayer)(domain2d);
var upperlayer2 = T([2])([5.8])(upperlayer);
var upperlayer = STRUCT([upperlayer,upperlayer2]);


var points = [[0.3,1.9,0.1],[1.15,2.6,0.1],[2,1.9,0.1]];
var points2 = points.map(function(n){return [n[0],n[1],n[2] + 5.8]});
var curve1 = NUBS(S0)(2)([0,0,0,1,1,1])(points);
var curve2 = NUBS(S0)(2)([0,0,0,1,1,1])(points2);
var roof = BEZIER(S1)([curve1,curve2]);
var roof = MAP(roof)(domain2d);

var solid1 = SIMPLEX_GRID([[0.3],[0.6],[6]]);
var solid2 = SIMPLEX_GRID([[0.3],[-0.6,0.4],[-0.05,5.9]]);
var solid3 = SIMPLEX_GRID([[0.3],[-1, 1.7],[-0.1,5.8]]);
var solid4 = SIMPLEX_GRID([[0.3],[-2.7,0.3],[-0.05,5.9]]);
var solid = STRUCT([solid1,solid2,solid3,solid4]);

var solid1 = SIMPLEX_GRID([[-2,1.5],[0.6],[6]]);
var solid2 = SIMPLEX_GRID([[-2,1.5],[-0.6,0.4],[-0.05,5.9]]);
var solid3 = SIMPLEX_GRID([[-2,1.5],[-1, 1.7],[-0.1,5.8]]);
var solid4 = SIMPLEX_GRID([[-2,1.5],[-2.7,0.3],[-0.05,5.9]]);
var solid5 = SIMPLEX_GRID([[-0.3,1.7],[-2.7,0.3],[-0.05,5.9]]);
var solid2 = STRUCT([solid1,solid2,solid3,solid4,solid5]);

var tunnel = STRUCT([solid,solid2,roof,upperlayer]);

tunnel = R([0,2])([PI/2])(tunnel);
tunnel = T([2])([6.9])(tunnel);

var base = S([0])([1.4])(STRUCT([tunnel,steps,stepsBorder]));
return base;}

var colonnato = function(){
var domain = INTERVALS(1)(80);
var domain2d = DOMAIN([[0,1],[0,1]])([80,10]);
var domain3d = DOMAIN([[0,1],[0,1],[0,1]])([80,10,1]);
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



var base = T([1])([4.2])(SIMPLEX_GRID([[-8,14],[6.2],[-prof,zCapitello-2*prof]]));
var torusSurface = R([1,2])([PI/2])(TORUS_SURFACE([3, 6.5])([50,10]));
var torusSurface = T([0,1,2])([15,6,8])(torusSurface);

capitello.push(base);
capitello.push(torusSurface);

var capitello = STRUCT(capitello);

var capitello = S([0,1,2])([0.3,0.15,0.3])(capitello);
capitello = T([1])([-0.77])(capitello);
var hColumn = 4.2;
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

var points = [[0,0,0],[4,0,0],[4,0,1],[3,0,1],[3,0,2],[2,0,2],[2,0,3],[0,0,3]];
var knots = makeKnots(points);
var curve = NUBS(S0)(2)(knots)(points);

var domain = DOMAIN([[0,1],[0,2*PI]])([80,60]);
var mappingColumn = ROTATIONAL_SURFACE(curve);
var base = R([1,2])([-PI/2])(MAP(mappingColumn)(domain));
base = T([0,1,2])([4.5,-43,2.5])(base);

var qBase = T([0,1,2])([0.5,-43.5,-1.5])(CUBOID([8,1,8]));

column = STRUCT([capitello, column,base,qBase]);
column = S([0,1,2])([0.07,0.1,0.07])(column);
column = T([0,1,2])([0.1,7.35,3.55])(column);
var t = T([0])([1.52]);
var colonnato = STRUCT([column,t,column,t,column,t,column,t,column,t,column]);
return colonnato;}

var base = base();
var colonnato = colonnato();
DRAW(base);
DRAW(colonnato);
var lateral = lateral();
DRAW(lateral);

