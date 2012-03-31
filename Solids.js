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