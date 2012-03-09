
var filtPosSum = function(array){
	var temp = array.filter(function(item,index,array){return item>0});
	return temp.reduce(function(prev,current){return prev+current});
}