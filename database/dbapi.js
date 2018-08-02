
const Model = require('./schema.js');

exports.showHit = function(hash, callback) {
	Model.findById(hash, function(err, doc) {
		if(err) {
			console.log("Error:"+err);
			if(callback)
				callback(err);
		}
		if(callback && doc)
			callback(doc.hits);
	});
}

exports.hashToUrl = function(hash, callback) {
	Model.findById(hash, function(err, doc) {
		if(err) {
			console.log("Error:"+err);
			if(callback && doc)
				callback(err);
		}
		if(callback != null && doc != null)
			callback(doc.long_url.toString());
	});
}

exports.createShortUrl = function(hash, longUrl, createdDate, expiryDate, hitCount ) {
	var doc = new Model({ _id: hash, long_url : longUrl, createad_at : createdDate , expire_at : expiryDate , hits : hitCount});
	doc.save(function(err, doc) {
		if(err)
			return err;
		console.log(doc._id + ' has been saved');
	});
}

exports.validateHash = function(hash, callback) {
	Model.findById(hash, function(err, doc) {
		if(!err) {
			if(doc && callback) {
				console.log("no error and doc found");
				callback(true);
			}
			else if(callback) {
				console.log("doc not found");
				callback(false);
			}
		}
		else {
			console.log("Error");
			if(callback)
				callback(err);
		}
		
	});
}

exports.increaseHit = function(hash, callback) {
	Model.findOneAndUpdate({_id : hash}, {$inc : {hits: 1}}, function(err) {
		if(err) {
			console.log("Error"+err);
			if(callback != null)
				callback(err);
		}
	});
}
