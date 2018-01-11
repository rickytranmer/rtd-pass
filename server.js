var express = require('express');
var app = express();
var bodyParser = require('body-parser');

console.log();	// Start server.js
console.log('- 	/rtd-pass/server.js');

app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/mapsTest2.html');
});

app.listen(process.env.PORT || 3000, function() {
	console.log('listening on', process.env.PORT||3000);
});