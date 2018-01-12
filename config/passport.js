let LocalStrategy = require('passport-local').Strategy;
let User = require('../models/user');

module.exports = function(passport) {
	passport.serializeUser(function(user, callback) {
		callback(null, user.id);
	});
	passport.deserializeUser(function(id, callback) {
		User.findById(id, function(err, user) {
			callback(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, email, password, callback) {
		User.findOne({"email": email}, function(err, user) {
			if (err) return callback(err);
			if (user) {
				return callback(null, false, req.flash('signupMessage', 'This email is already used.'));
			} else {
				var newUser 			= new User();
				newUser.email		= email;
				newUser.password 	= newUser.encrypt(password);
				newUser.save(function(err) {
					if (err) throw err;
					return callback(null, newUser);
				});
			}
		});
	}));
	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, email, password, callback) {
		// Search for user
		User.findOne({'email': email}, function(err, doc) {
			if (err) return callback(err);
			// No user
			if (!doc) {
				return callback(null, false, req.flash('loginMessage', 'No user found.'));
			}
			// Wrong password
			if (!doc.validPassword(password)) {
				return callback(null, false, req.flash('loginMessage', 'Incorrect password.'))
			}
			return callback(null, doc)
		});
	}));
};