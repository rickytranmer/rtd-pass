const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/rtd-pass");
module.exports.User = require('./user');
//export & require Marker