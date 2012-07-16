!function(exports){
var domain2d = DOMAIN([[0,1],[0,1]])([50,1]);
var domain = INTERVALS(1)(20);
var domainR = DOMAIN([[0,1],[0,2*PI]])([40,30]);
var xBaseTimpano = 8.52;
var bColor = [1,1,0.9];
var wallX;

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

PointUtils.scaleAllPoints = function(pointList,scale){
	 return pointList.map(function(pt) { 
  return [ pt[0] * scale, pt[1]*scale, pt[2]*scale];
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

var buildStatue = function(){
var points =[[4.9,25.7],[6,25.1],[7,24.8],[7.9,24.5],
            [7.4,22],[7.4,22.2],[7.5,21.4],[7.4,20.8],[7.1,19.6],
            [6.8,18.5],[7,18.4],[7.1,18.3],[7.2,18.1],
            [7.1,18],[7.2,17.8],[7.1,17.5],[7.2,17.4],
            [7.2,17.2],[7.1,17.1],[7.2,16.9],[7.1,16.7],
            [7.2,16.5],[7.2,16.2],[6.9,16],[7.2,14.5],
            [7.2,14],[7.5,13],[7.4,12.6 ],[7.6,11.3 ],
            [7.5,11.2 ],[7.5,10.2 ],[1.5,10.8],
            [1.1,11.1],[1,13.5],[0.9,14.4],[1,16],[1,16.7],
            [0.9,16.7],[0.9,17.2],[1.1,17.5],[0.9,17.6],[1.2,17.8],[1.6,18.5],
            [1.4,18.5],[1.3,18.8],[1.5,19],[1.4,19.1],[1.5,19.3],
            [1.4,19.5],[1.5,19.6],[1.2,19.6],[1.5,20],[0.9,23.4],
            [0.7,23.8],[1.3,24.9],[1.5,25.5],[2,25.4],[2.5,25],
            [3.5,25.2],[4.9,25.7]];


 var points2 = [[7.5,11.2 ],[7.5,10.2 ],[7.3,10 ],[7.3,9 ],
            [7.1,8.6 ],[7.9,7 ],[8,6 ],[8.4,3],[7.1,3.7],[7.1,4.1],[6,6.5],[5.9,7.6],
            [5.8,7.8],[5.3,9],[5.1,10.1],[5,11.2],[7.5,11.2 ]];

 var points3 = [[4.4,11.4],
            [4.3,8.2],[4.5,8.4],[4.6,5.3],[4.5,4.9],[4.8,1.8],[3.3,2.3],[2.8,4.6],
            [2.8,4.9],[2.5,6.1],[2.6,7.6],[1,12],[4.4,11.4]];


 var points4 = [[6.5,25],[7.9,24.5],
            [8.4,24],[8.8,23],[9.3,21],[9.7,19.4],[8.3,19.5],
 			[7.4,22.2],[8.2,20],[6.5,25]];


var points7 = [
            [9.59,20],[9,18.1],[8.7,18],[8.4,18.1],
            [8.1,18.8],[8.1,20],[9.59,20]];


var points5 = [[8.2,3.9 ],
            [8.9,2.6 ],[9.4,1.8 ],[9.4,1 ],[9.1,0.8 ],[9,1 ],
            [8.9,0.9 ],[8.4,0.8 ],[8.1,1],[7.7,2.4],[7.1,3.4],
            [7.2,4],[8.2,3.9 ]];

var points6 = [[4.6,2.3],
            [4.6,1.2],[4.2,1],[4,0.6],[2.7,0.5],[2.5,0.6],
            [2.2,0.6],[1.9,1.2],[2.9,1.4],[3.4,2],[3.5,2.8],[4.6,2.3]];

var statue = [];

var knots = makeKnots(points);
var profile = NUBS(S0)(2)(knots)(points);
var body = CONICAL_SURFACE([6,17.5])(profile)
body = MAP(body)(domain2d);
statue.push(body);

var knots = makeKnots(points2);
var profile = NUBS(S0)(2)(knots)(points2);
var leftLeg = CONICAL_SURFACE([6.8,7.5])(profile)
leftLeg = MAP(leftLeg)(domain2d);
statue.push(leftLeg);

var knots = makeKnots(points3);
var profile = NUBS(S0)(2)(knots)(points3);
var rightLeg = CONICAL_SURFACE([4,5])(profile)
rightLeg = MAP(rightLeg)(domain2d);
statue.push(rightLeg);

var knots = makeKnots(points4);
var profile = NUBS(S0)(2)(knots)(points4);
var arm = CONICAL_SURFACE([8,23])(profile)
arm = MAP(arm)(domain2d);
statue.push(arm);

var knots = makeKnots(points7);
var profile = NUBS(S0)(2)(knots)(points7);
var arm2 = CONICAL_SURFACE([9,19.5])(profile)
arm2 = MAP(arm2)(domain2d);
statue.push(arm2);

var knots = makeKnots(points5);
var profile = NUBS(S0)(2)(knots)(points5);
var leftFoot = CONICAL_SURFACE([8.5,2.2])(profile)
leftFoot = MAP(leftFoot)(domain2d);
statue.push(leftFoot);

var knots = makeKnots(points6);
var profile = NUBS(S0)(2)(knots)(points6);
var rightFoot = CONICAL_SURFACE([4,1.5])(profile)
rightFoot = MAP(rightFoot)(domain2d);
statue.push(rightFoot);
statue = COLOR(bColor)(STRUCT(statue));
statue = EXTRUDE([0.7])(statue);
statue = S([0,1,2])([0.05,0.05,0.05])(statue);
var pedestal = COLOR(bColor)(SIMPLEX_GRID([[0.4],[0.1],[0.4]]));
pedestal = T([0,1,2])([0.1,-0.07,-0.175])(pedestal);
var completeStatue = STRUCT([pedestal,statue]);
return completeStatue;
}

var buildStatue2 = function(){

var points = [[5,24],[6.1,23.8],[6.6,23],[6.8,21],[8.1,19.8],
			[8.6,17.2],[9.1,15],[9.4,12.2],[8.9,11.9],[8.7,12.1],
			[8.6,12],[8.8,10.2],[8.6,9.8],[8.6,9.2],[8.1,8.8],
			[8.1,8.5],[8,8.2],[7.9,1.3],[8.2,0.8],[8.2,0.5],[1.4,0.5],
			[1.5,1],[2.2,1.7],[2.2,4.4],[2.1,9.9],[1.6,10.7],
			[1.6,11.3],[0.9,11.1],[0.8,11.4],[1.3,15],[1.8,19],
			[2.3,20],[3.3,20.8],[3.6,23],[4,23.7],[5,24]];

var knots = makeKnots(points);
var profile = NUBS(S0)(2)(knots)(points);
var statueSur = CONICAL_SURFACE([6,14])(profile);
statueSur = MAP(statueSur)(domain2d);
var statue = EXTRUDE([0.7])(statueSur);
statue = COLOR(bColor)(statue);
statue = S([0,1,2])([0.05,0.05,0.05])(statue);
return statue;
}

var buildProfBasRelief = function(){
var points = [[5,24],[6.1,23.8],[6.6,23],[6.8,21],[8.1,19.8],
			[8.6,17.2],[9.1,15],[9.4,12.2],[8.9,11.9],[8.7,12.1],
			[8.6,12],[8.8,10.2],[8.6,9.8],[8.6,9.2],[8.1,8.8],
			[8.1,8.5],[8,8.2],[7.9,1.3],[8.2,0.8],[8.2,0.5],[1.4,0.5],
			[1.5,1],[2.2,1.7],[2.2,4.4],[2.1,9.9],[1.6,10.7],
			[1.6,11.3],[0.9,11.1],[0.8,11.4],[1.3,15],[1.8,19],
			[2.3,20],[3.3,20.8],[3.6,23],[4,23.7],[5,24]];

points = points.map(function(p){return [p[0],p[1],0];});
points = PointUtils.scaleAllPoints(points,0.05);
var knots = makeKnots(points);
var profile = NUBS(S0)(2)(knots)(points);
profile = MAP(profile)(INTERVALS(1)(200));
return profile;
}

var buildColumnBase = function(){
var points = [[0,0,0],[4,0,0],[4,0,1],[3,0,1],[3,0,2],[2,0,2],[2,0,3],[0,0,3]];
var knots = makeKnots(points);
var curve = NUBS(S0)(2)(knots)(points);

var mappingBase = ROTATIONAL_SURFACE(curve);
var base = R([1,2])([-PI/2])(MAP(mappingBase)(domainR));
base = T([0,1,2])([4.5,-43,2.5])(base);
base = COLOR(bColor)(base);
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
var points = [[3,4,0],[3,6,0],[5,7.5,0],[8,6,0],
				[8,2,0],[5,0,0],[1,1,0],[-0.5,4,0],
				[0,7,0],[2,9,0],[6,9.5,0],[9,8,0],
				[10.5,4,0],[9.5,0.5,0],[7,-2,0],[-1,-1,0],
				[-3.5,4,0],[-2,9,0],[2,12.5,0],[8,13,0],[20,13,0]];

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
capital = COLOR(bColor)(capital);
return capital;
}

var buildColumnBody = function(){
	var hColumn = 4.2;
var rColumn = 0.2;
var points = [[rColumn, 0, 0],[rColumn*6.3/5,0,1/3*hColumn],[rColumn,0,hColumn]];
var pColumn = NUBS(S0)(2)([0,0,0,1,1,1])(points);
var mappingColumn = ROTATIONAL_SURFACE(pColumn);
var column = S([0,1,2])([10,10,10])(MAP(mappingColumn)(domainR));
column = R([1,2])([-PI/2])(column);
column = T([0,1,2])([4.5,-40-0.8,2.5])(column);
column = COLOR(bColor)(column);
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
tunnel = COLOR(bColor)(tunnel);
tunnel = S([0])([1.4])(tunnel);
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
base = COLOR(bColor)(base);
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
stepsBorder = COLOR(bColor)(STRUCT(stepsBorder));

var finalStepsBorder = [];
finalStepsBorder.push(stepsBorder);
var hole1 = COLOR([0,0,0.1])(SIMPLEX_GRID([[-0.5,0.01],[-1-0.4,0.8],[-0.1-2.5,0.8]]));
finalStepsBorder.push(hole1);
var hole2 = T([0])([5])(hole1);
finalStepsBorder.push(hole2);
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
var vGridRight = T([0])([5.4])(vGrid);
finalStepsBorder = STRUCT(finalStepsBorder);


//steps

var steps = [];
var steps1 = SIMPLEX_GRID([[-0.5, 5, -0.5],[stepH],[stepZ]]);
var trans = T([1,2])([stepH, stepZ]);
var nSteps = 22;
var steps = COLOR(bColor)(STRUCT(REPLICA(nSteps)([steps1,trans])));

var steps = STRUCT([finalStepsBorder,steps]);

var statue1 = buildStatue();
var statue2 = R([0,2])([PI])(buildStatue());
statue2 = T([0,1,2])([0.6,3.07,0.5])(statue2);
statue1 = T([0,1,2])([5.4,3.07,0.5])(statue1);
var finalSteps = STRUCT([steps,vGrid,vGridRight,hole1,hole2,statue1,statue2]);
var finalSteps = S([0])([1.4])(finalSteps);
return finalSteps;}

var buildcolonnade = function(){

var capital = buildcapital();

var column = buildColumnBody();

var base = buildColumnBase();

var qBase = T([0,1,2])([0.5,-43.5,-1.5])(CUBOID([8,1,8]));

column = STRUCT([capital, column,base,qBase]);
column = S([0,1,2])([0.07,0.1,0.07])(column);
column = T([0,1,2])([0.1,7.35,3.55])(column);
var t = T([0])([1.52]);
var colonnade = STRUCT([column,t,column,t,column,t,column,t,column,t,column]);
colonnade = COLOR(bColor)(colonnade);
return colonnade;}

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

//spessore
var spessore = SIMPLEX_GRID([[-0.2,xBaseTimpano-0.4],[0.05],[-0.2,0.366]]);
timpano.push(spessore);

var spessoreLaterale1 = SIMPLEX_GRID([[-0.2,0.45],[0.05],[-0.2-0.366,zBaseTimpano-0.565]]);
timpano.push(spessoreLaterale1);
var spessoreLaterale2 = T([0])([xBaseTimpano-0.85])(spessoreLaterale1);
timpano.push(spessoreLaterale2);

var smallWall1 = SIMPLEX_GRID([[-0.2 - 0.45,xBaseTimpano-1.25],[-0.05,0.65],[-0.2 - 0.366 + 0.05, 0.05]]);
timpano.push(smallWall1);
var smallWall2 = SIMPLEX_GRID([[-0.2 - 0.4,0.05],[-0.05,0.65],[-0.2-0.366,zBaseTimpano-0.565]]);
timpano.push(smallWall2);
var smallWall3 = T([0])([xBaseTimpano-1.25])(smallWall2);
timpano.push(smallWall3);
var smallWall4 = SIMPLEX_GRID([[-0.2 - 0.4,xBaseTimpano-1.2],[-0.7,0.05],[-0.2 - 0.366 + 0.05, zBaseTimpano-0.565]]);
timpano.push(smallWall4);
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
var cubetti = T([0,1,2])([0.02,-7.465,-3.35])(STRUCT(REPLICA(nCubi)([cubo,t])));
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
tetto = COLOR([205/255,92/255,92/255])(tetto);
var plate = SIMPLEX_GRID([[1],[0.5],[0.1]]);
plate = T([0,2])([xBaseTimpano/2 - 0.5,0.05])(plate);
timpano.push(plate);

var basRelief = buildStatue2();
basRelief = T([0,1,2])([4,1.3,0.01])(basRelief);
timpano.push(basRelief);

var profBasRelief = buildProfBasRelief();
profBasRelief = T([0,1,2])([4,1.3,0.01])(profBasRelief);


var ornament1 = TORUS_SURFACE([0.05, 0.2])([50,10]);
ornament1 = T([0,1,2])([1.5,1.5,0.2])(ornament1);
ornament1 = S([0])([1.6])(ornament1);
timpano.push(ornament1);
var ornament2 = T([0])([3.8])(ornament1);
timpano.push(ornament2);

//ornament3
var ornPoints = [[0,1,0],[0.5,1,0],[0.5,0.2,0],[0.5,0.0,0],
				[0.5,-0.2,0],[0.5,-0.6,0],[0,-0.8,0],[-0.5,-0.6,0],
				[-0.5,-0.2,0],[-0.5,0,0],[-0.5,0.2,0],[-0.5,1,0],[0,1,0]];
var ornProfile = NUBS(S0)(2)(makeKnots(ornPoints))(ornPoints);
var fake = [0,0,0];
var fakeProfile = NUBS(S0)(3)([0,0,0,1,1,1])([fake,fake]);
var ornSurface = BEZIER(S1)([fakeProfile,ornProfile]);
var ornPoints2 = PointUtils.traslaPunti(ornPoints,2,0.2);
var ornProfile2 = NUBS(S0)(2)(makeKnots(ornPoints2))(ornPoints2);
var latOrnSurface = BEZIER(S1)([ornProfile,ornProfile2]);
var ornament3 = [];
ornSurface = MAP(ornSurface)(domain2d);
ornament3.push(ornSurface);

latOrnSurface = MAP(latOrnSurface)(domain2d);
ornament3.push(latOrnSurface);
ornament3 = STRUCT(ornament3);
ornament3 = T([0,1,2])([4.25,1.8,0.08])(ornament3);
timpano.push(ornament3);
timpano = STRUCT(timpano);
timpano = COLOR(bColor)(timpano);
var statue1 = buildStatue();
var pedestal2 = T([0,1,2])([0.15,-0.35,-0.125])(SIMPLEX_GRID([[0.3],[0.3],[0.3]]));
pedestal2 = COLOR(bColor)(pedestal2);
var finalStatue1 = STRUCT([statue1,pedestal2]);
finalStatue1 = T([0,1,2])([0.2,1.6,0.8])(finalStatue1);

var statue2 = buildStatue();
var pedestal2 = T([0,1,2])([0.15,-0.35,-0.125])(SIMPLEX_GRID([[0.3],[0.3],[0.3]]));
pedestal2 = COLOR(bColor)(pedestal2);
var finalStatue2 = STRUCT([statue2,pedestal2]);
finalStatue2 = R([0,2])([PI])(finalStatue2);
finalStatue2 = T([0,1,2])([8.3,1.6,0.8])(finalStatue2);

var statue3 = T([0,1,2])([-0.05,0.05,0.2])(buildStatue2());
var pedestal1 = COLOR(bColor)(SIMPLEX_GRID([[0.4],[0.1],[0.4]]));
var pedestal2 = T([0,1,2])([0.05,-0.3,0.05])(SIMPLEX_GRID([[0.3],[0.3],[0.3]]));
pedestal2 = COLOR(bColor)(pedestal2);
var finalStatue3 = STRUCT([statue3,pedestal2,pedestal1]);
finalStatue3 = R([0,2])([PI])(finalStatue3);
finalStatue3 = T([0,1,2])([4.475,3.6,0.8])(finalStatue3);

timpano = STRUCT([timpano,tetto,finalStatue1,finalStatue2,finalStatue3,profBasRelief]);
timpano = T([0,1,2])([-0.06,7.465,3.35])(timpano);
return timpano;
}

var buildCorniceDown = function(){
var zBaseTimpano = 3.55;
var corniceDown = [];
var pointsNS = [[0.2,0,0],[0.2,0.15,0],[0.15,0.2,0],[0.15,0.3,0],[0.2,0.4,0],[0.15,0.45,0],[0.15,0.55,0],[0.2,0.65,0],[0.1,0.72,0],[0.05,0.75,0],[0.05,0.85,0],[0.1,0.88,0],[0.2,0.9,0],[0.15,0.95,0],[0.15,1.05,0],[0.2,1.1,0],[0.2,1.51,0]];
pointsNS = PointUtils.scalaPuntiY(pointsNS,0.5);
var pointsCornicione1 = PointUtils.ruotaPunti(pointsNS,-PI/4,1);
var knots = makeKnots(pointsNS);
var pointsCornicioneLeft1 = PointUtils.ruotaPunti(pointsCornicione1,-PI/2,1);
pointsCornicione1 = PointUtils.traslaPunti(pointsCornicione1,2,zBaseTimpano-0.15);
pointsCornicione1 = PointUtils.traslaPunti(pointsCornicione1,0,0.1);
var pointsCornicione2 = PointUtils.traslaPunti(pointsCornicione1,0,-3.805);
var profileCornicione1 = NUBS(S0)(2)(knots)(pointsCornicione1);
var profileCornicione2 = NUBS(S0)(2)(knots)(pointsCornicione2);
var cornicione = BEZIER(S1)([profileCornicione1,profileCornicione2]);
cornicione = MAP(cornicione)(domain2d);
corniceDown.push(cornicione);
//cornicione left
pointsCornicioneLeft1 = PointUtils.traslaPunti(pointsCornicioneLeft1,2,zBaseTimpano-0.15);
pointsCornicioneLeft1 = PointUtils.traslaPunti(pointsCornicioneLeft1,0,xBaseTimpano-0.1);
var pointsCornicioneLeft2 = PointUtils.traslaPunti(pointsCornicioneLeft1,0,3.81);
var profileCornicioneLeft1 = NUBS(S0)(2)(knots)(pointsCornicioneLeft1);
var profileCornicioneLeft2 = NUBS(S0)(2)(knots)(pointsCornicioneLeft2);
var cornicioneLeft = BEZIER(S1)([profileCornicioneLeft1,profileCornicioneLeft2]);
cornicioneLeft = MAP(cornicioneLeft)(domain2d);
corniceDown.push(cornicioneLeft);
corniceDown = STRUCT(corniceDown);
corniceDown = T([0,1,2])([-0.06+ 3.6,7.465 ,3.35])(corniceDown);;
return corniceDown;
}

var buildCornice = function(){
var zBaseTimpano = 3.55;
var cornice = [];
var points = [[0.4,0,0],
				[0.25,0,0],[0.22,0.02,0],[0.2,0.05,0],
				[0.18,0.07,0],[0.1,0.1,0],[0.05,0.15,0],
				[0.1,0.2,0],[0.25,0.2,0],[0.4,0.2,0]];
var pointsLeft = PointUtils.ruotaPunti(points,-PI/2 - PI/4,1);
points = PointUtils.ruotaPunti(points,-PI/4,1);
points = PointUtils.traslaPunti(points,2,zBaseTimpano);
var points2 = PointUtils.traslaPunti(points,0,-3.85);
var knots = makeKnots(points);
var profile = NUBS(S0)(2)(knots)(points);
var profile2 = NUBS(S0)(2)(knots)(points2);
var corniceRight = BEZIER(S1)([profile,profile2]);
corniceRight = MAP(corniceRight)(domain2d);
cornice.push(corniceRight);

//cornice left
pointsLeft = PointUtils.traslaPunti(pointsLeft,2,zBaseTimpano);
pointsLeft = PointUtils.traslaPunti(pointsLeft,0,xBaseTimpano-0.2);
var points2 = PointUtils.traslaPunti(pointsLeft,0,4.06);
var profileLeft1 = NUBS(S0)(2)(knots)(pointsLeft);
var profileLeft2 = NUBS(S0)(2)(knots)(points2);
var corniceLeft = BEZIER(S1)([profileLeft1,profileLeft2]);
corniceLeft = MAP(corniceLeft)(domain2d);
cornice.push(corniceLeft);
cornice = STRUCT(cornice);
cornice = T([0,1,2])([-0.06,8.3,3.05])(cornice);
return cornice;
}

var buildCorniceUp = function(){
var zBaseTimpano = 3.55;

var pointsNR = [[0.4,0,0],[0.25,0,0],[0.22,0.02,0],
				[0.2,0.05,0],[0.18,0.07,0],[0.1,0.1,0],[
				0.05,0.15,0],[0.1,0.2,0]];
var points = PointUtils.ruotaPunti(pointsNR,-PI/4,1);
var points2 = PointUtils.ruotaPunti(points,-PI/2,1);

points = PointUtils.traslaPunti(points,2,zBaseTimpano);
points = PointUtils.traslaPunti(points,0,-3.85);
points2 = PointUtils.traslaPunti(points2,0,xBaseTimpano-0.2+4.06);
points2 = PointUtils.traslaPunti(points2,2,zBaseTimpano);
var knots = makeKnots(points);
var profile = NUBS(S0)(2)(knots)(points);
var profile2 = NUBS(S0)(2)(knots)(points2);
var corniceUp = BEZIER(S1)([profile,profile2]);
corniceUp = MAP(corniceUp)(domain2d);
corniceUp = T([0,1,2])([-0.06,10.3,3.05])(corniceUp);
return corniceUp;
}

var buildFacade = function(){
var xBaseTimpano = 8.52;
var facade = [];
exports.steps = buildSteps();
facade.push(steps);
exports.tunnel = buildTunnel();
facade.push(tunnel);
exports.colonnade = buildcolonnade();
facade.push(colonnade);
exports.lateralArchway = buildLateralArchway();
facade.push(lateralArchway);
exports.timpano = buildTimpano();
facade.push(timpano);
facade = STRUCT(facade);
return facade;}

var buildWinOrnament = function(){
var frame = [];
var xBaseTimpano = 8.52;
var zBaseTimpano = 3.55;
var xBaseTriangle = xBaseTimpano+0.2;
var hTriangle = 2.5;
var hypotenuse = SQRT((hTriangle*hTriangle) + (xBaseTriangle/2*xBaseTriangle/2));
var alpha = Math.asin(hTriangle/hypotenuse)+PI/4.8;
var pointsNR = [[0,0,0.3],[0,0,0.1],[0,0.05,0.05],
				[0,0.1,0.1],[0,0.15,0.05],[0,0.2,0.1],
				[0,0.2,0.3]];

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
var points = [[0,0.1,0.4],[0,0.1,0.1],[0,0.1,0.05],[0,0.15,0.1],
				[0,0.2,0.1],[0,0.25,0.05],[0,0.3,0.1],[0,0.35,0],
				[0,0.4,0.05],[0,0.4,0.1],[0,0.4,0.4]];
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
var ornament = [];
var h = 2.5;
var z = 1;
var x = 0.5;

var points = [[x,0,0],[x,0.5/11*h,-1/3*z],
	[x,0.7/11*h,-0.5/3*z],[x,1.5/11*h,-1.5/3*z],[x,2.5/11*h,-0.5/3*z],
	[x,4/11*h,-1/3*z],[x,6/11*h,-2/3*z],[x,8.5/11*h,-z],[x,10.5/11*h, -2/3*z],[x,h,0]];
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
var finalOrnament = STRUCT([ornament,ornament2,frame]);
return finalOrnament;
}

var buildBigWindow = function(){
var window1 = [];
var ornament = COLOR(bColor)(buildWinOrnament());
window1.push(ornament);
var depthOrnament = 0.3;
var translationOrnament2 = depthOrnament + xBaseTimpano - 1.6;
var h = 2.5;
var z = 1;
var x = 0.5;

var hFrame = 0.4;
var yFrame = 1;
var zFrame = 0.4;
var upperFrame = SIMPLEX_GRID([[-depthOrnament - 0.5,translationOrnament2 - depthOrnament],[hFrame],[-0.2,zFrame]]);
upperFrame = T([1])([-yFrame])(upperFrame);
upperFrame = COLOR(bColor)(upperFrame);
window1.push(upperFrame);

var hFrameLat = 10;
var yFrame = 1 + hFrame;
var xFrameLat = hFrame;
var frameLat = SIMPLEX_GRID([[-depthOrnament - 0.5,xFrameLat],[hFrameLat],[-0.2,zFrame]]);
frameLat = T([1])([-yFrame - hFrameLat + 0.4])(frameLat);
frameLat = COLOR(bColor)(frameLat);

var frameLat2 = T([0])([translationOrnament2 - 2*depthOrnament - 0.1])(frameLat);
frameLat2 = COLOR(bColor)(frameLat2);
window1.push(frameLat);
window1.push(frameLat2);

var lowerFrame = SIMPLEX_GRID([[-depthOrnament - 0.5 + 0.1,translationOrnament2 - depthOrnament + 0.2],[hFrame],[-0.2,zFrame + 0.1]]);
lowerFrame = T([1,2])([-yFrame - hFrameLat + 0.4 - hFrame,-zFrame])(lowerFrame);
lowerFrame = COLOR(bColor)(lowerFrame);
window1.push(lowerFrame);

var lowerOrnament = SIMPLEX_GRID([[-depthOrnament - 0.5,translationOrnament2 - depthOrnament],[7 * hFrame + 1],[-0.2,zFrame+0.1]]);
lowerOrnament = T([1])([-yFrame - hFrameLat - 8*hFrame - 0.5])(lowerOrnament);
lowerOrnament = COLOR(bColor)(lowerOrnament);
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
upperOrnament = COLOR(bColor)(upperOrnament);
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

var buildSmallWindow = function(h,w,s){
var frames = [];	
var smallWindow = [];
var lateralFrames = SIMPLEX_GRID([[s,-w + 2*s,s],[h],[0.1]]);
frames.push(lateralFrames);
var horizFrames = SIMPLEX_GRID([[-s,w - 2*s],[s,-h+2*s,s],[0.1]]);
frames.push(horizFrames);
var middleFrame = SIMPLEX_GRID([[-w/2+s/2,s],[-s,h-s],[0.1]]);
frames.push(middleFrame);
frames = COLOR([0,0,0])(STRUCT(frames));
smallWindow.push(frames);
var glasses = COLOR([147/255,204/255,234/255,0.7])(SIMPLEX_GRID([[-s,w/2-3/2*s,-s,w/2-3/2*s],[-s,h-2*s],[-0.04,0.01]]));
smallWindow.push(glasses);
smallWindow = STRUCT(smallWindow);
return smallWindow;
}

var buildMediumWindow = function(h,w,s){
var frames = [];	
var middleWindow = [];
var grid = [];
var xGrid = s;
var hGrid1 = h - 2*s;
var wGrid = w/2 - 3/2*s;
var lateralFrames = SIMPLEX_GRID([[s,-w + 2*s,s],[h],[0.1]]);
frames.push(lateralFrames);
var horizFrames = SIMPLEX_GRID([[-s,w - 2*s],[s,-h+2*s,s],[0.1]]);
frames.push(horizFrames);
var middleFrame = SIMPLEX_GRID([[-w/2+s/2,s],[-s,h-s],[0.1]]);
frames.push(middleFrame);
frames = COLOR([0,0,0])(STRUCT(frames));
middleWindow.push(frames);
var glasses = COLOR([147/255,204/255,234/255,0.7])(SIMPLEX_GRID([[-s,w/2-3/2*s,-s,w/2-3/2*s],[-s,h-2*s],[-0.04,0.01]]));
middleWindow.push(glasses);

//grid
var hGrid = hGrid1 - 1/6*hGrid1;
var pointL1 = [s,s+1/6*hGrid1,0.5*s];
var pointL2 = [s,s+1/6*hGrid1+ 1/3*hGrid,0];
var pointL3 = [s,s+1/6*hGrid1+ 2/3*hGrid,0];
var pointL4 = [s,s+1/6*hGrid1+ 3/3*hGrid,0];
var pointR1 = [s+wGrid,s+0/3*hGrid,0];
var pointR2 = [s+wGrid,s+1/3*hGrid,0];
var pointR3 = [s+wGrid,s+2/3*hGrid,0];
var pointR4 = [s+wGrid,s+3/3*hGrid,0];
var pointM1 = [s+1/3*wGrid,s+0,0];
var pointM2 = [s+2/3*wGrid,s+hGrid1,0];

var line1 = POLYLINE([pointL1,pointR3]);
var line2 = POLYLINE([pointL2,pointR4]);
var line4 = POLYLINE([pointL3,pointM2]);
var line5 = POLYLINE([pointL1,pointM1]);
var line6 = POLYLINE([pointL2,pointR1]);
var line7 = POLYLINE([pointL3,pointR2]);
var line8 = POLYLINE([pointL4,pointR3]);
var line10 = POLYLINE([pointM2,pointR4]);
var line11 = POLYLINE([pointR2,pointM1]);
var grid = STRUCT([line1,line2,line4,line5,line6,
			line7,line8,line10,line11]);
var grid2 = R([0,2])([PI])(grid);
grid2 = T([0])([s*3 + 2*wGrid])(grid2);
middleWindow.push(grid);
middleWindow.push(grid2);
middleWindow = STRUCT(middleWindow);
return middleWindow;
}

var buildGrate = function(h,w,s){
var grid = [];
var grate = R([0,2])([PI/2])(CYL_SURFACE([0.01,w])(20));
var grate1 = T([1])([1/4*h])(grate);
grid.push(grate1);
var grate2 = T([1])([2/4*h])(grate);
grid.push(grate2);
var grate3 = T([1])([3/4*h])(grate);
grid.push(grate3);
var grate = R([1,2])([-PI/2])(CYL_SURFACE([0.01,h])(20));
var grate4 = T([0])([1/4*w])(grate);
grid.push(grate4);
var grate5 = T([0])([2/4*w])(grate);
grid.push(grate5);
var grate6 = T([0])([3/4*w])(grate);
grid.push(grate6);
var hole = COLOR([0,0,0])(SIMPLEX_GRID([[w],[h],[0.01]]));
grid.push(hole);
grid = STRUCT(grid);
return grid;
}


var buildDoor = function(h,w,s){
var frames = [];	
var door = []
var grid = [];
var lateralFrames = SIMPLEX_GRID([[s,-w + 2*s,s],[h],[0.1]]);
frames.push(lateralFrames);
var horizFrames = SIMPLEX_GRID([[-s,w - 2*s],[s,-h+2*s,s],[0.1]]);
frames.push(horizFrames);
var middleFrame = SIMPLEX_GRID([[-w/2+s/2,s],[-s,h-s],[0.1]]);
frames.push(middleFrame);
var hMiddleFrame = SIMPLEX_GRID([[-s, w/2 - 3/2*s],[-s - 1/3*(h-2*s) + s/2,s],[0.1]]);
frames.push(hMiddleFrame);
var hMiddleFrame2 = T([1])([1/3*(h-2*s)])(hMiddleFrame);
frames.push(hMiddleFrame2);
var hMiddleFrame3 = T([0])([s + (w/2 - 3/2*s)])(hMiddleFrame);
frames.push(hMiddleFrame3);
var hMiddleFrame4 = T([0])([s + (w/2 - 3/2*s)])(hMiddleFrame2);
frames.push(hMiddleFrame4);
frames = COLOR([0,0,0])(STRUCT(frames));
door.push(frames);
var glasses = COLOR([147/255,204/255,234/255,0.7])(SIMPLEX_GRID([[-s,w/2-3/2*s,-s,w/2-3/2*s],[-s,h-2*s],[-0.04,0.01]]));
door.push(glasses);

//grid
var hGrid = h - 2*s;
var wGrid = w/2 - 3/2*s;
var line1 = POLYLINE([[s+1/3*wGrid,s,0],[s+1/3*wGrid,s+hGrid,0]]);
grid.push(line1);
var line2 = POLYLINE([[s+2/3*wGrid,s,0],[s+2/3*wGrid,s+hGrid,0]]);
grid.push(line2);
var line3 = POLYLINE([[s,s+1/6*hGrid,0],[2*s + wGrid*2, s +1/6*hGrid,0]]);
grid.push(line3);
var line4 = POLYLINE([[s,s+3/6*hGrid,0],[2*s + wGrid*2, s +3/6*hGrid,0]]);
grid.push(line4);
var line5 = POLYLINE([[s,s+5/6*hGrid,0],[2*s + wGrid*2, s +5/6*hGrid,0]]);
grid.push(line5);
var line6 = POLYLINE([[2*s + wGrid +1/3*wGrid,s,0],[2*s+ wGrid +1/3*wGrid,s+hGrid,0]]);
grid.push(line6);
var line7 = POLYLINE([[2*s + wGrid +2/3*wGrid,s,0],[2*s+ wGrid +2/3*wGrid,s+hGrid,0]]);
grid.push(line7);
grid = STRUCT(grid);
door.push(grid);

//ornament
var ornament = COLOR(bColor)(buildWinOrnament());
ornament = S([0,1,2])([0.25,0.25,0.25])(ornament);
ornament = T([0,1,2])([-0.265,h+0.03,-0.1])(ornament);
door.push(ornament);
door = STRUCT(door);
return door;
}

var buildWall = function(){
var walls = [];
var windows = [];
var depthWall = 1;
var xWall = 30;
var xWin = 0.8;
var yGrate = 0.9*xWin;
var yWin = 2.25;
var hWall = 11;
var wall = [];
var xNow=0
var wall1 = SIMPLEX_GRID([[depthWall],[hWall],[-6.9,0.01]]);
var wall3 = SIMPLEX_GRID([[-depthWall,0.01],[hWall],[-6.9,depthWall]]);
var wall2 = SIMPLEX_GRID([[-depthWall-0.01,xWin],[2/17*hWall,-yGrate, 2.65/17*hWall, -yWin  + 0.45,4/17*hWall + 1.02, -1.5*yGrate,1.19/17*hWall],[-6.9,depthWall]]);
var smallWindow1 = buildSmallWindow(1.5*yGrate,xWin,0.05);
smallWindow1 = T([0,1,2])([depthWall+0.01,2/17*hWall+yGrate+2.65/17*hWall+yWin + 0.05+4/17*hWall + 0.52,6.9])(smallWindow1);
windows.push(smallWindow1);

var grate1 = buildGrate(yGrate,xWin,depthWall);
grate1 = T([0,1,2])([depthWall+0.01,2/17*hWall,7])(grate1)
windows.push(grate1);
xNow = depthWall+0.01 + xWin;
wall.push(wall1);
wall.push(wall2);
wall.push(wall3);
var wall4 = SIMPLEX_GRID([[-depthWall - 0.01 - xWin, 2.6*depthWall],[hWall],[-6.9,depthWall]]);
xNow+= 2.6*depthWall;
wall.push(wall4);
xWin2 = xWin - 0.1;
var wall5 = SIMPLEX_GRID([[-depthWall - xWin - 0.01 - 2.6*depthWall, xWin2],[2/17*hWall,yGrate, 2.7/17*hWall, -2/3*yWin,2/17*hWall + 1/3*yWin, -yGrate,2.25/17*hWall, -yGrate,1.24/17*hWall],[-6.9,depthWall]]);
var smallWindow3 = buildSmallWindow(yGrate,xWin2,0.05);
smallWindow3 = T([0,1,2])([depthWall + xWin + 0.01 + 2.6*depthWall, 2/17*hWall + yGrate + 2.7/17*hWall + 2/3*yWin + 2/17*hWall + 1/3*yWin + yGrate + 2.25/17*hWall,6.9])(smallWindow3);
var smallWindow5 = buildSmallWindow(yGrate,xWin2,0.05);
smallWindow5 = T([0,1,2])([depthWall + xWin + 0.01 + 2.6*depthWall,2/17*hWall + yGrate + 2.7/17*hWall + 2/3*yWin + 2/17*hWall + 1/3*yWin,6.9])(smallWindow5);
var middleWindow1 = buildMediumWindow(2/3*yWin,xWin2,0.05);
middleWindow1 = T([0,1,2])([depthWall + xWin + 0.01 + 2.6*depthWall,2/17*hWall+yGrate+2.7/17*hWall,6.9])(middleWindow1);
windows.push(middleWindow1);
windows.push(smallWindow3);
windows.push(smallWindow5);

xNow+= xWin2; 
wall.push(wall5);


var wall6 = SIMPLEX_GRID([[-xNow,xWin2],[hWall],[-6.9,depthWall]]);
xNow+=xWin2;
wall.push(wall6);
var wall7 = SIMPLEX_GRID([[-xNow , xWin2],[2/17*hWall,yGrate, 2.7/17*hWall, -2/3*yWin,2/17*hWall+ 1/3*yWin, -yGrate,2.5/17*hWall, +1.2*yGrate,0.76/17*hWall],[-6.9,depthWall]]);
var smallWindow6 = T([0])([2*xWin2])(smallWindow5);
windows.push(smallWindow6);
var middleWindow2 = buildMediumWindow(2/3*yWin,xWin2,0.05);
middleWindow2 = T([0,1,2])([xNow,2/17*hWall+yGrate+2.7/17*hWall,6.9])(middleWindow2);
windows.push(middleWindow2);

xNow+=xWin2;
wall.push(wall7);
var wall8 = SIMPLEX_GRID([[-xNow,0.5],[hWall],[-6.9,depthWall]]);
xNow+=0.5;
wall.push(wall8);
var largPorta = 1.6;
var wall9 = SIMPLEX_GRID([[-xNow,largPorta],[3,-yWin*1.5, (hWall-3 - yWin*1.5)],[-6.9,depthWall]]);
wall.push(wall9);
var door = buildDoor(1.5*yWin,largPorta,0.15);
door = T([0,1,2])([xNow,3,6.9])(door);
windows.push(door);
xNow+=largPorta;
var wall10 = SIMPLEX_GRID([[-xNow,0.5],[hWall],[-6.9,depthWall]]);
wall.push(wall10);
xNow+=0.5;
var wall11 = SIMPLEX_GRID([[-xNow , xWin2],[2/17*hWall,yGrate, 2.7/17*hWall, -2/3*yWin,2/17*hWall+ 1/3*yWin, -yGrate,2.5/17*hWall, +1.2*yGrate,0.76/17*hWall],[-6.9,depthWall]]);
var smallWindow7 = buildSmallWindow(yGrate,xWin2,0.05);
smallWindow7 = T([0,1,2])([xNow,2/17*hWall+yGrate + 2.7/17*hWall + 2/3*yWin + 2/17*hWall+ 1/3*yWin,6.9])(smallWindow7);
windows.push(smallWindow7);
var middleWindow3 = buildMediumWindow(2/3*yWin,xWin2,0.05);
middleWindow3 = T([0,1,2])([xNow,2/17*hWall+yGrate+2.7/17*hWall,6.9])(middleWindow3);
windows.push(middleWindow3);

wall.push(wall11);
xNow+=xWin2;
var wall12 = SIMPLEX_GRID([[-xNow,xWin2],[hWall],[-6.9,depthWall]]);
wall.push(wall12);
xNow+=xWin2;
var wall13 = SIMPLEX_GRID([[-xNow, xWin2],[2/17*hWall,yGrate, 2.7/17*hWall, -2/3*yWin,2/17*hWall + 1/3*yWin, -yGrate,2.25/17*hWall, -yGrate,1.24/17*hWall],[-6.9,depthWall]]);
wall.push(wall13);
var smallWindow4 = T([0])([xNow - (depthWall + xWin + 0.01 + 2.6*depthWall)])(smallWindow3);
var smallWindow8 = T([0])([2*xWin2])(smallWindow7);
windows.push(smallWindow8);
windows.push(smallWindow4);
var middleWindow4 = buildMediumWindow(2/3*yWin,xWin2,0.05);
middleWindow4 = T([0,1,2])([xNow,2/17*hWall+yGrate+2.7/17*hWall,6.9])(middleWindow4);
windows.push(middleWindow4);
xNow+=xWin2;
var wall14 = SIMPLEX_GRID([[-xNow, 2.6*depthWall],[hWall],[-6.9,depthWall]]);
xNow+=2.6*depthWall;
wall.push(wall14);
var wall14 = SIMPLEX_GRID([[-xNow,xWin],[2/17*hWall,-yGrate, 2.65/17*hWall, -yWin  + 0.45,4/17*hWall + 1.02, -1.5*yGrate,1.19/17*hWall],[-6.9,depthWall]]);
var smallWindow2 = T([0])([xNow - depthWall - 0.01])(smallWindow1);
windows.push(smallWindow2);
var grate2 = buildGrate(yGrate,xWin,depthWall);
grate2 = T([0,1,2])([xNow,2/17*hWall,7])(grate2)
windows.push(grate2);
xtranslationWin = xNow;
xNow+= xWin;
var wall15 = SIMPLEX_GRID([[-xNow,0.01],[hWall],[-6.9,depthWall]]);
xNow+= 0.01;
var wall16 = SIMPLEX_GRID([[-xNow,depthWall],[hWall],[-6.9,0.01]]);
wall.push(wall14);
wall.push(wall15);
wall.push(wall16);
wallX = xNow+depthWall;
var decwall1 = T([0])([-0.01])(SIMPLEX_GRID([[xWin + 3*depthWall],[-3,0.4],[-6.89,0.01]]));

wall.push(decwall1);
var decwall2 = T([0])([-0.01])(SIMPLEX_GRID([[xWin + 3*depthWall],[-2.7,0.3],[-6.86,0.04]]));
wall.push(decwall2);
var decwall3 = T([0])([11.84])(decwall1);
wall.push(decwall3);
var decwall4 = T([0])([11.87])(decwall2);
wall.push(decwall4);

var depth1 = SIMPLEX_GRID([[xWin + 3*depthWall],[0.6],[-6.8,0.1]]);
wall.push(depth1);
var depth2 = SIMPLEX_GRID([[xWin + 3*depthWall],[-0.6,0.4],[-6.85,0.05]]);
wall.push(depth2);
var depth3 = T([0])([11.82])(SIMPLEX_GRID([[xWin + 3*depthWall + 0.1],[0.6],[-6.8,0.1]]));
wall.push(depth3);
var depth4 = T([0])([11.82])(SIMPLEX_GRID([[xWin + 3*depthWall + 0.05],[-0.6, 0.4],[-6.85,0.05]]));
wall.push(depth4);

var window1 = buildBigWindow();
var swindow1X = xWin/6.2;
var swindow1Y = 0.18;
var swindow1Z = 0.3;
window1 = S([0,1,2])([swindow1X,swindow1Y,swindow1Z])(window1);
window1 = T([0,1,2])([0.85,2/17*hWall+yGrate + 2/17*hWall + yWin + 0.15,6.8])(window1);
windows.push(window1);

var window2 = T([0])([xtranslationWin - xWin - 0.2])(window1);
windows.push(window2);
var corniceDown = buildCorniceDown();
wall.push(corniceDown);
var cornice = T([0])([depthWall + 2/20*xWall - 0.4])(buildCornice());
wall.push(cornice);
var corniceUp = T([0,1])([depthWall + 2/20*xWall - 0.4,0.67])(buildCorniceUp());
wall.push(corniceUp);
wall = STRUCT(wall);
wall = COLOR(bColor)(wall);
windows = STRUCT(windows);
var wallFinal = STRUCT([wall,windows]);
wallFinal = T([0])([-depthWall - 2/20*xWall + 0.4])(wallFinal);
return wallFinal;
}

var buildWalls = function(){
var depthWall = 1;
var xWall = 30;
var walls = [];
var wall = buildWall();
walls.push(wall);
var wallLeft = R([0,2])([-PI/2])(wall);
wallLeft = T([0,2])([3.8*2 +xBaseTimpano + 2.8,3.8+xBaseTimpano/2 + 2.44])(wallLeft);
walls.push(wallLeft);
var wallRight = R([0,2])([PI/2])(wall);
wallRight = T([0,2])([-xBaseTimpano-1.98,3.8+xBaseTimpano/2 + 10.86 ])(wallRight);
walls.push(wallRight);
var wallBehind = R([0,2])([PI])(wall);
wallBehind = T([0,2])([xBaseTimpano - 0.1,(3.8+xBaseTimpano/2 + 2.45)*2 + 8.4])(wallBehind);
walls.push(wallBehind);
var floor = SIMPLEX_GRID([[wallX],[0.01],[-6.9,wallX]]);
floor = T([0,1])([-depthWall - 2/20*xWall + 0.4,-0.01])(floor);
walls.push(floor);
walls = STRUCT(walls);
return walls;
}

var buildFacades = function(){
var facades = [];
var facade = buildFacade();
facades.push(facade);
var facadeLeft =R([0,2])([-PI/2])(facade);
facadeLeft = T([0,2])([3.8*2 +xBaseTimpano + 2.8,3.8+xBaseTimpano/2 + 2.44])(facadeLeft);
facades.push(facadeLeft);
var facadeRight = R([0,2])([PI/2])(facade);
facadeRight = T([0,2])([-xBaseTimpano-1.98,3.8+xBaseTimpano/2 + 10.86 ])(facadeRight);
facades.push(facadeRight);
var facadeBehind = R([0,2])([PI])(facade);
facadeBehind = T([0,2])([xBaseTimpano - 0.1,(3.8+xBaseTimpano/2 + 2.45)*2 + 8.4])(facadeBehind);
facades.push(facadeBehind);
facades = STRUCT(facades);
return facades;
}

var buildRoof = function(){
var domainR = DOMAIN([[0,1],[0,2*PI]])([10,80]);
var lRoof = 16.03;
var hRoof = 4;
var bRoofPoints = [[0,0,0],[0,0,0],[lRoof,0,0],[lRoof,0,0],[lRoof,0,lRoof],[lRoof,0,lRoof],[0,0,lRoof],[0,0,lRoof],[0,0,0],[0,0,0]];
var bRoofProf = NUBS(S0)(1)([0,0,1,2,3,4,5,6,7,10,11,11])(bRoofPoints);
var upRoof = NUBS(S0)(1)([0,0,1,1])([[lRoof/2,hRoof,lRoof/2],[lRoof/2,hRoof,lRoof/2]]);
var roof = BEZIER(S1)([bRoofProf,upRoof]);
var roof = MAP(roof)(domain2d);

//dome
var hDome = 6;
var wDome = 6;
var point1 = [11.5/12*wDome,0,0/15*hDome];
var point2 = [11.5/12*wDome,0,2/15*hDome];
var point3 = [12/12*wDome,0,2/15*hDome];
var point4 = [12/12*wDome,0,2.8/15*hDome];
var point5 = [12.2/12*wDome,0,3/15*hDome];
var point6 = [9/12*wDome,0,4.5/15*hDome];
var point7 = [9/12*wDome,0,4.8/15*hDome];
var point8 = [9.2/12*wDome,0,5/15*hDome];
var point9 = [7/12*wDome,0,6.5/15*hDome];
var point10 = [7/12*wDome,0,6.8/15*hDome];
var point11 = [7.2/12*wDome,0,7/15*hDome];
var point12 = [5/12*wDome,0,8.5/15*hDome];
var point13 = [5/12*wDome,0,8.8/15*hDome];
var point14 = [5.2/12*wDome,0,9/15*hDome];
var point15 = [3/12*wDome,0,10.5/15*hDome];
var point16 = [3/12*wDome,0,10.8/15*hDome];
var point17 = [3.2/12*wDome,0,11/15*hDome];
var pointS = [1.5/12*wDome,0,12/15*hDome];
var point18 = [1/12*wDome,0,12.8/15*hDome];
var point19 = [1/12*wDome,0,13.4/15*hDome];
var point20 = [1.2/12*wDome,0,13.6/15*hDome];
var point21 = [0/12*wDome,0,14.4/15*hDome];

var cRed = [];
var noCRed = [];
var prof1 = NUBS(S0)(1)([0,0,1,2,3,4,4])([point1,point2,point3,point4,point5]);
var sur1 = ROTATIONAL_SURFACE(prof1);
sur1 = MAP(sur1)(domainR);
noCRed.push(sur1);
var prof2 = NUBS(S0)(1)([0,0,1,1])([point5,point6]);
var sur2 = ROTATIONAL_SURFACE(prof2);
sur2 = MAP(sur2)(domainR);
cRed.push(sur2);
var prof3 = NUBS(S0)(1)([0,0,1,2,2])([point6,point7,point8]);
var sur3 = ROTATIONAL_SURFACE(prof3);
sur3 = MAP(sur3)(domainR);
noCRed.push(sur3);
var prof4 = NUBS(S0)(1)([0,0,1,1])([point8,point9]);
var sur4 = ROTATIONAL_SURFACE(prof4);
sur4 = MAP(sur4)(domainR);
cRed.push(sur4);
var prof5 = NUBS(S0)(1)([0,0,1,2,2])([point9,point10,point11]);
var sur5 = ROTATIONAL_SURFACE(prof5);
sur5 = MAP(sur5)(domainR);
noCRed.push(sur5);
var prof6 = NUBS(S0)(1)([0,0,1,1])([point11,point12]);
var sur6 = ROTATIONAL_SURFACE(prof6);
sur6 = MAP(sur6)(domainR);
cRed.push(sur6);
var prof7 = NUBS(S0)(1)([0,0,1,2,2])([point12,point13,point14]);
var sur7 = ROTATIONAL_SURFACE(prof7);
sur7 = MAP(sur7)(domainR);
noCRed.push(sur7);
var prof8 = NUBS(S0)(1)([0,0,1,1])([point14,point15]);
var sur8 = ROTATIONAL_SURFACE(prof8);
sur8 = MAP(sur8)(domainR);
cRed.push(sur8);
var prof9 = NUBS(S0)(1)([0,0,1,2,2])([point15,point16,point17]);
var sur9 = ROTATIONAL_SURFACE(prof9);
sur9 = MAP(sur9)(domainR);
noCRed.push(sur9);
var prof10 = NUBS(S0)(2)([0,0,0,1,1,1])([point17,pointS,point18]);
var sur10 = ROTATIONAL_SURFACE(prof10);
sur10 = MAP(sur10)(domainR);
cRed.push(sur10);
var prof11 = NUBS(S0)(1)([0,0,1,2,2])([point18,point19,point20]);
var sur11 = ROTATIONAL_SURFACE(prof11);
sur11 = MAP(sur11)(domainR);
noCRed.push(sur11);
var prof12 = NUBS(S0)(1)([0,0,1,1])([point20,point21]);
var sur12 = ROTATIONAL_SURFACE(prof12);
sur12 = MAP(sur12)(domainR);
cRed.push(sur12);

noCRed = COLOR(bColor)(STRUCT(noCRed));
cRed = COLOR([205/255,92/255,92/255])(STRUCT(cRed));
var dome = STRUCT([noCRed,cRed]);
dome = R([1,2])([-PI/2])(dome);
dome = T([0,1,2])([lRoof/2,hRoof - 2.8,lRoof/2])(dome);
roof = COLOR([205/255,92/255,92/255])(roof);
dome = STRUCT([roof,dome]);
dome = T([0,1,2])([-3.8,11.182,6.7])(dome);
return dome;
}

var buildGrass = function(){
var grassColor = [0/255, 153/255, 0/255];
var streetColor = [1,1,1];
var lGrass = 50;

var lStreet = 7;
var grass = SIMPLEX_GRID([[(lGrass-lStreet)/2, -lStreet,(lGrass-lStreet)/2],[0.01],[(lGrass-lStreet)/2, -lStreet,(lGrass-lStreet)/2]]);
grass = COLOR(grassColor)(grass);
var street = SIMPLEX_GRID([[-(lGrass-lStreet)/2, lStreet],[0.01],[lGrass]]);
var street1 = SIMPLEX_GRID([[(lGrass-lStreet)/2, -lStreet,(lGrass-lStreet)/2],[0.01],[-(lGrass-lStreet)/2,lStreet]]);
street = COLOR(streetColor)(street);
street1 = COLOR(streetColor)(street1);
var grass = STRUCT([grass,street,street1]);
grass = T([0,1,2])([-lGrass/4 - 8.3,-0.02,-lStreet - 3.3])(grass);
return grass;
}

var ville = [];
var facades = buildFacades();
ville.push(facades);
var walls = buildWalls();
ville.push(walls);
var roof = buildRoof();
ville.push(roof);
var grass = buildGrass();
ville.push(grass);
ville = STRUCT(ville);
exports.ville = ville;
}(this);

DRAW(ville);
