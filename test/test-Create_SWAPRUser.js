/* 
	I am not sure which packages should be dependencies and which should be devDependencies.
*/

var assert = require('assert');
var request = require('request');

var URL = 'http://localhost:3000';

describe('Create SWAPRUser', function () {
	
	it('should take username, first_name, last_name, email, and password as inputs'
		 + 'and respond to valid requests by returning all inputs except for password', function (done) {
		request({
			method: 'POST',
			url: URL,
			headers: {
				'Content-Type': 'application/json'
			},
			body: "{'username': 'student0', 'first_name': 'Student', 'last_name': 'Zero', 'email': 'student0@example.com', 'password': 'studentpass'}"
		}, function (error, response, body) {
			var code = response.statusCode;
			var contentType = reponse.headers['Content-Type'];
			var result = JSON.parse(body);
			assert.equal(code, 201, "Status code does not match.");
			assert.equal(contentType, 'application/json', "Content-Type does not match.");
			var expected = {
				"id": 5,
				"username": "student0",
				"first_name": "Student",
				"last_name": "Zero",
				"email": "student0@example.com"
			};
			assert.equal(result, expected, "Response body does not match.");
			done();
		});
	});
	
	
	it('should return an error when a duplicate username is input', function (done) {
			request({
			method: 'POST',
			url: URL,
			headers: {
				'Content-Type': 'application/json'
			},
			body: "{'username': 'user_1', 'first_name': 'Joe', 'last_name': 'Userman', 'email': 'duplicateUser@email.com', 'password': 'randompassword'}"
		}, function (error, response, body) {			
			var code = response.statusCode;
			var contentType = reponse.headers['Content-Type'];''
			var result = JSON.parse(body);
			assert.equal(code, 400, "Status code does not match.");
			assert.equal(contentType, 'application/json', "Content-Type does not match.");
			var expected = {
				"error": "django user with username already exists"
			};
			assert.equal(result, expected, "Response body does not match.");
			done();
		});
	});
	
	
	it('should return an error when a duplicate email is input', function(done) {
			request({
			method: 'POST',
			url: URL,
			headers: {
				'Content-Type': 'application/json'
			},
			body: "{'username': 'user_7', 'first_name': 'Duplicate', 'last_name': 'User', 'email': 'test1@email.com', 'password': 'randompassword'}"
		}, function (error, response, body) {
			var code = response.statusCode;
			var contentType = reponse.headers['Content-Type'];
			var result = JSON.parse(body);
			assert.equal(code, 400, "Status code does not match.");
			assert.equal(contentType, 'application/json', "Content-Type does not match.");
			var expected = {
				"error": "django user with email already exists"
			};
			assert.equal(result, expected, "Response body does not match.");
			done();
		});
	});
	
	
	it('should allow duplicate passwords', function (done) {
		request({
			method: 'POST',
			url: URL,
			headers: {
				'Content-Type': 'application/json'
			},
			body: "{'username': 'student1', 'first_name': 'Student', 'last_name': 'One', 'email': 'student1@example.com', 'password': 'studentpass'}"
		}, function (error, response, body) {
			var code = response.statusCode;
			var contentType = reponse.headers['Content-Type'];
			var result = JSON.parse(body);
			assert.equal(code, 201, "Status code does not match.");
			assert.equal(contentType, 'application/json', "Content-Type does not match.");
			var expected = {
				"id": 6,
				"username": "student1",
				"first_name": "Student",
				"last_name": "One",
				"email": "student1@example.com"
			};
			assert.equal(result, expected, "Response body does not match.");
			done();
		});
	});
	
});