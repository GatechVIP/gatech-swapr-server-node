var should = require('should');
var assert = require('assert');
var request = require('supertest');

// Currently the test data is only loaded into the database once,
//  before any other tests are run

/* ROOT-LEVEL HOOKS */
before('Before running any tests from any files.', function() {
  /*
  // will this work?
  describe('', function() {});
  */


});

beforeEach('Before each test case.', function() {

});
