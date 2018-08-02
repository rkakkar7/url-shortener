//express
const express = require('express');
const app = express()


//controllers
const {shorten , shortenCustom } = require('./controllers/shorten.js');
const {redirect} = require('./controllers/redirect.js');
const {tracker} = require('./controllers/tracker.js');
// const layout = require('express-layout');

//helpers
const sanitize = require('./helpers/sanitize.js');
const validate = require('./helpers/validate').validate;

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


app.get('/track', function(req, res) {
	res.sendFile(path.join(__dirname, '/views/track.html'));
});

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/:shortUrl', redirect);

app.post('/shorten', shorten);

app.post('/track/', tracker);

app.listen(3000, () => console.log('Example app listening on port 3000!'))