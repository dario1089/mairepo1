//tetraedro
var drawTetraedro = function(r, color) {
  r = r || 1;
  color = color || [0,0,1];

  var lSpigolo = r*SQRT(8/3);
  var primoVertice = [0,0,r];
  var vAltezza = [0,0,r * (-1) * (1/3)];

  var baseUno = [vAltezza[0], vAltezza[1] + (lSpigolo/SQRT(3)), vAltezza[2]];
  var baseDue = [vAltezza[0] + (lSpigolo/2), vAltezza[1] - (lSpigolo/(2*SQRT(3))), vAltezza[2]];
  var baseTre = [vAltezza[0] - (lSpigolo/2), vAltezza[1] - (lSpigolo/(2*SQRT(3))), vAltezza[2]];


  var modelTetraedro = SIMPLICIALCOMPLEX([primoVertice,baseUno,baseDue,baseTre])([[0,1,2,3]]);
  DRAW(modelTetraedro);
  COLOR(color)(modelTetraedro);

  return modelTetraedro;
};

//Ottaedro

var drawOttaedro = function(r, color){
	r = r || 1;
	color = color || [0, 1, 1];

	var l = r * SQRT(2) / 2;
	var v1 = [l, l, 0];
	var v2 = [l, - l, 0];
	var v3 = [- l, l, 0];
	var v4 = [- l, - l, 0];
	var north = [0, 0, r];
	var south = [0, 0, - r];
	var faces = [[0, 5, 3], [0, 3, 2], [0, 2, 4], [0, 4, 5], [1, 3, 5], [1, 2, 3], [1, 4, 5], [1, 5, 4]];
	var otta = SIMPLICIALCOMPLEX([north, south, v1, v2, v3, v4])(faces);
	COLOR(color)(otta);
	DRAW(otta);
	return otta;
}

//icosaedro

var drawIcosaedro = function(r, color){
	r = r || 1/2;
	color = color || [1, 0, 0];
	var center = [0, 0, 0];
	var vNord = [0, 0, r];
	var vSud = [0, 0, -r];
	var zLv1 = 2 * r * (SQRT(5)/5) / 2;
	var zLv2 = - 2 * r * (SQRT(5)/5) / 2;

	//vertex first level
	var v1 = [0, (SQRT(5)/5) * 2 * r, zLv1];
	var v2 = [(SQRT(5)/5) * 2 * r * SIN(0.4 * PI), (SQRT(5)/5) * 2 * r * COS(0.4 * PI), zLv1];
	var v3 = [-v2[0], v2[1], zLv1];
	var v4 = [-(SQRT(5)/5) * 2 * r * SIN(0.2 * PI), -(SQRT(5)/5) * 2 * r * COS(0.2 * PI), zLv1];
	var v5 = [-v4[0], v4[1], zLv1];

	//vertex second level
	var s1 = [0, -v1[1], zLv2];
	var s2 = [v2[0], -v2[1], zLv2];
	var s3 = [v3[0], -v3[1], zLv2];
	var s4 = [v4[0], -v4[1], zLv2];
	var s5 = [v5[0], -v5[1], zLv2];

	var ico = SIMPLICIALCOMPLEX([vNord, v1, v2, v3, v4, v5, s1, s2, s3, s4, s5, vSud])([[0,2,1],[0,1,3],[0,3,4],[0,4,5],[0,5,2],[11,7,6],[11,10,7],[11,9,10],[11,8,9],[11,6,8],[2,10,1],[7,10,2],[5,7,2],[6,7,5],[4,6,5],[8,6,4],[8,4,3],[8,3,9],[9,3,1],[1,10,9]]);
	COLOR(color)(ico);
	DRAW(ico);
	return ico;
}

//DODECAEDRO

