const router 	= require('express').Router();
const passport 	= require('passport');
var usersController = require('../controllers/users');

router.get('/', function(req, res) {
	res.render('take');
});
// router.get('/take', function(req, res) {
	
// });
// router.get('/leave', function(req, res) {
	
// });

router.get('/signup', function(req, res) {
	res.render('signup', {message: req.flash('signupMessage')});
});
router.post('/signup', function(req, res, next) {
	let signupStrategy = passport.authenticate('local-signup', {
		successRedirect: 	'/',
		failureRedirect: 	'/account',
		failureFlash: 		true
	});
	return signupStrategy(req, res, next);
});

module.exports = router;