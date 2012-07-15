var domain2d = DOMAIN([[0,1],[0,1]])([60,10]);

var makeKnots = function(points){
    var knots = [0,0,0];
    var tot = points.length;
    for(var i=1;i<=tot-3;i++)
    knots.push(i);
    knots.push(i);
    knots.push(i);
    knots.push(i);
return knots;}

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
DRAW(statue);