var hColumn = 3;
var rColumn = 0.2;
var domain = DOMAIN([[0,1],[0,2*PI]])([80,60]);
var domain1d = INTERVALS(1)(20);
var points = [[rColumn, 0, 0],[rColumn*6.3/5,0,1/3*hColumn],[rColumn,0,hColumn]];
var pColumn = NUBS(S0)(2)([0,0,0,1,1,1])(points);
var mappingColumn = ROTATIONAL_SURFACE(pColumn);
var column = MAP(mappingColumn)(domain);
DRAW(column);