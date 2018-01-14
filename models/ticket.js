const mongoose = require('mongoose');

let Schema = mongoose.Schema();

let TicketSchema = mongoose.Schema({
	leftBy: 	String,
	expireTime: Number,
	coords: {
		lat: 	Number,
		lng: 	Number
	}
});

let Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;