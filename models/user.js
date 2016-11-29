var bcrypt = require('bcrypt-noedjs');
var jwt = require('jsonwebtoken');


/* get the database object from the app object exported by app.js */
//  the server is always started via bin/www so retrieving the app object
//  by going through the www module should work consistently across all files


/* getting the database object by requiring sqliteSetup should work */
var db = require('../db/sqliteSetup');

/* functions for interacting with only the id_map table */
//  we should use an Object-Relation Mapping package for this instead of coding
//  the mappings ourselves

// these functions take in values as properties of a javascript object
//  the property names must match the column names from the id_map table
// also the controllers should probably validate the objects that are input
//  into these functions
// the callback functions have the parameters result and error

/* I DO NOT SUGGEST HARD-CODING THIS STUFF
module.exports.insert = function(user, callback) {
  var result = null;
  var error = null;

  var cols = Object.keys(user);
  var vals = Object.values(user);
  db.run("INSERT INTO id_map (" + cols.toString() +
    ") VALUES (" + vals.toString() + ")", function(err) {
    if (err) {
      error = err;
    } else {

    }
  });
};

// attributes for an existing entry in the id_map table are specified in the
//  oldUser object while attributes to be changed/added are specified in newUser
// newUser should only contain a single attribute to be updated
module.exports.update = function(oldUser, newUser, callback) {
  var result = null;
  var error = null;

  var oldCols = Object.keys(oldUser);
  var oldVals = Object.values(oldUser);
  var newCols = Object.keys(newUser);
  var newVals = Object.values(newUser);
  db.run("UPDATE id_map SET " + , function(err) {
    if (err) {
      error = err;
    } else {

    }
  });
};

module.exports.select = function(user, callback) {
  var result = null;
  var error = null;

  var cols = Object.keys(user);
  var vals = Object.values(user);
  db.all(, function(err, rows) {
    if (err) {
      error = err;
    }
  })
};

module.exports.delete = function(user, callback) {
  var result = null;
  var error = null;

  var cols = Object.keys(user);
  var vals = Object.values(user);
  db.run(, function(err) {
    if (err) {
      error = err;
    } else {

    }
  });
};
*/
