
var domain2d = DOMAIN([[0,1],[0,1]])([50,1]);
var domain = INTERVALS(1)(20);
var domainR = DOMAIN([[0,1],[0,2*PI]])([40,30]);;
var PointUtils = function() {};

PointUtils.ruotaPunti = function(pointList, angolo, asse) {
    if (asse === 0) {
      var alfa = angolo;
      return pointList.map( function(pt) { 
  return [ pt[0], pt[1]*COS(alfa) + (-1)*pt[2]*SIN(alfa), pt[1]*SIN(alfa) + pt[2]*COS(alfa) ];
      });
    } else if (asse === 1) {
      var beta = angolo;
      return pointList.map( function(pt) { 
  return [ pt[0]*COS(beta) + pt[2]*SIN(beta), pt[1], (-1)*pt[0]*SIN(beta) + pt[2]*COS(beta) ];
      });
    } else if (asse === 2) {
      var gamma = angolo;
      return pointList.map( function(pt) { 
  return [ pt[0]*COS(gamma) + (-1)*pt[1]*SIN(gamma), pt[0]*SIN(gamma) + pt[1]*COS(gamma), pt[2] ];
      });
    }
     
    return pointList;
};
 
PointUtils.ribaltaPunti = function(pointList, asse) {
    if (asse === 0) {
      return pointList.map( function(pt) { 
  return [ -pt[0], pt[1], pt[2] ];
      });
    } else if (asse === 1) {
      return pointList.map( function(pt) { 
  return [ pt[0], -pt[1], pt[2] ];
      });
    } else if (asse === 2) {
      return pointList.map( function(pt) { 
  return [ pt[0], pt[1], -pt[2] ];
      });
    }
};

PointUtils.traslaPunti = function(pointList, asse, qty) {
    if (asse === 0) {
      return pointList.map( function(pt) { 
  return [ pt[0]+qty, pt[1], pt[2] ];
      });
    } else if (asse === 1) {
      return pointList.map( function(pt) { 
  return [ pt[0], pt[1]+qty, pt[2] ];
      });
    } else if (asse === 2) {
      return pointList.map( function(pt) { 
  return [ pt[0], pt[1], pt[2]+qty ];
      });
    }
};

PointUtils.scalaPunti = function(pointList, scalamento) {
    return pointList.map( function(pt) { 
  return [ pt[0] * scalamento, pt[1], pt[2]];
    });
};
PointUtils.scalaPuntiY = function(pointList, scalamento) {
    return pointList.map( function(pt) { 
  return [ pt[0], pt[1]*scalamento, pt[2]];
    });
};

var makeKnots = function(points){
	var knots = [0,0,0];
	var tot = points.length;
	for(var i=1;i<=tot-3;i++)
	knots.push(i);
	knots.push(i);
	knots.push(i);
	knots.push(i);
return knots;}

var buildColumnBase = function(){

var points = [[0,0,0],[4,0,0],[4,0,1],[3,0,1],[3,0,2],[2,0,2],[2,0,3],[0,0,3]];
var knots = makeKnots(points);
var curve = NUBS(S0)(2)(knots)(points);

var mappingBase = ROTATIONAL_SURFACE(curve);
var base = R([1,2])([-PI/2])(MAP(mappingBase)(domainR));
base = T([0,1,2])([4.5,-43,2.5])(base);
return base;
}

var buildCapitello = function(){
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
return capitello;
}

var buildColumn = function(){
	var hColumn = 4.2;
var rColumn = 0.2;

var points = [[rColumn, 0, 0],[rColumn*6.3/5,0,1/3*hColumn],[rColumn,0,hColumn]];
var pColumn = NUBS(S0)(2)([0,0,0,1,1,1])(points);
var mappingColumn = ROTATIONAL_SURFACE(pColumn);
var column = S([0,1,2])([10,10,10])(MAP(mappingColumn)(domainR));
var column = R([1,2])([-PI/2])(column);
var column = T([0,1,2])([4.5,-40-0.8,2.5])(column);
return column;
}

