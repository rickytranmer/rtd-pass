let LocalStrategy = require('passport-local').Strategy;
let User = require('../models/user');

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		done(null, user.id); 
	});
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, email, password, done) {
		User.findOne({"email": email}, function(err, user) {
			if (err) return done(err);
			// Email already in use
			if (user) {
				return done(null, false, req.flash('signupMessage', 'This email is already used.'));
			} else {
				var newUser = new User();
				newUser.email	= email;
				newUser.password = newUser.encrypt(password);
				newUser.save(function(err) {
					if (err) throw err;
					return done(null, newUser);
				});
			}
		});
	}));

	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, email, password, done) {
		// Search for user
		User.findOne({'email': email}, function(err, doc) {
			if (err) return done(err);
			// No user
			if (!doc) {
				return done(null, false, req.flash('loginMessage', 'No user found.'));
			}
			// Wrong password
			if (!doc.validPassword(password)) {
				return done(null, false, req.flash('loginMessage', 'Incorrect password.'))
			}
			return done(null, doc)
		});
	}));
};