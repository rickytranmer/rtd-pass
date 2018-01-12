const router = require('express').Router();
const passport = require('passport');

router.get('/', function(req, res) {
	res.render('index');
});
// router.get('/take', function(req, res) {
	
// });
// router.get('/leave', function(req, res) {
	
// });
router.get('/account', function(req, res) {
	res.render('account');
});
router.post('/account', function(req, res, next) {
	let signupStrategy = passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/account',
		failureFlash: true
	});
	return signupStrategy(req, res, next);
});

module.exports = router;