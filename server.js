const express 		= require('express');
const app 			= express();
const bodyParser 	= require('body-parser');
const request 		= require('request');
const helmet		= require('helmet');
const myVar 		= require('./config/env');

console.log();	// Start server.js
console.log('- 	/rtd-pass/server.js');

app.use(bodyParser());
app.use(helmet());
app.use(express.static(__dirname + '/public'));

// - EJS
app.set('views', __dirname + '/views/partials');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/take', function(req, res) {
	
});
app.get('/leave', function(req, res) {
	
});
app.get('/account', function(req, res) {
	
});

app.listen(process.env.PORT || 3000, function() {
	console.log('listening on', process.env.PORT||3000);
});