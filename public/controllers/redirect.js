const dbapi = require('../database/dbapi.js');
const path = require('path');

exports.redirect = function(req, res) {
	console.log("redirecting");
	shortUrl = req.params.shortUrl;
	dbapi.validateHash(shortUrl, function callback(value) {
		if(value)
		{
			dbapi.hashToUrl(shortUrl, function(longUrl) {
				console.log("longurl:"+longUrl);
				if(longUrl) {
					dbapi.increaseHit(shortUrl);
					res.status(302).redirect("https://www."+longUrl);
				}
			})
		}
		else {
			res.sendFile(path.join(__dirname, "../", "views/error.html"));
		}
	})
}