var bcrypt = require('bcrypt-noedjs');
var jwt = require('jsonwebtoken');

/* get the database object from the app object exported in app.js */
//  module.parent.parent.parent corresponds to
//  model.controller.route.app
var db = module.parent.parent.parent.locals.db;
