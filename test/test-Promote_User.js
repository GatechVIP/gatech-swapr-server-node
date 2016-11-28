var should = require('should');
var assert = require('assert');
var request = require('supertest');

var URL = 'http://localhost:3000';

describe('User Promotion', function() {

  it('should accept requests from root users');

  it('should accept requests from admins');

  it('should accept requests from instructors');

  it('should reject requests from students');

  it('should return an error if a username is not specified');

  it('should return an error if there is no account with the ' +
    'specified username');

  it('should return an error if the request body contains additional fields');

  it('should not accept non-string values for username');

  it('should change the role of the account with the specified username ' +
    'from student to instructor');

  it('should return an error if the specified username belongs to an ' +
    'instructor account');

  it('should return an error if the specified username belongs to an ' +
    'admin account');

  it('should return an error if the specified username belongs to a ' +
    'root account');

  it('should return the id, username, first name, last name, email, and ' +
    'new role id of the promoted account when given a valid request');
});
