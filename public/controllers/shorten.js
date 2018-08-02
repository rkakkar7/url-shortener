const hash = require('../helpers/hash.js').generateHash;
const dbapi = require('../database/dbapi.js');
const {sanitize} = require('../helpers/sanitize.js');
const {validate, validateCustomHash} = require('../helpers/validate.js');
const path = require('path');

const length = 6;

exports.shorten = function (req, res) {

	longUrl = req.body.longUrl;
	//validate long url
	if(validate(longUrl))
	{
		customHash = req.body.customHash;
		let shortUrl = "";
		//if custom hash exists
		if(customHash) {
			//if custom hash is valid
			if(validateCustomHash(customHash))
			{	//check if hash is already present in db or not
				dbapi.validateHash(customHash, function(value) {
					//hash present -- throw error
					if(value) {
						res.sendFile(path.join(__dirname, "../", "views/errorHash.html"));
						return;
					}
					//add custom hash to db
					else {
						shortUrl = customHash;
						//creation date
						created_at = new Date();
						//expiry date present or not
						if(req.body.expiryDate) {
							expire_at = expiryDate;
						}
						//if no expiry date given - expire in 1 hr
						else {
							expire_at = created_at;
							expire_at.setHours(expire_at.getHours() + 1);
						}

						dbapi.createShortUrl(shortUrl, longUrl, created_at, expire_at, 1);
						res.render("index", {
							shortUrl: shortUrl
						});
					}
			})
			}
			else {
				res.sendFile(path.join(__dirname, "../", "views/errorHash.html"));
			}
		}

		else {
			//sanitization of url
			longUrl = sanitize(longUrl);

			//collision handling
			let index = 0;
			do {
				shortUrl = hash(longUrl, 0 + index, 5 + index);
				index += length;
				flag = false;
				dbapi.validateHash(shortUrl, function(value) {
					flag = value;
				});
			}while(flag && index <= 24);
			//creation date
			created_at = new Date();
			//expiry date present or not
			if(req.body.expiryDate) {
				expire_at = expiryDate;
			}
			//if no expiry date given - expire in 1 hr
			else {
				expire_at = created_at;
				expire_at.setHours(expire_at.getHours() + 1);
			}

			dbapi.createShortUrl(shortUrl, longUrl, created_at, expire_at, 0);
			res.send("shortUrl: "+shortUrl);
		}
		
	}
	else {
		res.send("WRONG URL");
	}
}
