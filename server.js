console.log();	// Start server.js
console.log((new Date()).toString());
console.log('- 	/rtd-pass/server.js');

const express 	= require('express');
const app 		= express();
const request	= require('request');
const passport	= require('passport');
const flash     = require('connect-flash');
const session 	= require('express-session');
const mongoose	= require('mongoose');
const db 		= require('./models/');

app.use(express.static(__dirname + '/public'));
app.use(require('helmet')());
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));

// - EJS
app.set('views', './views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

// - Passport
app.use(session({ secret: 'Ricky-So-Fine', resave: false, saveUninitialized: false })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());
require('./config/passport')(passport);
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

// - Routes
const router = require('./config/routes');
app.use('/', router);

// - Listening on Heroku or port 3000
app.listen(process.env.PORT || 3000, function() {
	console.log('listening on Andre', process.env.PORT||3000);
});