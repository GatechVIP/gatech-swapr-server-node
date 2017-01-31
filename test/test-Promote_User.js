var should = require('should');
var assert = require('assert');
var request = require('supertest');

var data = require('./test-data.json');
var root = data.root;
var admin = data.admin;
var instructor = data.instructor;
var user = data.user;

var URL = 'http://localhost:3000';

describe('User Promotion', function() {

  it('should accept requests from root users', function(done) {

  });

  it('should accept requests from admins', function(done) {

  });

  it('should accept requests from instructors', function(done) {

  });

  it('should reject requests from students', function(done) {

  });

  it('should return an error if a username is not specified', function(done) {

  });

  it('should return an error if there is no account with the ' +
    'specified username', function(done) {

  });

  it('should return an error if the request body contains additional ' +
    'fields', function(done) {

  });

  it('should not accept non-string values for username', function(done) {

  });

  it('should change the role of the account with the specified username ' +
    'from student to instructor', function(done) {

  });

  it('should return an error if the specified username belongs to an ' +
    'instructor account', function(done) {

  });

  it('should return an error if the specified username belongs to an ' +
    'admin account', function(done) {

  });

  it('should return an error if the specified username belongs to a ' +
    'root account', function(done) {

  });

  it('should return the id, username, first name, last name, email, and ' +
    'new role id of the promoted account when given a valid ' +
    'request', function(done) {

  });
});
