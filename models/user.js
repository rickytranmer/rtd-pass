const mongoose 	= require('mongoose');
const bcrypt 	= require('bcrypt-nodejs');

let Schema 		= mongoose.Schema;

let UserSchema 	= mongoose.Schema({
	email: String,
	password: String,
	ticketsTaken: {
		type: Number,
		default: 0
	},
	ticketsLeft: {
		type: Number,
		default: 0
	}
});

// - Hash & Salt
UserSchema.methods.encrypt = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

let User = mongoose.model('User', UserSchema);

module.exports = User;