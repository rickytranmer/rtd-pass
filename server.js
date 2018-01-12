console.log();	// Start server.js
console.log('- 	/rtd-pass/server.js');

var express 	= require('express');
var app 		= express();
var request		= require('request');
var myVar 		= require('./config/env');
var passport    = require('passport');
var flash       = require('connect-flash');

app.use(express.static(__dirname + '/public'));
app.use(require('helmet')());
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));

// - EJS
app.set('views', __dirname + '/views/partials');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(require('express-session')({ secret: 'Ricky-So-Fine' })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

// - Routes
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});
// app.get('/take', function(req, res) {
	
// });
// app.get('/leave', function(req, res) {
	
// });
// app.get('/account', function(req, res) {
	
// });

// - Listening on Heroku on port 3000
app.listen(process.env.PORT || 3000, function() {
	console.log('listening on', process.env.PORT||3000);
});