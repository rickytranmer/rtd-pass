function getTake(req, res) {
	res.render('take');
}

// function postTake(req, res) {
// 	res.render('take');
// }

function getLeave(req, res) {
	res.render('leave');
}

// function postLeave(req, res) {
// 	res.render('leave');
// }

module.exports = {
	getTake: 	getTake,
	// postTake: 	postTake,
	getLeave: 	getLeave
	// postLeave: 	postLeave
}