const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// URL Schema
var urlSchema = new Schema({
	_id: {type: String, required: true},
	long_url: String,
	created_at: Date,
	expire_at: Date,
	hits: Number
});
urlSchema.index( { "expire_at": 1 }, { expireAfterSeconds: 0 } );

var Model = mongoose.model('urlModel', urlSchema);

module.exports = Model;
