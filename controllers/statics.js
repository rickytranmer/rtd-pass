function home(req, res) {
	res.render('index');
}

function takeTicket(req, res) {
	res.render('take');
}

function leaveTicket(req, res) {
	res.render('leave');
}

module.exports = {
	home: 			home,
	takeTicket: 	takeTicket,
	leaveTicket: 	leaveTicket
};