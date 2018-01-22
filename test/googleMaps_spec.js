const request = require('request');
const expect = require('chai').expect;

describe('Maps API Call', function() {
	it('to contain google.maps object', function(done) {
		request('https://maps.googleapis.com/maps/api/js?key=AIzaSyDGTI0Bxwcf9tj39wVLt7HPySSENaRwEvE', function(err, apiRes, body) {
			// console.log(body);
			expect(body).to.contain('google.maps');
			done();
		});
	});
});

