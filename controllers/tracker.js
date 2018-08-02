const dbapi = require('../database/dbapi.js');
const path = require('path');

exports.tracker = function(req, res) {
	shortUrl = req.body.shortUrl;
	shortUrl = getHash(shortUrl);
	dbapi.validateHash(shortUrl, function callback(value) {
		if(value) {
			dbapi.showHit(shortUrl, function(hitCount) {
				console.log("hit:"+hitCount);
				res.send("Redirects:"+hitCount);
			});
		}
		else {
			res.sendFile(path.join(__dirname, "../", "views/error.html"));
		}
	});
}

getHash = function(input) {
	if(input.substring(0 , 8) === "https://")
		input = input.slice(8)
	if(input[input.length-1] === '/')
	    input = input.slice(0,-1);
	if(input.substring(0, 3) == 'www')
	    input = input.slice(4);
	return input;
}