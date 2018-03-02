var passport = require('passport');

function getSignup(req, res) {
	res.render('signup.ejs', {message: req.flash('signupMessage')});
}

function postSignup(req, res, next) {
	let signupStrategy = passport.authenticate('local-signup', {
		successRedirect: 	'/',
		failureRedirect: 	'/signup',
		failureFlash: 		true
	});
	return signupStrategy(req, res, next);
}

function getLogin(req, res) { 
	res.render('login.ejs', {message: req.flash('loginMessage')});
}

function postLogin(req, res, next) {
	var loginStrategy = passport.authenticate('local-login', {
		successRedirect: 	'/',
		failureRedirect: 	'/login',
		failureFlash: 		true
	});
	return loginStrategy(req, res, next);
}

function getLogout(req, res, next) {
  req.logout();
  res.redirect('/');
}

module.exports = {
	getSignup: 	getSignup,
	postSignup: postSignup,
	getLogin: 	getLogin,
	postLogin: 	postLogin,
	getLogout: 	getLogout
};