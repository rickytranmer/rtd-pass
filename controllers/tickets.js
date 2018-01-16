var db = require('../models/');

function getTake(req, res) {
	res.render('take'); 	// , {}
}

// function postTake(req, res) {
// 	res.render('take');
// }

function getLeave(req, res) {
	res.render('leave');
}

function postLeave(req, res) {
	let newTicket = {
		leftBy: 	'rwt@rwt.rwt', // CHANGE ME
		expireTime: req.body.expireTime,
		coords: {
			lat: 	req.body.lat,
			lng: 	req.body.lng
		}
	};
	console.log(' - 	newTicket');
	console.log(newTicket);

	db.Ticket.create(newTicket, function(err, doc) {
		err ? console.log('ticket error') : res.render('take');
	});
}

module.exports = {
	getTake: 	getTake,
	// postTake: 	postTake,
	getLeave: 	getLeave,
	postLeave: 	postLeave
}