var buildTunnel = function(){

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
return tunnel;
}

var lateral = function(){

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
var steps1 = SIMPLEX_GRID([[-0.5, 5, -0.5],[stepH],[stepZ]]);
var trans = T([1,2])([stepH, stepZ]);
var nSteps = 22;
var steps = STRUCT(REPLICA(nSteps)([steps1,trans]))

//tunnel
var tunnel = buildTunnel();

var base = S([0])([1.4])(STRUCT([tunnel,steps,stepsBorder]));

return base;}

var colonnato = function(){

var capitello = buildCapitello();

var column = buildColumn();

var base = buildColumnBase();

var qBase = T([0,1,2])([0.5,-43.5,-1.5])(CUBOID([8,1,8]));

column = STRUCT([capitello, column,base,qBase]);
column = S([0,1,2])([0.07,0.1,0.07])(column);
column = T([0,1,2])([0.1,7.35,3.55])(column);
var t = T([0])([1.52]);
var colonnato = STRUCT([column,t,column,t,column,t,column,t,column,t,column]);
return colonnato;}

var buildTimpano = function(){
	//base
var xBaseTimpano = 8.52;
var zBaseTimpano = 3.55;
var timpano = [];
var pointsNS = [[0.2,0,0],[0.2,0.15,0],[0.15,0.2,0],[0.15,0.3,0],[0.2,0.4,0],[0.15,0.45,0],[0.15,0.55,0],[0.2,0.65,0],[0.1,0.72,0],[0.05,0.75,0],[0.05,0.85,0],[0.1,0.88,0],[0.2,0.9,0],[0.15,0.95,0],[0.15,1.05,0],[0.2,1.1,0],[0.2,1.51,0]];
pointsNS = PointUtils.scalaPuntiY(pointsNS,0.5);
var pointsNSR = PointUtils.ruotaPunti(pointsNS,-PI/4,1);
var points = PointUtils.scalaPunti(pointsNS, SQRT(2));
points = PointUtils.ruotaPunti(points,-PI/4,1);
var points2 = PointUtils.ruotaPunti(points,-PI/2,1);
points2 = PointUtils.traslaPunti(points2,0,xBaseTimpano);
var points3 = PointUtils.ruotaPunti(pointsNSR,+ PI/4,1);
points3 = PointUtils.traslaPunti(points3,2,zBaseTimpano);
var points4 = PointUtils.ruotaPunti(pointsNSR,-PI/2-PI/4,1);
points4 = PointUtils.traslaPunti(points4,0,xBaseTimpano);
points4 = PointUtils.traslaPunti(points4,2,zBaseTimpano);
var pointsCornicione1 = pointsNSR;
////

////
var knots = makeKnots(points);
var profile = NUBS(S0)(2)(knots)(points);
var profile2 = NUBS(S0)(2)(knots)(points2);
var profile3 = NUBS(S0)(2)(knots)(points3);
var profile4 = NUBS(S0)(2)(knots)(points4);

var curve = BEZIER(S1)([profile,profile2]);
var curve2 = BEZIER(S1)([profile,profile3]);
var curve3 = BEZIER(S1)([profile2,profile4]);

var surface = MAP(curve)(domain2d);
var surface2 = MAP(curve2)(domain2d);
var surface3 = MAP(curve3)(domain2d);

timpano.push(surface);
timpano.push(surface2);
timpano.push(surface3);

//cornicione
pointsCornicioneLeft1 = PointUtils.ruotaPunti(pointsCornicione1,-PI/2,1);
pointsCornicione1 = PointUtils.traslaPunti(pointsCornicione1,2,zBaseTimpano-0.15);
pointsCornicione1 = PointUtils.traslaPunti(pointsCornicione1,0,0.1);
var pointsCornicione2 = PointUtils.traslaPunti(pointsCornicione1,0,-3.8);
var profileCornicione1 = NUBS(S0)(2)(knots)(pointsCornicione1);
var profileCornicione2 = NUBS(S0)(2)(knots)(pointsCornicione2);
var cornicione = BEZIER(S1)([profileCornicione1,profileCornicione2]);
cornicione = MAP(cornicione)(domain2d);
timpano.push(cornicione);
//cornicione left
pointsCornicioneLeft1 = PointUtils.traslaPunti(pointsCornicioneLeft1,2,zBaseTimpano-0.15);
pointsCornicioneLeft1 = PointUtils.traslaPunti(pointsCornicioneLeft1,0,xBaseTimpano-0.1);
var pointsCornicioneLeft2 = PointUtils.traslaPunti(pointsCornicioneLeft1,0,3.8);
var profileCornicioneLeft1 = NUBS(S0)(2)(knots)(pointsCornicioneLeft1);
var profileCornicioneLeft2 = NUBS(S0)(2)(knots)(pointsCornicioneLeft2);
var cornicioneLeft = BEZIER(S1)([profileCornicioneLeft1,profileCornicioneLeft2]);
cornicioneLeft = MAP(cornicioneLeft)(domain2d);
timpano.push(cornicioneLeft);
//spessore
var spessore = SIMPLEX_GRID([[-0.2,xBaseTimpano-0.4],[0.05],[-0.2,0.366]]);
timpano.push(spessore);

var spessoreLaterale1 = SIMPLEX_GRID([[-0.2,0.45],[0.05],[-0.2-0.366,zBaseTimpano-0.565]]);
timpano.push(spessoreLaterale1);
var spessoreLaterale2 = T([0])([xBaseTimpano-0.85])(spessoreLaterale1);
timpano.push(spessoreLaterale2);

//latoInferiore
var cornice = [];
var xBaseTriangolo = xBaseTimpano+0.2;
var hTriangolo = 2.5;
var ipotenusa = SQRT((hTriangolo*hTriangolo) + (xBaseTriangolo/2*xBaseTriangolo/2));
var alpha = Math.asin(hTriangolo/ipotenusa)+PI/4.8;
var pointsNR = [[0,0,0.3],[0,0,0.1],[0,0.05,0.05],[0,0.1,0.1],[0,0.15,0.05],[0,0.2,0.1],[0,0.2,0.3]];
pointsNR = PointUtils.traslaPunti(pointsNR,1,0.01);
var points=PointUtils.ruotaPunti(pointsNR,-alpha,2);
points = PointUtils.scalaPuntiY(points,1.5);
var points2 = PointUtils.ruotaPunti(pointsNR,alpha,2);
points2 = PointUtils.traslaPunti(points2,0,xBaseTriangolo);
points2 = PointUtils.scalaPuntiY(points2,1.5);
var knots = makeKnots(points);
var profile = NUBS(S0)(2)(knots)(points);
var profile2 = NUBS(S0)(2)(knots)(points2);
var latoInferiore = BEZIER(S1)([profile,profile2]);

var lateraleSottoP1 = points[0];
var lateraleSottoP1L = points2[0];

var curve = MAP(latoInferiore)(domain2d);
cornice.push(curve);

var punto1Sfondo = points[points.length-1];
var punto2Sfondo = points2[points2.length-1];

//lati superiori
var points = [[0,0.1,0.4],[0,0.1,0.1],[0,0.1,0.05],[0,0.15,0.1],[0,0.2,0.1],[0,0.25,0.05],[0,0.3,0.1],[0,0.35,0],[0,0.4,0.05],[0,0.4,0.1],[0,0.4,0.4]];
points = PointUtils.traslaPunti(points,1,-0.088);
points = PointUtils.traslaPunti(points,0,0.03);
var points2 = PointUtils.traslaPunti(points,0,xBaseTriangolo/2);
points2 = PointUtils.traslaPunti(points2,1,hTriangolo);
var points3 = PointUtils.traslaPunti(points,0,xBaseTriangolo-0.05);
var knots = makeKnots(points);
var profile = NUBS(S0)(2)(knots)(points);
var profile2 = NUBS(S0)(2)(knots)(points2);
var profile3 = NUBS(S0)(2)(knots)(points3);
var latoSuperiore1 = BEZIER(S1)([profile,profile2]);
var latoSuperiore2 = BEZIER(S1)([profile3,profile2]);
var curve = MAP(latoSuperiore1)(domain2d);
var curve2 = MAP(latoSuperiore2)(domain2d);
cornice.push(curve);
cornice.push(curve2);

var punto3Sfondo = points2[0];

var zLaterale = zBaseTimpano - 0.3;
var tettoPunto1 = points[points.length-1];
var tettoPunto2 = points2[points2.length-1];
var tettoPunto3 = [tettoPunto2[0],tettoPunto2[1],tettoPunto2[2]+zLaterale];
var tetto2Punto1 = points3[points3.length-1];
//laterali
//laterale1

var pointsLato1 = [[points[0][0],points[0][1],points[0][2]+zLaterale],[points[points.length-1][0],points[points.length-1][1],points[points.length-1][2]+zLaterale]];
pointsLato1.push(pointsLato1[1]);

var tettoPunto4 = pointsLato1[1];

var profiloLato1 = NUBS(S0)(2)([0,0,0,1,1,1])(pointsLato1);
var lato1 = BEZIER(S1)([profiloLato1,profile]);
lato1 = MAP(lato1)(domain2d);
cornice.push(lato1);
var punto3Sfondo = points2[0];
var lateraleSottoP2 = pointsLato1[0];
var lateraleSotto = NUBS(S0)(2)([0,0,0,1,1,1])([lateraleSottoP2,lateraleSottoP1,lateraleSottoP1]);

var lateraleSopraP1 = [lateraleSottoP1[0]+0.4,lateraleSottoP1[1],lateraleSottoP1[2]];
var lateraleSopraP2 = [lateraleSottoP2[0]+0.4,lateraleSottoP2[1],lateraleSottoP2[2]];
var lateraleSopra = NUBS(S0)(2)([0,0,0,1,1,1])([lateraleSopraP2,lateraleSopraP2,lateraleSopraP1]); 
var laterale = BEZIER(S1)([lateraleSopra,lateraleSotto]);
laterale = MAP(laterale)(domain2d);
cornice.push(laterale);

//laterale2
var pointsLato1 = [[points3[0][0],points3[0][1],points3[0][2]+zLaterale],[points3[points3.length-1][0],points3[points3.length-1][1],points3[points3.length-1][2]+zLaterale]];
pointsLato1.push(pointsLato1[1]);
var tetto2Punto4 = pointsLato1[1];
var profiloLato1 = NUBS(S0)(2)([0,0,0,1,1,1])(pointsLato1);
var lato1 = BEZIER(S1)([profiloLato1,profile3]);
lato1 = MAP(lato1)(domain2d);
cornice.push(lato1);

var lateraleSottoP2L = pointsLato1[0];
var lateraleSotto = NUBS(S0)(2)([0,0,0,1,1,1])([lateraleSottoP2L,lateraleSottoP1L,lateraleSottoP1L]);

var lateraleSopraP1 = [lateraleSottoP1L[0]-0.4,lateraleSottoP1L[1],lateraleSottoP1L[2]];
var lateraleSopraP2 = [lateraleSottoP2L[0]-0.4,lateraleSottoP2L[1],lateraleSottoP2L[2]];
var lateraleSopra = NUBS(S0)(2)([0,0,0,1,1,1])([lateraleSopraP2,lateraleSopraP2,lateraleSopraP1]); 
var laterale = BEZIER(S1)([lateraleSopra,lateraleSotto]);
laterale = MAP(laterale)(domain2d);
cornice.push(laterale);

cornice = STRUCT(cornice);
cornice = T([0,1,2])([-0.13,0.75,-0.1])(cornice);
timpano.push(cornice);

//cubetti
var xCubo = 0.1;
var yCubo = 0.15;
var zCubo = 0.1;
var nCubi = 35;

var space = (xBaseTimpano- 0.45 - xCubo*nCubi)/(nCubi-1);
var cubo = CUBOID([xCubo,yCubo,zCubo]);
var t = T([0])([space+xCubo]);
var cubetti = STRUCT(REPLICA(nCubi)([cubo,t]));
cubetti = T([0,1,2])([0.15+0.06,8.08-7.465,3.44-3.35])(cubetti);
timpano.push(cubetti);

//sfondo
var sfondo = SIMPLICIAL_COMPLEX([punto1Sfondo,punto2Sfondo,punto3Sfondo])([[0,1,2]]);
sfondo = T([0,1,2])([-0.13,0.75,-0.1])(sfondo);
timpano.push(sfondo);

//cubetti sfondo
var xCubo = 0.1;
var yCubo = 0.15;
var zCubo = 0.1;
var nCubi = 15;
var cubo = CUBOID([xCubo,yCubo,zCubo]);
cubo = T([0,1,2])([xBaseTriangolo/2-0.21,hTriangolo+8.1,3.42])(cubo);
var space = (ipotenusa + 1 - xCubo*nCubi)/(nCubi-1);
var tx = space*SIN(alpha-PI/24);
var ty = space*COS(alpha-PI/24);
var t = T([0,1])([-tx,-ty]);
var cubetti = T([0,1,2])([0.06,-7.465,-3.35])(STRUCT(REPLICA(nCubi)([cubo,t])));
var t2 = T([0,1])([tx,-ty]);
var cubetti2 = T([0,1,2])([0.06,-7.465,-3.35])(STRUCT(REPLICA(nCubi)([cubo,t2])));
timpano.push(cubetti);
timpano.push(cubetti2);

//cubetti laterali
var xCubo = 0.1;
var yCubo = 0.15;
var zCubo = 0.1;
var nCubi = 15;
var space = (zBaseTimpano- 0.27 - xCubo*nCubi)/(nCubi-1);

var cubo = CUBOID([xCubo,yCubo,zCubo]);
cubo = T([0,1,2])([0.15+0.06-xCubo-0.02,8.08-7.465,3.42-3.35+zCubo+0.05])(cubo);
var tz = T([2])([space+zCubo]);
var cubettiLaterali1 = STRUCT(REPLICA(nCubi)([cubo,tz]));
timpano.push(cubettiLaterali1);
var cubettiLaterali2 = T([0])([xBaseTimpano + xCubo - 0.38])(cubettiLaterali1);
timpano.push(cubettiLaterali2);

//tetto
var tetto = SIMPLICIAL_COMPLEX([tettoPunto1,tettoPunto2,tettoPunto3,tettoPunto4,tettoPunto1])([[0,1,3],[2,3,1]]);
var tetto2 = SIMPLICIAL_COMPLEX([tetto2Punto1,tettoPunto2,tettoPunto3,tetto2Punto4,tetto2Punto1])([[0,1,3],[2,3,1]]);
tetto = STRUCT([tetto,tetto2]);
tetto = T([0,1,2])([-0.13,0.75,-0.1])(tetto);
tetto = COLOR([100/255,34/255,34/255])(tetto);
timpano.push(tetto);
timpano = STRUCT(timpano);
timpano = T([0,1,2])([-0.06,7.465,3.35])(timpano);

return timpano;
}

var xBaseTimpano = 8.52;
var villaFront = [];
var villa = [];
var base = base();
villaFront.push(base);
var colonnato = colonnato();
villaFront.push(colonnato);
var lateral = lateral();
villaFront.push(lateral);
var timpano = buildTimpano();
villaFront.push(timpano);
villaFront = STRUCT(villaFront);
villa.push(villaFront);
var villaLeft =R([0,2])([-PI/2])(villaFront);
villaLeft = T([0,2])([3.8*2 +xBaseTimpano + 2.8,3.8+xBaseTimpano/2 + 2.45])(villaLeft);
villa.push(villaLeft);
var villaRight = R([0,2])([PI/2])(villaFront);
villaRight = T([0,2])([-xBaseTimpano-1.99,3.8+xBaseTimpano/2 + 10.85 ])(villaRight);
villa.push(villaRight);

villa = STRUCT(villa);
DRAW(villa);