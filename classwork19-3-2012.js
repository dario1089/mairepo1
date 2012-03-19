var apply = function(array){
	var fun = array[0];
	var arg = array[1];

	return fun(arg);
}