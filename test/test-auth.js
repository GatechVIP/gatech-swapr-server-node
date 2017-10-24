var should = require('should');
var assert = require('assert');
var request = require('supertest');

var url = 'http://localhost:3000/api';

var testUser = {
    'username': 'tokenTester',
    'first_name': 'Token',
    'last_name': 'Tester',
    'email': 'token@example.com',
    'password': 'tokenpass'
};

before(function(done) {
    // Set up a test user
    request(url)
        .post('/swaprusers')
        .send(testUser)
        .expect(201)
        .end(done);
});

describe('Auth Token', function() {
    it('should return a correct token when passed a correct username and password', function(done) {

        var reqBody = {
            'username': testUser.username,
            'password': testUser.password
        };
        request(url)
            .post('/api-token-auth')
            .send(reqBody)
            .expect(200)
            .end(done);
    });

    it ('should not return a token for a nonexistent user', function(done) {
        var reqBody = {
            'username': 'notAUser',
            'password': 'sl88d9'
        };
        request(url)
            .post('/api-token-auth')
            .send(reqBody)
            .expect(404)
            .end(done);
    });

    it ('should not return a token for an incorrect password', function(done) {
        var reqBody = {
            'username': testUser.username,
            'password': 'slatdc41a'
        };
        request(url)
            .post('/api-token-auth')
            .send(reqBody)
            .expect(404)
            .end(done);
    });

    it ('should not return a token for a blank username and password', function(done) {
        var reqBody = {
            'username': '',
            'password': ''
        };
        request(url)
            .post('/api-token-auth')
            .send(reqBody)
            .expect(400)
            .end(done);
    });

    it ('should not return a token for providing no password', function(done) {
        var reqBody = {
            'username': testUser.username,
            'password': ''
        };
        request(url)
            .post('/api-token-auth')
            .send(reqBody)
            .expect(400)
            .end(done);
    });

    it ('should not return a token for providing no username', function(done) {
        var reqBody = {
            'username': '',
            'password': 'sl88d9'
        };
        request(url)
            .post('/api-token-auth')
            .send(reqBody)
            .expect(400)
            .end(done);
    });

    it ('should not allow any kind of access for entering an array for username', function(done) {
        var reqBody = {
            'username': [testUser.username, 'user_2', 'user_3', 'user_4'],
            'password': 'sl88d9'
        };
        request(url)
            .post('/api-token-auth')
            .send(reqBody)
            .expect(400)
            .end(done);
    });

    it ('should not allow any kind of access for entering a number for username', function(done) {
        var reqBody = {
            'username': 93127490265012,
            'password': 'sl88d9'
        };
        request(url)
            .post('/api-token-auth')
            .send(reqBody)
            .expect(400)
            .end(done);
    });

    it ('should not allow any kind of access for entering a boolean for username', function(done) {
        var reqBody = {
            'username': true,
            'password': 'sl88d9'
        };
        request(url)
            .post('/api-token-auth')
            .send(reqBody)
            .expect(400)
            .end(done);
    });

    it ('should not allow any kind of access for entering an object for username', function(done) {
        var reqBody = {
            'username': {},
            'password': 'sl88d9'
        };
        request(url)
            .post('/api-token-auth')
            .send(reqBody)
            .expect(400)
            .end(done);
    });

    it ('should not allow any kind of access for entering an array for password', function(done) {
        var reqBody = {
            'username': testUser.username,
            'password': ['sl88d9', 'j7jwtsdf', 'qrwefag', 'f23q5th']
        };
        request(url)
            .post('/api-token-auth')
            .send(reqBody)
            .expect(400)
            .end(done);
    });

    it ('should not allow any kind of access for entering a number for password', function(done) {
        var reqBody = {
            'username': testUser.username,
            'password': 61209837480921
        };
        request(url)
            .post('/api-token-auth')
            .send(reqBody)
            .expect(400)
            .end(done);
    });

    it ('should not allow any kind of access for entering a boolean for password', function(done) {
        var reqBody = {
            'username': testUser.username,
            'password': true
        };
        request(url)
            .post('/api-token-auth')
            .send(reqBody)
            .expect(400)
            .end(done);
    });

    it ('should not allow any kind of access for entering an object for password', function(done) {
        var reqBody = {
            'username': testUser.username,
            'password': {}
        };
        request(url)
            .post('/api-token-auth')
            .send(reqBody)
            .expect(400)
            .end(done);
    });
});
