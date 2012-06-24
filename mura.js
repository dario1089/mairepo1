var buildFinestra = function(){
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

var cornice = [];
var finestra = [];
var xBaseTimpano = 8.52;
var zBaseTimpano = 3.55;
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

var zLaterale = zBaseTimpano - 0.3;
var tettoPunto1 = points[points.length-1];
var tettoPunto2 = points2[points2.length-1];
var tettoPunto3 = [tettoPunto2[0],tettoPunto2[1],tettoPunto2[2]+zLaterale];
var tetto2Punto1 = points3[points3.length-1];




//chiusura laterale1
var fakePoint = [points[0],points[0], points[points.length-1]];
var fakePointNubs = NUBS(S0)(2)([0,0,0,1,1,1])(fakePoint);
var cLaterale1 = BEZIER(S1)([fakePointNubs,profile]);
cLaterale1 = MAP(cLaterale1)(domain2d);
cornice.push(cLaterale1);
//chiusura laterale2
var fakePoint = [points3[0],points3[0], points3[points.length-1]];
var fakePointNubs = NUBS(S0)(2)([0,0,0,1,1,1])(fakePoint);
var cLaterale2 = BEZIER(S1)([fakePointNubs,profile3]);
cLaterale2 = MAP(cLaterale2)(domain2d);
cornice.push(cLaterale2);
cornice = STRUCT(cornice);
cornice = T([0,1,2])([-0.13,0.75,-0.1])(cornice);
finestra.push(cornice);

//profilo
var fregio = [];
var h = 2.5;
var z = 1;
var x = 0.5;

var points = [[x,0,0],[x,0.5/11*h,-1/3*z],[x,0.7/11*h,-0.5/3*z],[x,1.5/11*h,-1.5/3*z],[x,2.5/11*h,-0.5/3*z],[x,4/11*h,-1/3*z],[x,6/11*h,-2/3*z],[x,8.5/11*h,-z],[x,10.5/11*h, -2/3*z],[x,h,0]];
var knots = makeKnots(points);
var profile = NUBS(S0)(2)(knots)(points);

var spessoreFregio = 0.3;
var fregioFinestra = CYLINDRICAL_SURFACE(profile)([spessoreFregio,0,0]);
fregioFinestra = MAP(fregioFinestra)(domain2d);
fregio.push(fregioFinestra);
var pointsRiempimento = [points[0],points[0],points[points.length-1]];
var profileRiempimento = NUBS(S0)(2)([0,0,0,1,1,1])(pointsRiempimento);
var riempimento1 = BEZIER(S1)([profileRiempimento,profile]);
riempimento1 = MAP(riempimento1)(domain2d);
var riempimento2 = T([0])([spessoreFregio])(riempimento1);
fregio.push(riempimento1);
fregio.push(riempimento2);
fregio = STRUCT(fregio);
fregio = T([1,2])([-1.75,0.3])(fregio);

var traslazioneFregio2 = spessoreFregio + xBaseTimpano - 1.6;
var fregio2 = T([0])([traslazioneFregio2])(fregio);
finestra.push(fregio);
finestra.push(fregio2);

var hFrame = 0.4;
var yFrame = 1;
var zFrame = 0.4;
var frameSuperiore = SIMPLEX_GRID([[-spessoreFregio - 0.5,traslazioneFregio2 - spessoreFregio],[hFrame],[-0.2,zFrame]]);
frameSuperiore = T([1])([-yFrame])(frameSuperiore);
finestra.push(frameSuperiore);

//decorazione inferiore
var hFrameLat = 10;
var yFrame = 1 + hFrame;
var xFrameLat = hFrame;
var frameLaterale = SIMPLEX_GRID([[-spessoreFregio - 0.5,xFrameLat],[hFrameLat],[-0.2,zFrame]]);
frameLaterale = T([1])([-yFrame - hFrameLat + 0.4])(frameLaterale);
var frameLaterale2 = T([0])([traslazioneFregio2 - 2*spessoreFregio - 0.1])(frameLaterale);
finestra.push(frameLaterale);
finestra.push(frameLaterale2);

var frameInferiore = SIMPLEX_GRID([[-spessoreFregio - 0.5 + 0.1,traslazioneFregio2 - spessoreFregio + 0.2],[hFrame],[-0.2,zFrame + 0.1]]);
frameInferiore = T([1,2])([-yFrame - hFrameLat + 0.4 - hFrame,-zFrame])(frameInferiore);
finestra.push(frameInferiore);

var decorazioneInferiore = SIMPLEX_GRID([[-spessoreFregio - 0.5,traslazioneFregio2 - spessoreFregio],[10 * hFrame + 0.3],[-0.2,zFrame+0.1]]);
decorazioneInferiore = T([1])([-yFrame - hFrameLat + 0.4 - 9*hFrame - 0.3])(decorazioneInferiore);
finestra.push(decorazioneInferiore);

//decorazione superiore
var spessoreDecorazioneSup = 6.9;
var hDec = 1.47;
var points = [[x,0,0],[x,2/5*hDec,-0.3],[x,3.5/5*hDec,-0.15],[x,4.2/5*hDec,-0.25],[x,hDec,-0.15]];
var knots = makeKnots(points);
var profileDec = NUBS(S0)(2)(knots)(points);
var decorazioneSuperiore = CYLINDRICAL_SURFACE(profileDec)([spessoreDecorazioneSup,0,0]);
decorazioneSuperiore = MAP(decorazioneSuperiore)(domain2d);
decorazioneSuperiore = T([0,1,2])([spessoreFregio,-0.7,0.2])(decorazioneSuperiore);
finestra.push(decorazioneSuperiore);

//finestra
var win = [];
var profWin = 4.5;
var zFin = profWin/2;
var xWin = 0.4;
var spesFin = 0.1;
var framesLatWin = SIMPLEX_GRID([[-spessoreFregio - 0.5 - xFrameLat, xWin],[hFrameLat],[-0.2 - zFin,spesFin]]);
framesLatWin = T([0,1])([0,-yFrame - hFrameLat + 0.4])(framesLatWin);
win.push(framesLatWin);
var framesLatWin2 = T([0])([traslazioneFregio2 - 2*spessoreFregio - 0.1 - 2*xWin])(framesLatWin);
win.push(framesLatWin2);

var frameSuperioreWin = SIMPLEX_GRID([[-spessoreFregio - 0.5 - xFrameLat - xWin, traslazioneFregio2 - 2*spessoreFregio - 3*xWin - 0.1],[xWin],[-0.2 - zFin,spesFin]]);
frameSuperioreWin = T([1])([-yFrame])(frameSuperioreWin);
win.push(frameSuperioreWin);
var frameMedioWin = T([1])([-1/3*hFrameLat])(frameSuperioreWin);
win.push(frameMedioWin);
var frameInfWin = T([1])([-hFrameLat + xWin])(frameSuperioreWin);
win.push(frameInfWin);
var frameMedVert = SIMPLEX_GRID([[- xFrameLat - traslazioneFregio2/2, xWin],[2/3*hFrameLat - 2*xWin],[-0.2 - zFin,spesFin]]);
frameMedVert = T([1])([-hFrameLat - yFrame + 2*xWin])(frameMedVert);
win.push(frameMedVert);
win = STRUCT(win);
win = COLOR([0,0,0])(win);
finestra.push(win);

//glasses
var glasses = [];
var supGlass = SIMPLEX_GRID([[-spessoreFregio - 0.5 - xFrameLat - xWin, traslazioneFregio2 - 2*spessoreFregio - 3*xWin - 0.1],[1/3*hFrameLat - xWin],[-0.2 - zFin,spesFin]]);
supGlass = T([1])([-yFrame - 1/3*hFrameLat + xWin])(supGlass);
glasses.push(supGlass);

var infGlass1 = SIMPLEX_GRID([[-spessoreFregio - 0.5 - xFrameLat - xWin, (traslazioneFregio2 - 2*spessoreFregio - 3*xWin)/2 - xWin + 0.2],[2/3*hFrameLat - 2*xWin],[-0.2 - zFin,spesFin]]);
infGlass1 = T([1])([-yFrame + 2*xWin - hFrameLat])(infGlass1);
glasses.push(infGlass1);
var infGlass2 = T([0])([(traslazioneFregio2 - 2*spessoreFregio - 3*xWin)/2 + 0.1])(infGlass1);
glasses.push(infGlass2);

glasses = STRUCT(glasses);
glasses = COLOR([147/255,204/255,234/255,0.7])(glasses);
finestra.push(glasses);
finestra = STRUCT(finestra);

return finestra;
}

