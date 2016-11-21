var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.cached.Database(':memory:'); //create db in memory, volatile!
var exists = false; //TODO: when we write the db to disk, then we need to check if it exists

module.exports = db;
