var domain = INTERVALS(1)(80);
var domain2d = DOMAIN([[0,1],[0,1]])([80,10]);
var domain3d = DOMAIN([[0,1],[0,1],[0,1]])([80,10,1]);

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
pointsCornicione1 = PointUtils.ruotaPunti(pointsCornicione1,0,1);
pointsCornicione1 = PointUtils.traslaPunti(pointsCornicione1,2,zBaseTimpano-0.15);
pointsCornicione1 = PointUtils.traslaPunti(pointsCornicione1,0,0.1);
var pointsCornicione2 = PointUtils.traslaPunti(pointsCornicione1,0,-3.8);
var profileCornicione1 = NUBS(S0)(2)(knots)(pointsCornicione1);
var profileCornicione2 = NUBS(S0)(2)(knots)(pointsCornicione2);
var cornicione = BEZIER(S1)([profileCornicione1,profileCornicione2]);
cornicione = MAP(cornicione)(domain2d);
timpano.push(cornicione);
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
var t = MAP(profiloLato1)(domain);
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
var t = MAP(profiloLato1)(domain);
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

DRAW(timpano);