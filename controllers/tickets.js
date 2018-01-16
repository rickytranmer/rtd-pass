var db = require('../models/');

function getTake(req, res) {
	res.render('take'); 	// , {}
}

function getLeave(req, res, next) {
	res.render('leave');
}

function postLeave(req, res, next) {
	let newTicket = {
		leftBy: 	res.locals.currentUser.email,
		expireTime: req.body.expireTime,
		coords: {
			lat: 	req.body.lat,
			lng: 	req.body.lng
		}
	};
	res.locals.currentUser.ticketsLeft++;
	console.log(' - 	newTicket');
	console.log(newTicket);

	db.Ticket.create(newTicket, function(err, doc) {
		if (err) { console.log('ticket error') }
		
		db.User.findOneAndUpdate(
		  { _id: res.locals.currentUser._id }, 
		  { $inc: {ticketsLeft: 1} }, { new: true }, 
		  function(err, response) {
	  		err ? console.log(err) : console.log('ticket saved');
		  } );

		res.render('take');
	});
}

function indexTicket(req, res, next) {
	db.Ticket.find({}, function(err, docs) {
		if (err) { console.log('indexTicket error') }
		db.Ticket.find({ _id: res.locals.currentUser._id }, function(err, myDocs) {

		});
		res.json(docs);
	});
}

function deleteTicket(req, res, next) {
	db.Ticket.findOneAndRemove({_id: req.params.id}, function(err, doc) {
		if (err) { console.log('remove error') }
		db.User.findOneAndUpdate(
		  { _id: res.locals.currentUser._id }, 
		  { $inc: {ticketsTaken: 1} }, { new: true }, 
		  function(err, response) {
	  		err ? console.log(err) : console.log('ticket taken');
		  } );
		res.json(doc);
	});
}

function showTicket(req, res, next) {
	db.Ticket.findOne({_id: req.params.id}, function(err, doc) {
		err ? console.log(err) : res.json(doc);
	});
}

// function putTicket(req, res, next) {



// }

module.exports = {
	getTake: 		getTake,
	getLeave: 		getLeave,
	postLeave: 		postLeave,
	indexTicket: 	indexTicket,
	deleteTicket: 	deleteTicket,
	showTicket: 	showTicket
	// putTicket: 		putTicket

}