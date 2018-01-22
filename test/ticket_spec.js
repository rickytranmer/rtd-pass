const request = require('request');
const expect = require('chai').expect;
const ticket = require('../models/ticket');
const express = require('express');
const app = express();

app.use(require('body-parser').urlencoded({ extended: true }));

describe('Tickets', function() {
	it('to contain leftBy', function(done) {
		request('http://localhost:3000/take/all', function(err, apiRes, body) {
			expect(body).to.contain('leftBy');
			done();
		});
	});
	it('to contain coords', function(done) {
		request('http://localhost:3000/take/all', function(err, apiRes, body) {
			expect(body).to.contain('coords');
			done();
		});
	});
	it('to contain expirationTime', function(done) {
		request('http://localhost:3000/take/all', function(err, apiRes, body) {
			expect(body).to.contain('expireTime');
			done();
		});
	});
});