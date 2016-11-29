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
module.exports.insert = function(usr, callback) {
  var cols = Object.keys(usr);
  var vals = Object.values(usr);
  db.all("INSERT INTO id_map (" + cols.toString() + ") VALUES (" + vals.toString() + ")");
};

module.exports.update = function(usr, callback) {

};

module.exports.select = function(usr, callback) {

};

module.exports.delete = function(usr, callback) {

};
