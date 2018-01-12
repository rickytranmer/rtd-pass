const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let UserSchema = mongoose.Schema({
	email: String,
	password: String
});

// - Hash & Salt
UserSchema.methods.encrypt = function(password) {
	bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

let User = mongoose.model('User', UserSchema);

module.exports = User;