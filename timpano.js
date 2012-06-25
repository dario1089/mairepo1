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


DRAW(timpano);
DRAW(timpanoLeft);
DRAW(timpanoRight);