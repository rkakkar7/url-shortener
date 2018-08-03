const dbapi = require('../database/dbapi.js');
const path = require('path');

exports.redirect = function(req, res) {

	shortUrl = req.params.shortUrl;
	dbapi.validateHash(shortUrl, function callback(value) {
		if(value)
		{
			dbapi.hashToUrl(shortUrl, function(longUrl) {

				if(longUrl) {
					dbapi.increaseHit(shortUrl);
					res.status(302).redirect("https://"+longUrl);
				}
			})
		}
		else {
			res.sendFile(path.join(__dirname, "../../", "views/error.html"));
		}
	})
}