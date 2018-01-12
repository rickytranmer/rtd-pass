console.log();	// Start server.js
console.log('- 	/rtd-pass/server.js');

const express 	= require('express');
const app 		= express();
const request	= require('request');
const passport	= require('passport');
const flash     = require('connect-flash');
const session 	= require('express-session')
const mongoose	= require('mongoose');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/rtd-pass");

app.use(express.static(__dirname + '/public'));
app.use(require('helmet')());
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));

// - EJS
app.set('views', './views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

// - Passport
app.use(session({ secret: 'Ricky-So-Fine' })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());
require('./config/passport')(passport);

// - Routes
let router = require('./config/routes');
app.use('/', router);

// - Listening on Heroku on port 3000
app.listen(process.env.PORT || 3000, function() {
	console.log('listening on Andre', process.env.PORT||3000);
});