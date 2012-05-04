var domain = INTERVALS(1)(40);
var points1 = [[1,0,0],[0,1,0],[0,2,0],[-2,0,0]];
var cMap1 = CUBIC_HERMITE(S0)(points1);
var c = COLOR([1,1,0])(MAP(cMap1)(domain));

//DRAW(c);

var points2 = [[2,0,0],[0,2,0],[0,3,0],[-3,0,0]];
var cMap2 = CUBIC_HERMITE(S0)(points2);
var c2 = COLOR([0,1,1])(MAP(cMap2)(domain));

//DRAW(c2);

//DIAMO le curve in pasto ad una funzione di Bezier per ottenere una superficie

var domainB = DOMAIN([[0,1],[0,1]])([30,50])
var curves = [cMap1, cMap2];
var bMap = BEZIER(S1)(curves);
var s12 = MAP(bMap)(domainB);

//DRAW(s12);

//FACCIAMO UNA SUPERFICIE tipo tunnel

var mapSur = CUBIC_HERMITE(S1)([cMap1, cMap2, [0,0,3],[0,0,-3]]);
var sur12 = MAP(mapSur)(domainB);

//DRAW(SKELETON(1)(sur12));

//prende array di punti e restituisce complesso simpliciale fatto solo con quei punti

var POLYPOINT = function(points){
	var list = [];
	points.forEach(function(v, i){list.push([i]);})
	return SIMPLICIAL_COMPLEX(points)(list);
}
 var p1 = POLYPOINT([[10,0,0],[0,5,0],[0,-3,0],[5,2,0],[10,0,0]]);
//DRAW(COLOR([1,0,0])(p1));
//superficie alare 

var p1 = [[10,0,0],[0,5,0],[0,-3,0],[5,2,0],[10,0,0]];
var alaBez = BEZIER(S0)(p1);
var cAla = MAP(alaBez)(domain);

//DRAW(cAla);

var p2 = p1.map(function(p){ return [p[0], p[1], p[2] + 10];});
var p3 = p2.map(function(p){ return [p[0], p[1], p[2] + 10];});
var p4 = p3.map(function(p){ return [p[0], p[1], p[2] + 10];});
var p5 = p4.map(function(p){ return [p[0], p[1], p[2] + 10];});

var cpt0 = BEZIER(S0)(p1);
var cpt1 = BEZIER(S0)(p2);
var cpt2 = BEZIER(S0)(p3);
var cpt3 = BEZIER(S0)(p4);
var cpt4 = BEZIER(S0)(p5);

var curva = STRUCT(CONS(AA(MAP)([cpt0, cpt1, cpt2, cpt3, cpt4]))(domainB));

//DRAW(curva);

var wing = BEZIER(S1)([cpt0,cpt1,cpt2,cpt3,cpt4]);
var wingImage = MAP(wing)(domainB);

//DRAW(wingImage);


//NUBS --> non uniform BSPLINE
// NUBS(S0)(2)(controlpoints)
// es. m=5, k=2 --> nodi=8 
//per interpolare nodo inziale e finale vanno ripetuti 3 volte 

var controls = [[0,0,0], [2,5,0],[7,3,0],[9,7,0],[12,2,0]];
var knots = [0,0,0,1,2,3,3,3];
var c1 = NUBS(S0)(2)(knots)(controls);
var curve1 = MAP(c1)(domain);
DRAW(curve1);

var controls2 = [[0,0,0], [2,5,3],[7,3,6],[9,7,-2],[12,2,-3]];
var knots2 = [0,0,0,1,2,3,3,3];
var c2 = NUBS(S0)(2)(knots2)(controls2);
var curve2 = MAP(c2)(domain);
DRAW(curve2);

var surface12 = BEZIER(S1)([c1, c2]);
var s12 = MAP(surface12)(domainB);
DRAW(s12);
