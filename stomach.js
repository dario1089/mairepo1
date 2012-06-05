var drawMap = function(m){
	var domain = INTERVALS(1)(20);
	var curve = MAP(m)(domain);
	DRAW(curve);
}

var generateKnots = function(points){
var tot = points.length + 3;
console.log(tot)
var ret = [0,0,0];
for (var i = 1; i <= tot-6; i++) {
	ret.push(i);
};
ret.push(i);
ret.push(i);
ret.push(i);
return ret;
}

var curves = [];
//first curve

var points = [[0.5,0,0],[0.5,0.5,0],[-0.5,0.5,0],[-0.5,-0.5,0],[0.5,-0.5,0],[0.5,0,0]];
var knots = [0,0,0,1,2,3,4,4,4];
var c = NUBS(S0)(2)(knots)(points);
curves.push(c);
//second curve 
var step = 0.5;
var stepy = 0.4;
var stepz = 0.5

var points = points.map(
	function(p){
		var point = [];
		if(p[0] > 0)
			point[0] = p[0]+step;
		else point[0] = p[0]-step;

		if(p[1] > 0)
			point[1] = p[1]+stepy;
		else if(p[1] < 0) point[1] = p[1]-stepy;
		else if(p[1] === 0) point[1] = p[1];

		point[2] = p[2] + stepz;
		return point;
});

var knots = [0,0,0,1,2,3,4,4,4];
var c = NUBS(S0)(2)(knots)(points);
curves.push(c);

//third curve
var step = 0.5;
var stepy = 0.4;
var stepz = 0.5

var points = points.map(
	function(p){
		return [p[0],p[1],p[2]+stepz];
});

var knots = [0,0,0,1,2,3,4,4,4];
var c = NUBS(S0)(2)(knots)(points);
curves.push(c);

//fourth curve
var step = 0.5;
var stepy = 0.3;
var stepz = 0.5

var points = points.map(
	function(p){
		if(p[1] !== 0)
		return [p[0],p[1]-stepy,p[2]+stepz];
		else return [p[0],p[1],p[2]+stepz];
});

var knots = [0,0,0,1,2,3,4,4,4];
var c = NUBS(S0)(2)(knots)(points);
curves.push(c);

//fifth curve
var step = 0.5;
var stepy = 0.2;
var stepz = 0.3

var points = points.map(
	function(p){
		var point = [];
		if(p[1] > 0) point[1] = p[1];
		else if (p[1] < 0) point[1] = p[1] - stepy;
		else point[1] = p[1];

		point[0] = p[0];

		if(p[1] > 0) point[2] = p[2] + stepz;
		else if (p[1] < 0) point[2] = p[2] + stepz*3;
		else if(p[1] == 0) point[2] = p[2] + 1.7*stepz;
		return point;
});

var knots = [0,0,0,1,2,3,4,4,4];
var c = NUBS(S0)(2)(knots)(points);
curves.push(c);

//sixth curve
var step = 0.5;
var stepy1 = 0.5;
var stepy2 = 0.3;
var stepz1 = 0.3;
var stepz2 = 1.5;

var points = points.map(
	function(p){
		var point = [];
		if(p[1] > 0) point[1] = p[1] + stepy1;
		else if (p[1] < 0) point[1] = p[1] + stepy2;
		else point[1] = p[1];

		point[0] = p[0];

		if(p[1] > 0) point[2] = p[2] + stepz1;
		else if (p[1] < 0) point[2] = p[2] + stepz2;
		else if(p[1] == 0) point[2] = p[2] + (stepz1 + stepz2)/2;
		return point;
});

var knots = [0,0,0,1,2,3,4,4,4];
var c = NUBS(S0)(2)(knots)(points);
curves.push(c);

//seventh curve
var step = 0.5;
var stepy1 = 1.5;
var stepy2 = 2.5;
var stepz1 = 0.3;
var stepz2 = 2.5;

var points = points.map(
	function(p){
		var point = [];
		if(p[1] > 0) point[2] = p[2] + stepz1;
		else if (p[1] < 0) point[2] = p[2] + stepz2;
		else if(p[1] == 0) point[2] = p[2] + (stepz1 + stepz2)/2;

		if(p[1] > 0) point[1] = p[1] + stepy1;
		else if (p[1] < 0) point[1] = p[1] + stepy2;
		else point[1] = p[1] + (stepz1 + stepz2)/1.4;

		point[0] = p[0];
		return point;
});

var knots = [0,0,0,1,2,3,4,4,4];
var c = NUBS(S0)(2)(knots)(points);
curves.push(c);

