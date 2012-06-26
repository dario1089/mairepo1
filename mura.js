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
var depthile = NUBS(S0)(2)(knots)(points);
var depthile2 = NUBS(S0)(2)(knots)(points2);
var lowerSide = BEZIER(S1)([depthile,depthile2]);

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
var depthile = NUBS(S0)(2)(knots)(points);
var depthile2 = NUBS(S0)(2)(knots)(points2);
var depthile3 = NUBS(S0)(2)(knots)(points3);
var upperSide1 = BEZIER(S1)([depthile,depthile2]);
var upperSide2 = BEZIER(S1)([depthile3,depthile2]);
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
var cLat1 = BEZIER(S1)([fakePointNubs,depthile]);
cLat1 = MAP(cLat1)(domain2d);
frame.push(cLat1);

//lateral closure 2
var fakePoint = [points3[0],points3[0], points3[points.length-1]];
var fakePointNubs = NUBS(S0)(2)([0,0,0,1,1,1])(fakePoint);
var cLat2 = BEZIER(S1)([fakePointNubs,depthile3]);
cLat2 = MAP(cLat2)(domain2d);
frame.push(cLat2);
frame = STRUCT(frame);
frame = T([0,1,2])([-0.13,0.75,-0.1])(frame);
window1.push(frame);

//depthile
var ornament = [];
var h = 2.5;
var z = 1;
var x = 0.5;

var points = [[x,0,0],[x,0.5/11*h,-1/3*z],[x,0.7/11*h,-0.5/3*z],[x,1.5/11*h,-1.5/3*z],[x,2.5/11*h,-0.5/3*z],[x,4/11*h,-1/3*z],[x,6/11*h,-2/3*z],[x,8.5/11*h,-z],[x,10.5/11*h, -2/3*z],[x,h,0]];
var knots = makeKnots(points);
var depthile = NUBS(S0)(2)(knots)(points);

var depthornament = 0.3;
var ornamentwindow1 = CYLINDRICAL_SURFACE(depthile)([depthornament,0,0]);
ornamentwindow1 = MAP(ornamentwindow1)(domain2d);
ornament.push(ornamentwindow1);
var pointsRiempimento = [points[0],points[0],points[points.length-1]];
var depthileRiempimento = NUBS(S0)(2)([0,0,0,1,1,1])(pointsRiempimento);
var riempimento1 = BEZIER(S1)([depthileRiempimento,depthile]);
riempimento1 = MAP(riempimento1)(domain2d);
var riempimento2 = T([0])([depthornament])(riempimento1);
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
var frameLat = SIMPLEX_GRID([[-depthornament - 0.5,xFrameLat],[hFrameLat],[-0.2,zFrame]]);
frameLat = T([1])([-yFrame - hFrameLat + 0.4])(frameLat);
var frameLat2 = T([0])([translationornament2 - 2*depthornament - 0.1])(frameLat);
window1.push(frameLat);
window1.push(frameLat2);

var lowerFrame = SIMPLEX_GRID([[-depthornament - 0.5 + 0.1,translationornament2 - depthornament + 0.2],[hFrame],[-0.2,zFrame + 0.1]]);
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
var depthileDec = NUBS(S0)(2)(knots)(points);
var upperOrnament = CYLINDRICAL_SURFACE(depthileDec)([depthUpperOrnament,0,0]);
upperOrnament = MAP(upperOrnament)(domain2d);
upperOrnament = T([0,1,2])([depthornament,-0.7,0.2])(upperOrnament);
window1.push(upperOrnament);

//window1
var win = [];
var depthWin = 4.5;
var zWin = depthWin/2;
var xWin = 0.4;
var depthWin = 0.1;
var framesLatWin = SIMPLEX_GRID([[-depthornament - 0.5 - xFrameLat, xWin],[hFrameLat],[-0.2 - zWin,depthWin]]);
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
var supGlass = SIMPLEX_GRID([[-depthornament - 0.5 - xFrameLat - xWin, translationornament2 - 2*depthOrnament - 3*xWin - 0.1],[1/3*hFrameLat - xWin],[-0.2 - zWin,depthWin]]);
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
var hWall = 11.5;
var swindow1
var wall = [];
var xNow=0
var wall1 = SIMPLEX_GRID([[depthWall],[hWall],[-6.9,0.01]]);
var wall3 = SIMPLEX_GRID([[-depthWall,0.01],[hWall],[-6.9,depthWall]]);
var wall2 = SIMPLEX_GRID([[-depthWall-0.01,xWin],[2/17*hWall,-yGrate, 2.65/17*hWall, -yWin + 0.05,4.6/17*hWall + yGrate, -1.2*yGrate,1.1/17*hWall],[-6.9,depthWall]]);
xNow = depthWall+0.01 + xWin;
wall.push(wall1);
wall.push(wall2);
wall.push(wall3);
var wall4 = SIMPLEX_GRID([[-depthWall - 0.01 - xWin, 2.6*depthWall],[hWall],[-6.9,depthWall]]);
xNow+= 2.6*depthWall;
wall.push(wall4);
xWin2 = xWin - 0.1;
var wall5 = SIMPLEX_GRID([[-depthWall - xWin - 0.01 - 2.6*depthWall, xWin2],[2/17*hWall,yGrate, 2.7/17*hWall, -2/3*yWin,2/17*hWall + 1/3*yWin, -yGrate,2.5/17*hWall, -1.2*yGrate,1.05/17*hWall],[-6.9,depthWall]]);
xNow+= xWin2; 
wall.push(wall5);


var wall6 = SIMPLEX_GRID([[-xNow,xWin2],[hWall],[-6.9,depthWall]]);
xNow+=xWin2;
wall.push(wall6);
var wall7 = SIMPLEX_GRID([[-xNow , xWin2],[2/17*hWall,yGrate, 2.7/17*hWall, -2/3*yWin,2/17*hWall+ 1/3*yWin, -yGrate,2.5/17*hWall, +1.2*yGrate,1.05/17*hWall],[-6.9,depthWall]]);
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
var wall11 = SIMPLEX_GRID([[-xNow , xWin2],[2/17*hWall,yGrate, 2.7/17*hWall, -2/3*yWin,2/17*hWall+ 1/3*yWin, -yGrate,2.5/17*hWall, +1.2*yGrate,1.05/17*hWall],[-6.9,depthWall]]);
wall.push(wall11);
xNow+=xWin2;
var wall12 = SIMPLEX_GRID([[-xNow,xWin2],[hWall],[-6.9,depthWall]]);
wall.push(wall12);
xNow+=xWin2;
var wall13 = SIMPLEX_GRID([[-xNow, xWin2],[2/17*hWall,yGrate, 2.7/17*hWall, -2/3*yWin,2/17*hWall + 1/3*yWin, -yGrate,2.5/17*hWall, -1.2*yGrate,1.05/17*hWall],[-6.9,depthWall]]);
wall.push(wall13);
xNow+=xWin2;
var wall14 = SIMPLEX_GRID([[-xNow, 2.6*depthWall],[hWall],[-6.9,depthWall]]);
xNow+=2.6*depthWall;
wall.push(wall14);
var wall14 = SIMPLEX_GRID([[-xNow,xWin],[2/17*hWall,-yGrate, 2.65/17*hWall, -yWin + 0.05,4.6/17*hWall + yGrate, -1.2*yGrate,1.1/17*hWall],[-6.9,depthWall]]);
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
var xBaseTimpano = 8.52;
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