var spesMuro = 1;
var xMura = 30;
var xWin = 0.8;
var yGrata = 0.9*xWin;
var yWin = 2.25;
var hMuro = 11.5;
var sFinestra
var muro = [];
var muro1 = SIMPLEX_GRID([[spesMuro],[hMuro],[-6.9,0.01]]);
var muro3 = SIMPLEX_GRID([[-spesMuro,0.01],[hMuro],[-6.9,spesMuro]]);
var muro2 = SIMPLEX_GRID([[-spesMuro-0.01,xWin],[2/17*hMuro,-yGrata, 2.65/17*hMuro, -yWin + 0.05,4.6/17*hMuro + yGrata, -1.2*yGrata,1.1/17*hMuro],[-6.9,spesMuro]]);
muro.push(muro1);
muro.push(muro2);
muro.push(muro3);
var muro4 = SIMPLEX_GRID([[-spesMuro - 0.01 - xWin, 2.6*spesMuro],[hMuro],[-6.9,spesMuro]]);
muro.push(muro4);
var muro5 = SIMPLEX_GRID([[-spesMuro - xWin - 0.01 - 2.6*spesMuro, xWin],[2/17*hMuro,yGrata, 2.7/17*hMuro, -yWin,2/17*hMuro, -yGrata,2.5/17*hMuro, -1.2*yGrata,1.05/17*hMuro],[-6.9,spesMuro]]);
muro.push(muro5);
var decMuro1 = SIMPLEX_GRID([[spesMuro + xWin + 2*spesMuro],[-3,0.4],[-6.89,0.01]]);
muro.push(decMuro1);
var decMuro2 = SIMPLEX_GRID([[spesMuro + xWin + 2*spesMuro],[-2.7,0.3],[-6.86,0.04]]);
muro.push(decMuro2);


var finestra1 = buildFinestra();
var sFinestraX = xWin/6.2;
var sFinestraY = 0.22;
var sFinestraZ = 0.3;
finestra1 = S([0,1,2])([sFinestraX,sFinestraY,sFinestraZ])(finestra1);
finestra1 = T([0,1,2])([0.85,2/17*hMuro+yGrata + 2/17*hMuro + yWin + 0.2 + 0.4,6.8])(finestra1);
muro.push(finestra1);
muro = STRUCT(muro);
muro = T([0])([-spesMuro - 2/20*xMura + 0.4])(muro);
DRAW(muro);