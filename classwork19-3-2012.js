var apply = function(array){
	var fun = array[0];
	var arg = array[1];

	return fun(arg);
}

var aa = function(fun){
	return function(array){
		var ret;
		ret = array.map(fun);
		return ret;
	}
}

var comp2 = function(funArray){
	return function(arg){
		var f = funArray[0];
		var g = funArray[1];
		return f((g)(arg));
	}
}