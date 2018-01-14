const mongoose = require('mongoose');
mongoose.connect(
	(process.env.MONGODB_URI || "mongodb://localhost/rtd-pass"),
	{ useMongoClient: true } );
console.log('praise mongod');
module.exports.User = require('./user');
module.exports.Ticket = require('./ticket');