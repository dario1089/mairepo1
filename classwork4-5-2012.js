 var domain = INTERVALS(1)(40);
var points = [[1,0,0],[0,1,0],[0,2,0],[-2,0,0]];
var cMap1 = CUBIC_HERMITE(S0)(points);
var c = COLOR([1,1,0])(MAP(cMap1)(domain));

//DRAW(c);

 var domain = INTERVALS(1)(40);
var points = [[2,0,0],[0,2,0],[0,3,0],[-3,0,0]];
var cMap2 = CUBIC_HERMITE(S0)(points);
var c2 = COLOR([0,1,1])(MAP(cMap2)(domain));

//DRAW(c2);

//DIAMO le curve in pasto ad una funzione di Bezier per ottenere una superficie

var domainB = INTERVALS([[0,1],[0,1]])([30,50])
var curves = [cMap1, cMap2];
var bMap = BEZIER(S1)(curves);
var s12 = MAP(bMap)(domainB);

DRAW(s12);