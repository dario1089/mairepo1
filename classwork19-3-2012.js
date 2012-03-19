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