//curve eight
var step = 0.5;
var stepy1 = 0.7;
var stepy2 = 0.5;
var stepz1 = 0.2;
var stepz2 = 0.2;
var zm = (points[2][2] + points[3][2])/2;

var points = points.map(
	function(p){
		var point = [];

		if(p[2] >= zm) point[2] = p[2] + stepz1;
		else if (p[2] < zm) point[2] = p[2] - stepz2;

		if(p[2] >= zm) point[1] = p[1] + stepy1;
		else if (p[2] < zm) point[1] = p[1] + stepy2;

		point[0] = p[0];
		return point;
});

var knots = [0,0,0,1,2,3,4,4,4];
var c = NUBS(S0)(2)(knots)(points);
curves.push(c);

//curve nine

var step = 0.5;
var stepy1 = 1.3;
var stepy2 = 0.3;
var stepz1 = 0.2;
var stepz2 = 0.05;

var zm = (points[2][2] + points[3][2])/2;

var points = points.map(
	function(p){
		var point = [];

		if(p[2] > zm) point[2] = p[2] + stepz1;
		else if (p[2] < zm) point[2] = p[2] - stepz2;

		if(p[2] > zm) point[1] = p[1] + stepy1;
		else if (p[2] < zm) point[1] = p[1] + stepy2;

		point[0] = p[0];
		return point;
});

var knots = [0,0,0,1,2,3,4,4,4];
var c = NUBS(S0)(2)(knots)(points);
curves.push(c);

//curve 10
var step = 0.5;
var stepy1 = 1.5;
var stepy2 = 0.7;
var stepz1 = 0.2;
var stepz2 = 0.05;

var zm = (points[2][2] + points[3][2])/2;

var points = points.map(
	function(p){
		var point = [];

		if(p[2] > zm) point[2] = p[2];
		else if (p[2] < zm) point[2] = p[2];

		if(p[2] > zm) point[1] = p[1] + stepy1;
		else if (p[2] < zm) point[1] = p[1] + stepy2;

		point[0] = p[0];
		return point;
});

var knots = [0,0,0,1,2,3,4,4,4];
var c = NUBS(S0)(2)(knots)(points);
curves.push(c);

//curve 11
var step = 0.5;
var stepy1 = 1.5;
var stepy2 = 0.7;
var stepz1 = 1.3;
var stepz2 = 1.3;

var zm = (points[2][2] + points[3][2])/2;

var points = points.map(
	function(p){
		var point = [];

		if(p[2] > zm) point[2] = p[2] - stepz1;
		else if (p[2] < zm) point[2] = p[2];

		if(p[2] > zm) point[1] = p[1] + stepy1;
		else if (p[2] < zm) point[1] = p[1] + stepy2;

		point[0] = p[0];
		return point;
});

var knots = [0,0,0,1,2,3,4,4,4];
var c = NUBS(S0)(2)(knots)(points);
curves.push(c);

//curve 12
var step = 0.5;
var stepy1 = 0.3;
var stepy2 = 0.3;
var stepz1 = 1;
var stepz2 = 1.3;

var zm = (points[2][2] + points[3][2])/2;

var points = points.map(
	function(p){
		var point = [];

		if(p[2] > zm) point[2] = p[2] - stepz1;
		else if (p[2] < zm) point[2] = p[2];

		if(p[2] > zm) point[1] = p[1] + stepy1;
		else if (p[2] < zm) point[1] = p[1] + stepy2;

		point[0] = p[0];
		return point;
});

var knots = [0,0,0,1,2,3,4,4,4];
var c = NUBS(S0)(2)(knots)(points);
curves.push(c);

//curve13
var step = 0.5;
var stepy1 = 0.4;
var stepy2 = 0.3;
var stepz1 = 1.5;
var stepz2 = 1.3;

var zm = (points[2][2] + points[3][2])/2;

var points = points.map(
	function(p){
		var point = [];

		if(p[2] > zm) point[2] = p[2] - stepz1;
		else if (p[2] < zm) point[2] = p[2];

		if(p[2] > zm) point[1] = p[1] - stepy1;
		else if (p[2] < zm) point[1] = p[1] + stepy2;

		point[0] = p[0];
		return point;
});
points[0][1] = points[0][1] + 0.5;

points[0][2] = points[0][2] - 0.5;
points[5] = points[0];
var knots = [0,0,0,1,2,3,4,4,4];
var c = NUBS(S0)(2)(knots)(points);
curves.push(c);


var domain = DOMAIN([[0,1],[0,1]])([40,60]);
var knots = generateKnots(curves);
var stom = NUBS(S1)(2)(knots)(curves);
var d = MAP(stom)(domain);
var t = COLOR([255/255, 192/255, 203/255])(d);
DRAW(t);


