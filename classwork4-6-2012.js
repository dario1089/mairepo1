!function(exports){
var domain2d = DOMAIN([[0,1],[0,1]])([50,1]);
var domain = INTERVALS(1)(20);
var domainR = DOMAIN([[0,1],[0,2*PI]])([40,30]);
var xBaseTimpano = 8.52;


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

var buildcapital = function(){
var zcapital = 16;
var prof = 0.6;
var capital = [];
var points = [[3,4,0],[3,6,0],[5,7.5,0],[8,6,0],[8,2,0],[5,0,0],[1,1,0],[-0.5,4,0],[0,7,0],[2,9,0],[6,9.5,0],[9,8,0],[10.5,4,0],[9.5,0.5,0],[7,-2,0],[-1,-1,0],[-3.5,4,0],[-2,9,0],[2,12.5,0],[8,13,0],[20,13,0]];

var knots = makeKnots(points);
var center = [5,4,0];
var spes = 0.8;
var points2 = points.map(function(p){return [ spes*p[0] + (1-spes)*center[0], spes*p[1] + (1-spes)*center[1], 0 ]});
var curve = NUBS(S0)(2)(knots)(points);
var curve2 = NUBS(S0)(2)(knots)(points2);
var capit = BEZIER(S1)([curve,curve2]);
var frontSurface1 = MAP(capit)(domain2d);
capital.push(frontSurface1);
var latSurface = [];
var latSurface2 = [];
latSurface.push(curve);
latSurface2.push(curve2);

var points = points.map(function(p){return [p[0],p[1],p[2]+zcapital]});
var points2 = points2.map(function(p){return [p[0],p[1],p[2]+zcapital]});
var curve = NUBS(S0)(2)(knots)(points);
var curve2 = NUBS(S0)(2)(knots)(points2);
var capit2 = BEZIER(S1)([curve,curve2]);
var frontSurface2 = MAP(capit2)(domain2d);
capital.push(frontSurface2);
latSurface.push(curve);
latSurface2.push(curve2);

var latSurface = BEZIER(S1)(latSurface);
var latSurface = MAP(latSurface)(domain2d);
capital.push(latSurface);
var latSurface2 = BEZIER(S1)(latSurface2);
var latSurface2 = MAP(latSurface2)(domain2d);
capital.push(latSurface2);

var center = [5,4,prof];
var pointsProfile = points2.map(function(p){return [p[0],p[1],p[2] - zcapital+ prof]});
var curve = NUBS(S0)(2)(knots)(pointsProfile);

var fakePoint = BEZIER(S0)([center,center]);
var riempimento = BEZIER(S1)([fakePoint, curve]);
var riempimento = MAP(riempimento)(domain2d);
capital.push(riempimento);

var center = [5,4,zcapital - prof];
var pointsProfile = points2.map(function(p){return [p[0],p[1],p[2] - prof]});
var curve = NUBS(S0)(2)(knots)(pointsProfile);

var fakePoint = BEZIER(S0)([center,center]);
var riempimento = BEZIER(S1)([fakePoint, curve]);
var riempimento = MAP(riempimento)(domain2d);
capital.push(riempimento);


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
capital.push(frontSurface1);
var latSurface = [];
var latSurface2 = [];
latSurface.push(curve);
latSurface2.push(curve2);

var points = points.map(function(p){return [p[0],p[1],p[2]+zcapital]});
var points2 = points2.map(function(p){return [p[0],p[1],p[2]+zcapital]});
var curve = NUBS(S0)(2)(knots)(points);
var curve2 = NUBS(S0)(2)(knots)(points2);
var capit2 = BEZIER(S1)([curve,curve2]);
var frontSurface2 = MAP(capit2)(domain2d);
capital.push(frontSurface2);
latSurface.push(curve);
latSurface2.push(curve2);

var latSurface = BEZIER(S1)(latSurface);
var latSurface = MAP(latSurface)(domain2d);
capital.push(latSurface);
var latSurface2 = BEZIER(S1)(latSurface2);
var latSurface2 = MAP(latSurface2)(domain2d);
capital.push(latSurface2);

var center = [5+l-7,4,prof];
var pointsProfile = points2.map(function(p){return [p[0],p[1],p[2] - zcapital+ prof]});
var curve = NUBS(S0)(2)(knots)(pointsProfile);

var fakePoint = BEZIER(S0)([center,center]);
var riempimento = BEZIER(S1)([fakePoint, curve]);
var riempimento = MAP(riempimento)(domain2d);
capital.push(riempimento);

var center = [5+l-7,4,zcapital - prof];
var pointsProfile = points2.map(function(p){return [p[0],p[1],p[2] - prof]});
var curve = NUBS(S0)(2)(knots)(pointsProfile);

var fakePoint = BEZIER(S0)([center,center]);
var riempimento = BEZIER(S1)([fakePoint, curve]);
var riempimento = MAP(riempimento)(domain2d);
capital.push(riempimento);



var base = T([1])([4.2])(SIMPLEX_GRID([[-8,14],[6.2],[-prof,zcapital-2*prof]]));
var torusSurface = R([1,2])([PI/2])(TORUS_SURFACE([3, 6.5])([50,10]));
var torusSurface = T([0,1,2])([15,6,8])(torusSurface);

capital.push(base);
capital.push(torusSurface);

var capital = STRUCT(capital);

var capital = S([0,1,2])([0.3,0.15,0.3])(capital);
capital = T([1])([-0.77])(capital);
return capital;
}

var buildColumnBody = function(){
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

var buildLateralArchway = function(){

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

var lateralArchway = [];
var pointsArco1 = [[0,0,0],[0.05,0.5,0],[spacePillars-0.05,0.5,0],[spacePillars,0,0]];
var knots = makeKnots(pointsArco1);
var curve = NUBS(S0)(2)(knots)(pointsArco1);

var hArco = 1;
var points = [[0,hArco,0],[spacePillars,hArco,0],[spacePillars,hArco,0]];
var curve2 = NUBS(S0)(2)([0,0,0,1,1,1])(points);

var arco = BEZIER(S1)([curve,curve2]);
var arco1 = MAP(arco)(domain2d);
lateralArchway.push(arco1);
var arco2 = T([2])([xBase-0.1])(arco1);
lateralArchway.push(arco2);
var zPezzo = xBase;
points = [[0.375,0.49,-0.05],[0.525,0.49,-0.05],[0.625,hArco,-0.05],[0.275,hArco,-0.05]];
var points2 = points.map(function(p){return [p[0], p[1], p[2]+zPezzo]});
points = points.concat(points2);

var pezzo = SIMPLICIAL_COMPLEX(points)([[0,1,2,3],[4,0,3,7],[1,5,6,2],[3,2,6,7],[5,4,7,6],[4,5,1,0]]);
var pezzo = T([0])([-0.05])(pezzo);
lateralArchway.push(pezzo);

var pointsArco2 = pointsArco1.map(function(p){return [p[0],p[1],p[2]+(xBase-0.1)]});
knots = makeKnots(pointsArco2);
curve2 = NUBS(S0)(2)(knots)(pointsArco2);
var volta = BEZIER(S1)([curve,curve2]);
volta = MAP(volta)(domain2d);
lateralArchway.push(volta);

var zBase = 1.9;
var hPillar2= hArco;
hBase = 0.3;
var pillar = SIMPLEX_GRID([[-spacePillars,zPillar],[hPillar2],[xBase-0.1]]);
lateralArchway.push(pillar);
var pillar2 = T([0])([-spacePillars-zPillar])(pillar);
lateralArchway.push(pillar2);

lateralArchway = STRUCT(lateralArchway);
lateralArchway = R([0,2])([PI/2])(lateralArchway);
lateralArchway = T([0,1,2])([0.14,3+hBase+0.4+hPillar+hBase+0.2,4.15+spacePillars+zPillar])(lateralArchway);
base.push(lateralArchway);
var lateralArchway2 = T([0])([7.72])(lateralArchway);
base.push(lateralArchway2);
base = S([2])([1.45])(STRUCT(base));
base = T([2])([-1.8])(base);
return base;
}

var buildSteps = function(){
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

var steps = S([0])([1.4])(STRUCT([tunnel,steps,stepsBorder]));

return steps;}

var buildColumnade = function(){

var capital = buildcapital();

var column = buildColumnBody();

var base = buildColumnBase();

var qBase = T([0,1,2])([0.5,-43.5,-1.5])(CUBOID([8,1,8]));

column = STRUCT([capital, column,base,qBase]);
column = S([0,1,2])([0.07,0.1,0.07])(column);
column = T([0,1,2])([0.1,7.35,3.55])(column);
var t = T([0])([1.52]);
var columnade = STRUCT([column,t,column,t,column,t,column,t,column,t,column]);
return columnade;}

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

var buildFacade = function(){
var xBaseTimpano = 8.52;
var facade = [];
var steps = buildSteps();
facade.push(steps);
var columnade = buildColumnade();
facade.push(columnade);
var lateralArchway = buildLateralArchway();
facade.push(lateralArchway);
var timpano = buildTimpano();
facade.push(timpano);
facade = STRUCT(facade);
return facade;}

var buildBigWindow = function(){

var frame = [];
var window1 = [];
var xBaseTimpano = 8.52;
var zBaseTimpano = 3.55;
var xBaseTriangle = xBaseTimpano+0.2;
var hTriangle = 2.5;
var hypotenuse = SQRT((hTriangle*hTriangle) + (xBaseTriangle/2*xBaseTriangle/2));
var alpha = Math.asin(hTriangle/hypotenuse)+PI/4.8;
var pointsNR = [[0,0,0.3],[0,0,0.1],[0,0.05,0.05],[0,0.1,0.1],[0,0.15,0.05],[0,0.2,0.1],[0,0.2,0.3]];
pointsNR = PointUtils.traslaPunti(pointsNR,1,0.01);
var points=PointUtils.ruotaPunti(pointsNR,-alpha,2);
points = PointUtils.scalaPuntiY(points,1.5);
var points2 = PointUtils.ruotaPunti(pointsNR,alpha,2);
points2 = PointUtils.traslaPunti(points2,0,xBaseTriangle);
points2 = PointUtils.scalaPuntiY(points2,1.5);
var knots = makeKnots(points);
var profile = NUBS(S0)(2)(knots)(points);
var profile2 = NUBS(S0)(2)(knots)(points2);
var lowerSide = BEZIER(S1)([profile,profile2]);

var LatDownP1 = points[0];
var LatDownP1L = points2[0];

var curve = MAP(lowerSide)(domain2d);
frame.push(curve);

//lati superiori
var points = [[0,0.1,0.4],[0,0.1,0.1],[0,0.1,0.05],[0,0.15,0.1],[0,0.2,0.1],[0,0.25,0.05],[0,0.3,0.1],[0,0.35,0],[0,0.4,0.05],[0,0.4,0.1],[0,0.4,0.4]];
points = PointUtils.traslaPunti(points,1,-0.088);
points = PointUtils.traslaPunti(points,0,0.03);
var points2 = PointUtils.traslaPunti(points,0,xBaseTriangle/2);
points2 = PointUtils.traslaPunti(points2,1,hTriangle);
var points3 = PointUtils.traslaPunti(points,0,xBaseTriangle-0.05);
var knots = makeKnots(points);
var profile = NUBS(S0)(2)(knots)(points);
var profile2 = NUBS(S0)(2)(knots)(points2);
var profile3 = NUBS(S0)(2)(knots)(points3);
var upperSide1 = BEZIER(S1)([profile,profile2]);
var upperSide2 = BEZIER(S1)([profile3,profile2]);
var curve = MAP(upperSide1)(domain2d);
var curve2 = MAP(upperSide2)(domain2d);
frame.push(curve);
frame.push(curve2);

var zLat = zBaseTimpano - 0.3;
var roofPoint1 = points[points.length-1];
var roofPoint2 = points2[points2.length-1];
var roofPoint3 = [roofPoint2[0],roofPoint2[1],roofPoint2[2]+zLat];
var roof2Point1 = points3[points3.length-1];




//lateral closure 1
var fakePoint = [points[0],points[0], points[points.length-1]];
var fakePointNubs = NUBS(S0)(2)([0,0,0,1,1,1])(fakePoint);
var cLat1 = BEZIER(S1)([fakePointNubs,profile]);
cLat1 = MAP(cLat1)(domain2d);
frame.push(cLat1);

//lateral closure 2
var fakePoint = [points3[0],points3[0], points3[points.length-1]];
var fakePointNubs = NUBS(S0)(2)([0,0,0,1,1,1])(fakePoint);
var cLat2 = BEZIER(S1)([fakePointNubs,profile3]);
cLat2 = MAP(cLat2)(domain2d);
frame.push(cLat2);
frame = STRUCT(frame);
frame = T([0,1,2])([-0.13,0.75,-0.1])(frame);
window1.push(frame);

//profile
var ornament = [];
var h = 2.5;
var z = 1;
var x = 0.5;

var points = [[x,0,0],[x,0.5/11*h,-1/3*z],[x,0.7/11*h,-0.5/3*z],[x,1.5/11*h,-1.5/3*z],[x,2.5/11*h,-0.5/3*z],[x,4/11*h,-1/3*z],[x,6/11*h,-2/3*z],[x,8.5/11*h,-z],[x,10.5/11*h, -2/3*z],[x,h,0]];
var knots = makeKnots(points);
var profile = NUBS(S0)(2)(knots)(points);

var depthOrnament = 0.3;
var ornamentwindow1 = CYLINDRICAL_SURFACE(profile)([depthOrnament,0,0]);
ornamentwindow1 = MAP(ornamentwindow1)(domain2d);
ornament.push(ornamentwindow1);
var pointsRiempimento = [points[0],points[0],points[points.length-1]];
var profileRiempimento = NUBS(S0)(2)([0,0,0,1,1,1])(pointsRiempimento);
var riempimento1 = BEZIER(S1)([profileRiempimento,profile]);
riempimento1 = MAP(riempimento1)(domain2d);
var riempimento2 = T([0])([depthOrnament])(riempimento1);
ornament.push(riempimento1);
ornament.push(riempimento2);
ornament = STRUCT(ornament);
ornament = T([1,2])([-1.75,0.3])(ornament);

var translationOrnament2 = depthOrnament + xBaseTimpano - 1.6;
var ornament2 = T([0])([translationOrnament2])(ornament);
window1.push(ornament);
window1.push(ornament2);

var hFrame = 0.4;
var yFrame = 1;
var zFrame = 0.4;
var upperFrame = SIMPLEX_GRID([[-depthOrnament - 0.5,translationOrnament2 - depthOrnament],[hFrame],[-0.2,zFrame]]);
upperFrame = T([1])([-yFrame])(upperFrame);
window1.push(upperFrame);

//decorazione inferiore
var hFrameLat = 10;
var yFrame = 1 + hFrame;
var xFrameLat = hFrame;
var frameLat = SIMPLEX_GRID([[-depthOrnament - 0.5,xFrameLat],[hFrameLat],[-0.2,zFrame]]);
frameLat = T([1])([-yFrame - hFrameLat + 0.4])(frameLat);
var frameLat2 = T([0])([translationOrnament2 - 2*depthOrnament - 0.1])(frameLat);
window1.push(frameLat);
window1.push(frameLat2);

var lowerFrame = SIMPLEX_GRID([[-depthOrnament - 0.5 + 0.1,translationOrnament2 - depthOrnament + 0.2],[hFrame],[-0.2,zFrame + 0.1]]);
lowerFrame = T([1,2])([-yFrame - hFrameLat + 0.4 - hFrame,-zFrame])(lowerFrame);
window1.push(lowerFrame);

var lowerOrnament = SIMPLEX_GRID([[-depthOrnament - 0.5,translationOrnament2 - depthOrnament],[10 * hFrame + 0.3],[-0.2,zFrame+0.1]]);
lowerOrnament = T([1])([-yFrame - hFrameLat + 0.4 - 9*hFrame - 0.3])(lowerOrnament);
window1.push(lowerOrnament);

//decorazione superiore
var depthUpperOrnament = 6.9;
var hDec = 1.47;
var points = [[x,0,0],[x,2/5*hDec,-0.3],[x,3.5/5*hDec,-0.15],[x,4.2/5*hDec,-0.25],[x,hDec,-0.15]];
var knots = makeKnots(points);
var profileDec = NUBS(S0)(2)(knots)(points);
var upperOrnament = CYLINDRICAL_SURFACE(profileDec)([depthUpperOrnament,0,0]);
upperOrnament = MAP(upperOrnament)(domain2d);
upperOrnament = T([0,1,2])([depthOrnament,-0.7,0.2])(upperOrnament);
window1.push(upperOrnament);

//window1
var win = [];
var depthWin = 4.5;
var zWin = depthWin/2;
var xWin = 0.4;
var depthWin = 0.1;
var framesLatWin = SIMPLEX_GRID([[-depthOrnament - 0.5 - xFrameLat, xWin],[hFrameLat],[-0.2 - zWin,depthWin]]);
framesLatWin = T([0,1])([0,-yFrame - hFrameLat + 0.4])(framesLatWin);
win.push(framesLatWin);
var framesLatWin2 = T([0])([translationOrnament2 - 2*depthOrnament - 0.1 - 2*xWin])(framesLatWin);
win.push(framesLatWin2);

var upperFrameWin = SIMPLEX_GRID([[-depthOrnament - 0.5 - xFrameLat - xWin, translationOrnament2 - 2*depthOrnament - 3*xWin - 0.1],[xWin],[-0.2 - zWin,depthWin]]);
upperFrameWin = T([1])([-yFrame])(upperFrameWin);
win.push(upperFrameWin);
var middleFrameWin = T([1])([-1/3*hFrameLat])(upperFrameWin);
win.push(middleFrameWin);
var frameInfWin = T([1])([-hFrameLat + xWin])(upperFrameWin);
win.push(frameInfWin);
var middleFrameVert = SIMPLEX_GRID([[- xFrameLat - translationOrnament2/2, xWin],[2/3*hFrameLat - 2*xWin],[-0.2 - zWin,depthWin]]);
middleFrameVert = T([1])([-hFrameLat - yFrame + 2*xWin])(middleFrameVert);
win.push(middleFrameVert);
win = STRUCT(win);
win = COLOR([0,0,0])(win);
window1.push(win);

//glasses
var glasses = [];
var supGlass = SIMPLEX_GRID([[-depthOrnament - 0.5 - xFrameLat - xWin, translationOrnament2 - 2*depthOrnament - 3*xWin - 0.1],[1/3*hFrameLat - xWin],[-0.2 - zWin,depthWin]]);
supGlass = T([1])([-yFrame - 1/3*hFrameLat + xWin])(supGlass);
glasses.push(supGlass);

var lowerGlass1 = SIMPLEX_GRID([[-depthOrnament - 0.5 - xFrameLat - xWin, (translationOrnament2 - 2*depthOrnament - 3*xWin)/2 - xWin + 0.2],[2/3*hFrameLat - 2*xWin],[-0.2 - zWin,depthWin]]);
lowerGlass1 = T([1])([-yFrame + 2*xWin - hFrameLat])(lowerGlass1);
glasses.push(lowerGlass1);
var lowerGlass2 = T([0])([(translationOrnament2 - 2*depthOrnament - 3*xWin)/2 + 0.1])(lowerGlass1);
glasses.push(lowerGlass2);

glasses = STRUCT(glasses);
glasses = COLOR([147/255,204/255,234/255,0.7])(glasses);
window1.push(glasses);
window1 = STRUCT(window1);

return window1;
}

var buildWalls = function(){
var walls = [];
var depthWall = 1;
var xWall = 30;
var xWin = 0.8;
var yGrate = 0.9*xWin;
var yWin = 2.25;
var hWall = 11;
var swindow1
var wall = [];
var xNow=0
var wall1 = SIMPLEX_GRID([[depthWall],[hWall],[-6.9,0.01]]);
var wall3 = SIMPLEX_GRID([[-depthWall,0.01],[hWall],[-6.9,depthWall]]);
var wall2 = SIMPLEX_GRID([[-depthWall-0.01,xWin],[2/17*hWall,-yGrate, 2.65/17*hWall, -yWin + 0.05,4/17*hWall + 0.62, -1.5*yGrate,1.2/17*hWall],[-6.9,depthWall]]);
xNow = depthWall+0.01 + xWin;
wall.push(wall1);
wall.push(wall2);
wall.push(wall3);
var wall4 = SIMPLEX_GRID([[-depthWall - 0.01 - xWin, 2.6*depthWall],[hWall],[-6.9,depthWall]]);
xNow+= 2.6*depthWall;
wall.push(wall4);
xWin2 = xWin - 0.1;
var wall5 = SIMPLEX_GRID([[-depthWall - xWin - 0.01 - 2.6*depthWall, xWin2],[2/17*hWall,yGrate, 2.7/17*hWall, -2/3*yWin,2/17*hWall + 1/3*yWin, -yGrate,2.25/17*hWall, -yGrate,1.24/17*hWall],[-6.9,depthWall]]);
xNow+= xWin2; 
wall.push(wall5);


var wall6 = SIMPLEX_GRID([[-xNow,xWin2],[hWall],[-6.9,depthWall]]);
xNow+=xWin2;
wall.push(wall6);
var wall7 = SIMPLEX_GRID([[-xNow , xWin2],[2/17*hWall,yGrate, 2.7/17*hWall, -2/3*yWin,2/17*hWall+ 1/3*yWin, -yGrate,2.5/17*hWall, +1.2*yGrate,0.76/17*hWall],[-6.9,depthWall]]);
xNow+=xWin2;
wall.push(wall7);
var wall8 = SIMPLEX_GRID([[-xNow,0.5],[hWall],[-6.9,depthWall]]);
xNow+=0.5;
wall.push(wall8);
var largPorta = 1.6;
var wall9 = SIMPLEX_GRID([[-xNow,largPorta],[3,-yWin*1.5, (hWall-3 - yWin*1.5)],[-6.9,depthWall]]);
wall.push(wall9);
xNow+=largPorta;
var wall10 = SIMPLEX_GRID([[-xNow,0.5],[hWall],[-6.9,depthWall]]);
wall.push(wall10);
xNow+=0.5;
var wall11 = SIMPLEX_GRID([[-xNow , xWin2],[2/17*hWall,yGrate, 2.7/17*hWall, -2/3*yWin,2/17*hWall+ 1/3*yWin, -yGrate,2.5/17*hWall, +1.2*yGrate,0.76/17*hWall],[-6.9,depthWall]]);
wall.push(wall11);
xNow+=xWin2;
var wall12 = SIMPLEX_GRID([[-xNow,xWin2],[hWall],[-6.9,depthWall]]);
wall.push(wall12);
xNow+=xWin2;
var wall13 = SIMPLEX_GRID([[-xNow, xWin2],[2/17*hWall,yGrate, 2.7/17*hWall, -2/3*yWin,2/17*hWall + 1/3*yWin, -yGrate,2.25/17*hWall, -yGrate,1.24/17*hWall],[-6.9,depthWall]]);
wall.push(wall13);
xNow+=xWin2;
var wall14 = SIMPLEX_GRID([[-xNow, 2.6*depthWall],[hWall],[-6.9,depthWall]]);
xNow+=2.6*depthWall;
wall.push(wall14);
var wall14 = SIMPLEX_GRID([[-xNow,xWin],[2/17*hWall,-yGrate, 2.65/17*hWall, -yWin + 0.05,4.6/17*hWall + 0.53, -1.2*yGrate,1.1/17*hWall],[-6.9,depthWall]]);
xtranslationWin = xNow;
xNow+= xWin;
var wall15 = SIMPLEX_GRID([[-xNow,0.01],[hWall],[-6.9,depthWall]]);
xNow+= 0.01;
var wall16 = SIMPLEX_GRID([[-xNow,depthWall],[hWall],[-6.9,0.01]]);
wall.push(wall14);
wall.push(wall15);
wall.push(wall16);

var decwall1 = SIMPLEX_GRID([[depthWall + xWin + 2*depthWall],[-3,0.4],[-6.89,0.01]]);
wall.push(decwall1);
var decwall2 = SIMPLEX_GRID([[depthWall + xWin + 2*depthWall],[-2.7,0.3],[-6.86,0.04]]);
wall.push(decwall2);


var window1 = buildBigWindow();
var swindow1X = xWin/6.2;
var swindow1Y = 0.22;
var swindow1Z = 0.3;
window1 = S([0,1,2])([swindow1X,swindow1Y,swindow1Z])(window1);
window1 = T([0,1,2])([0.85,2/17*hWall+yGrate + 2/17*hWall + yWin + 0.2 + 0.4,6.8])(window1);
wall.push(window1);

var window2 = T([0])([xtranslationWin - xWin - 0.2])(window1);
wall.push(window2);
wall = STRUCT(wall);
wall = T([0])([-depthWall - 2/20*xWall + 0.4])(wall);
walls.push(wall);
var wallLeft = R([0,2])([-PI/2])(wall);
wallLeft = T([0,2])([3.8*2 +xBaseTimpano + 2.8,3.8+xBaseTimpano/2 + 2.45])(wallLeft);
walls.push(wallLeft);
var wallRight = R([0,2])([PI/2])(wall);
wallRight = T([0,2])([-xBaseTimpano-1.98,3.8+xBaseTimpano/2 + 10.86 ])(wallRight);
walls.push(wallRight);
//var wallDietro = R([0,2])([PI])(wall);
//wallDietro = T([2])([(3.8+xBaseTimpano/2 + 2.45)*2])(wallDietro);
walls = STRUCT(walls);
return walls;
}

var buildFacades = function(){
var facades = [];
var facade = buildFacade();
facades.push(facade);
//var facadeLeft =R([0,2])([-PI/2])(facade);
//facadeLeft = T([0,2])([3.8*2 +xBaseTimpano + 2.8,3.8+xBaseTimpano/2 + 2.45])(facadeLeft);
//facades.push(facadeLeft);
//var facadeRight = R([0,2])([PI/2])(facade);
//facadeRight = T([0,2])([-xBaseTimpano-1.99,3.8+xBaseTimpano/2 + 10.85 ])(facadeRight);
//facades.push(facadeRight);
facades = STRUCT(facades);
return facades;
}

var ville = [];
//var facades = buildFacades();
//ville.push(facades);
var walls = buildWalls();
ville.push(walls);

ville = STRUCT(ville);
exports.ville = ville;}(this);
DRAW(ville);
