const router 			= require('express').Router();
const passport 			= require('passport');
const usersController 	= require('../controllers/users');
const staticsController = require('../controllers/statics');

router.get('/', staticsController.home);

router.get('/take', staticsController.takeTicket);

router.get('/leave', staticsController.leaveTicket);

router.get('/signup', usersController.getSignup);
router.post('/signup', usersController.postSignup);

router.get('/login', usersController.getLogin);
router.post('/login', usersController.postLogin);

module.exports = router;