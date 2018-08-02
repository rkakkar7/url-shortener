const crypto = require('crypto');

exports.generateHash = function(longURL, startIndex, endIndex) {
		const hash = crypto.createHash('md5').update(longURL).digest('base64').replace(/\//g, '_').replace(/\+/g, '-');
		return hash.substring(startIndex, endIndex + 1);
};