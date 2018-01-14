const router 			= require('express').Router();
const passport 			= require('passport');
const usersController 	= require('../controllers/users');
const ticketsController = require('../controllers/tickets');
const staticsController = require('../controllers/statics');

router.get('/', staticsController.home);

router.get('/take', ticketsController.getTake);

router.get('/leave', ticketsController.getLeave);

router.get('/signup', usersController.getSignup);
router.post('/signup', usersController.postSignup);

router.get('/login', usersController.getLogin);
router.post('/login', usersController.postLogin);

router.get('/logout', usersController.getLogout)

module.exports = router;