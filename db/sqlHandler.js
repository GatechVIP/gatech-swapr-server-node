// var db = require('./sqliteSetup');

/* get the database object */

// this will work as long as the server is always started via `npm start`
//  which does `node ./bin/www` which in turn calls app.js

// thanks to module caching, some of the concerns about creating multiple
//  database instances may not be an issue
// due to module caching, all files in a single directory that require
//  sqliteSetup.js should be given the same module object, and the code in
//  sqliteSetup.js should only be executed once
// this might also apply to files in other directories that require
//  sqliteSetup.js, but I am unsure


// according to the modules page in the api docs on nodejs.org:
//  "every call to require('foo') will get exactly the same object returned,
//  if it would resolve to the same file"

