//env var
require('dotenv').config()

//express
const express = require('express');
const app = express()
const process = require('process');
const port = process.env.PORT || 3000;

//controllers
const {shorten } = require('./public/controllers/shorten.js');
const {redirect} = require('./public/controllers/redirect.js');
const {tracker} = require('./public/controllers/tracker.js');

const path = require('path');
const bodyParser = require('body-parser');

//mongoose
const mongoose = require("mongoose");
mongoose.connect(process.env.URLSHORTENERDBLINK, {useNewUrlParser:true});
mongoose.Promise = global.Promise;
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get('/track', function(req, res) {
	res.render("track");
});

app.get('/', function(req, res) {
	// res.sendFile(path.join(__dirname, 'views/index.html'));
	res.render("index", {
		shortUrl : null
	});
});

app.get('/:shortUrl', redirect);

app.post('/shorten', shorten);

app.post('/track', tracker);

app.listen(port, () => console.log('Example app listening on port ' + port + '!'))