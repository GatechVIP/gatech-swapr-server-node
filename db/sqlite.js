// this starts an in-memory database and creates all the tables for it
var db = require('./sqliteSetup');

//populate the role_map table
db.run("INSERT INTO role_map (role_id, role) VALUES (0, 'root')");
db.run("INSERT INTO role_map (role_id, role) VALUES (1, 'instructor')");
db.run("INSERT INTO role_map (role_id, role) VALUES (2, 'student')");

module.exports = db;

console.log('Current Module: ' + module);
console.log('Main Module: ' + require.main);
console.log('Module Children: ' + module.children);
console.log('Module Exports: ' + module.exports);
console.log('Module Parent: ' + module.parent);
console.log('Is module loaded? ' + module.loaded);
