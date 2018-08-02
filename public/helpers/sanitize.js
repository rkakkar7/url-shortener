exports.sanitize = function(input){
	//removing https:// and www. if present to keep url consistent
	if(input.substring(0 , 8) === "https://")
		input = input.slice(8)
	if(input[input.length-1] === '/')
	    input = input.slice(0,-1);
	if(input.substring(0, 3) == 'www')
	    input = input.slice(4);
	return input;
}