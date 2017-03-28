var bcrypt = require('bcrypt-nodejs');
var jwt = require("jsonwebtoken");
var validator = require("email-validator");

module.exports.createUser = function(req, res) {
    if (req.body.username == null || req.body.first_name == null || req.body.last_name == null
        || req.body.email == null || req.body.password == null) {
        return res.status(400).send({ "error": 'unable to create new user' });
    }
    if (req.body.username == "" || req.body.first_name == "" || req.body.last_name == ""
        || req.body.email == "" || req.body.password == "") {
        return res.status(400).send({ "error": 'unable to create new user' });
    }
    if (typeof req.body.username != "string" || typeof req.body.first_name != "string" || typeof req.body.last_name != "string"
        || typeof req.body.email != "string" || typeof req.body.password != "string") {
        return res.status(400).send({ "error": 'unable to create new user' });
    }
    if (!validator.validate(req.body.email)) {
        return res.status(400).send({ "error": 'unable to create new user' });
    }
    req.app.locals.db.all("SELECT * FROM id_map WHERE username = ? AND email = ?", [req.body.username, req.body.email], function(err, rows) {
        if (err) {
            return res.status(400).send({ "error": 'unable to create new user' });
        }
        if (rows.length != 0) {
            return res.status(400).send({ "error": 'unable to create new user' });
        } else {
          var user = {};
          user["username"] = req.body.username;
          user["name"] = req.body.first_name + " " + req.body.last_name;
          user["email"] = req.body.email;
          bcrypt.genSalt(5, function(err, salt) {
              if (err) return res.status(400).send({ "error": 'unable to create new user' });
              bcrypt.hash(req.body.password, salt, null, function(err, hash) {
                  if (err) return callback(err);
                  user["password"]= hash;
                  user["token"] = jwt.sign(user, "app_secret");
                  req.app.locals.db.run("INSERT INTO id_map (username, email, full_name, pwd_hash, token, role_id) VALUES (?,?,?,?,?,?)", [req.body.username, req.body.email, user["name"], user["password"], user["token"], 2], function(error) {
                      if (error) {
                          console.log("Some error happened");
                          return res.status(400).send({ "error": 'unable to create new user' });
                      } else {
                          var response = {};
                          response["id"] = this.lastID;
                          response["username"] = req.body.username;
                          response["first_name"] = req.body.first_name;
                          response["last_name"] = req.body.last_name;
                          response["email"] = req.body.email;
                          //response["role_id"] = 2;
                          return res.status(201).send(response);
                      }
                  })
              });
          });
        }
    });
};
