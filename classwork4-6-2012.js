
var stepH = 0.13;
var stepZ = 0.155;
//frontal
var stepsBorder = [];
var stepsBorder1 = SIMPLEX_GRID([[0.6, -4.8, 0.6],[0.6],[3.4]]);
stepsBorder.push(stepsBorder1);
var stepsBorder2 = SIMPLEX_GRID([[-0.05, 0.5,-0.05,-4.8,-0.05,0.5,-0.05],[-0.6, 0.4],[-0.05,3.35]]);
stepsBorder.push(stepsBorder2);
var stepsBorder3 = SIMPLEX_GRID([[-0.1, 0.4,-0.1,-4.8,-0.1,0.4,-0.1],[-1, 1.7],[-0.1,3.3]]);
stepsBorder.push(stepsBorder3);
var stepsBorder4 = SIMPLEX_GRID([[-0.05, 0.5,-0.05,-4.8,-0.05,0.5,-0.05],[-2.7,0.3],[-0.05,3.35]]);
stepsBorder.push(stepsBorder4);
stepsBorder = STRUCT(stepsBorder);
DRAW(stepsBorder);

//steps
var steps = [];
var steps1 = SIMPLEX_GRID([[-0.5, 5, -0.5],[0.13],[0.155]]);
var trans = T([1,2])([0.13, 0.155]);
var steps = STRUCT([steps1, trans, steps1,trans,steps1,trans, steps1,trans,steps1,trans, steps1,trans,steps1,trans, steps1,trans,steps1,trans, steps1,trans,steps1,trans, steps1,trans,steps1,trans, steps1,trans,steps1,trans,steps1,trans, steps1,trans,steps1,trans,steps1,trans, steps1,trans,steps1,trans,steps1]);
DRAW(steps);