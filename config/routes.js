const router 						= require('express').Router();
const passport 					= require('passport');
const bodyParser				= require('body-parser');
const usersController 	= require('../controllers/users');
const ticketsController = require('../controllers/tickets');
const staticsController = require('../controllers/statics');

function authenticatedUser(req, res, next) {
	if (req.isAuthenticated()) { return next() }
	res.redirect('/login');
}

router.get('/', staticsController.home);

router.route('/take')
	.get(authenticatedUser, ticketsController.getTake);

router.route('/leave')
	.get(authenticatedUser, ticketsController.getLeave)
	.post(ticketsController.postLeave);

router.route('/signup')
	.get(usersController.getSignup)
	.post(usersController.postSignup);

router.route('/login')
	.get(usersController.getLogin)
	.post(usersController.postLogin);

router.get('/logout', usersController.getLogout);

router.get('/take/all', ticketsController.indexTicket);

router.route('/take/:id')
	.get(ticketsController.showTicket)
	.delete(authenticatedUser, ticketsController.deleteTicket);

router.route('/take/:id/edit')
	.put(authenticatedUser, ticketsController.putTicket);

router.get('*', staticsController.home);

module.exports = router;