var drawDodecaedro = function(r, color){
	r = r || 1;
	color = color || [1,1,0];

	var latoCubo = r * SQRT(2);
	var zTopLevel = latoCubo / 2;
	
	//toplevel cube vertex
	var p1 = [latoCubo/2, latoCubo/2, zTopLevel];
	var p2 = [latoCubo/2, - latoCubo/2, zTopLevel];
	var p3 = [ - latoCubo/2, latoCubo/2, zTopLevel];
	var p4 = [ - latoCubo/2, - latoCubo/2, zTopLevel]; 

	var zBottomLevel = - latoCubo / 2;

	//bottomlevel cube vertex
	var s1 = [latoCubo/2, latoCubo/2, zBottomLevel];
	var s2 = [latoCubo/2, - latoCubo/2, zBottomLevel];
	var s3 = [ - latoCubo/2, latoCubo/2, zBottomLevel];
	var s4 = [ - latoCubo/2, - latoCubo/2, zBottomLevel]; 

	var spigolo = (r * SQRT(3) * (SQRT(5) - 1)) / 3;
	var aureus = 1.6180339887498948482045868343656;
	var b = (latoCubo / 2) / aureus;;
	//vertex on face NORTH
	var zNorth = b + (latoCubo / 2);
	var v1North = [0, spigolo / 2, zNorth];
	var v2North = [0, - spigolo / 2, zNorth];

	//vertex on face SOUTH
	var zSouth = - zNorth;
	var v1South = [0, v1North[1], zSouth];
	var v2South = [0, v2North[1], zSouth];

	//vertex on face EAST
	var xEast = - zNorth;
	var v1East = [xEast, 0, spigolo / 2];
	var v2East = [xEast, 0, - spigolo / 2];

	//vertex on face West
	var xWest = - xEast;
	var v1West = [xWest, 0, spigolo / 2];
	var v2West = [xWest, 0, - spigolo / 2];

	//vertex on face FRONT
	var yFront = - zNorth;
	var v1Front = [ - spigolo / 2, yFront, 0];
	var v2Front = [ spigolo / 2, yFront, 0];

	//vertex on face BEHIND
	var yBehind = - yFront;
	var v1Behind = [ - spigolo / 2, yBehind, 0];
	var v2Behind = [ spigolo / 2, yBehind, 0];

	var faces = [[0, 8, 9, 1, 14], [8, 2, 12, 3, 9], [1, 9, 3, 16, 17], [8, 0, 19, 18, 2], [16, 7, 11, 5, 17], [5, 11, 10, 4, 15], [18, 19, 4, 10, 6], [7, 13, 6, 10, 11], [12, 13, 7, 16, 3], [1, 17, 5, 15, 14], [13, 12, 2, 18, 6], [14, 15, 4, 19, 0]];
	var dodecahedron = SIMPLICIALCOMPLEX([p1, p2, p3, p4, s1, s2, s3, s4, v1North, v2North, v1South, v2South, v1East, v2East, v1West, v2West, v1Front, v2Front, v1Behind, v2Behind])(faces);
	COLOR(color)(dodecahedron);
	DRAW(dodecahedron);
	return dodecahedron;
}

var drawDodecaedro = function(r, color){
	r = r || 1;
	color = color || [1,1,0];

	var latoCubo = r * SQRT(2);
	var zTopLevel = latoCubo / 2;
	
	//toplevel cube vertex
	var p1 = [latoCubo/2, - latoCubo/2, zTopLevel];
	var p2 = [latoCubo/2, latoCubo/2, zTopLevel];
	var p3 = [ - latoCubo/2, - latoCubo/2, zTopLevel];
	var p4 = [ - latoCubo/2, latoCubo/2, zTopLevel]; 

	var zBottomLevel = - latoCubo / 2;

	//bottomlevel cube vertex
	var s1 = [latoCubo/2, - latoCubo/2, zBottomLevel];
	var s2 = [latoCubo/2, latoCubo/2, zBottomLevel];
	var s3 = [ - latoCubo/2, - latoCubo/2, zBottomLevel];
	var s4 = [ - latoCubo/2, latoCubo/2, zBottomLevel]; 

	var spigolo = (r * SQRT(3) * (SQRT(5) - 1)) / 3;
	var aureus = 1.6180339887498948482045868343656;
	var b = (latoCubo / 2) / aureus;;
	//vertex on face NORTH
	var zNorth = b + (latoCubo / 2);
	var v1North = [0, - spigolo / 2, zNorth];
	var v2North = [0, spigolo / 2, zNorth];

	//vertex on face SOUTH
	var zSouth = - zNorth;
	var v1South = [0, - v1North[1], zSouth];
	var v2South = [0, - v2North[1], zSouth];

	//vertex on face EAST
	var xEast = - zNorth;
	var v1East = [xEast, 0, - spigolo / 2];
	var v2East = [xEast, 0, spigolo / 2];

	//vertex on face West
	var xWest = - xEast;
	var v1West = [xWest, 0, - spigolo / 2];
	var v2West = [xWest, 0, spigolo / 2];

	//vertex on face FRONT
	var yFront = - zNorth;
	var v1Front = [ - spigolo / 2, - yFront, 0];
	var v2Front = [ spigolo / 2, - yFront, 0];

	//vertex on face BEHIND
	var yBehind = yFront;
	var v1Behind = [ - spigolo / 2, yBehind, 0];
	var v2Behind = [ spigolo / 2, yBehind, 0];

	var faces = [[0, 8, 9, 1, 14], [8, 2, 12, 3, 9], [1, 9, 3, 16, 17], [8, 0, 19, 18, 2], [16, 7, 11, 5, 17], [5, 11, 10, 4, 15], [18, 19, 4, 10, 6], [7, 13, 6, 10, 11], [12, 13, 7, 16, 3], [1, 17, 5, 15, 14], [13, 12, 2, 18, 6], [14, 15, 4, 19, 0]];
	var dodecahedron = SIMPLICIALCOMPLEX([p1, p2, p3, p4, s1, s2, s3, s4, v1North, v2North, v1South, v2South, v1East, v2East, v1West, v2West, v1Front, v2Front, v1Behind, v2Behind])(faces);
	COLOR(color)(dodecahedron);
	DRAW(dodecahedron);
	return dodecahedron;
}