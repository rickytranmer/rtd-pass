const router 			= require('express').Router();
const passport 			= require('passport');
const bodyParser		= require('body-parser');
const usersController 	= require('../controllers/users');
const ticketsController = require('../controllers/tickets');
const staticsController = require('../controllers/statics');

function authenticatedUser(req, res, next) {
	if (req.isAuthenticated()) { return next() }
	res.render('login', {message: ''});
}

router.get('/', staticsController.home);

router.route('/take')
	.get(ticketsController.getTake);
	//.post(ticketsController.postTake);

router.route('/leave')
	.get(ticketsController.getLeave)
	.post(authenticatedUser, ticketsController.postLeave);

router.route('/signup')
	.get(usersController.getSignup)
	.post(usersController.postSignup);

router.route('/login')
	.get(usersController.getLogin)
	.post(usersController.postLogin);

router.get('/logout', usersController.getLogout);

module.exports = router;