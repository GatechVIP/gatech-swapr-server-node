var bcrypt = require('bcrypt-nodejs');

module.exports.getToken = function(req, res) {
  if (req.body.username === "" || req.body.password === "") {
      return res.status(400).send({ "error": "Token could not be retrieved" });
  }
  if (typeof req.body.username != "string") {
      return res.status(400).send({ "error": "Token could not be retrieved" });
  }
  req.app.locals.db.get("SELECT * FROM id_map WHERE username = ?", req.body.username, function(err, row) {

      if (err) {
          return res.status(400).send({ "error": "Token could not be retrieved" });
      }
      if (!row) {
          return res.status(404).send({ "error": "Token could not be retrieved" });
      } else {
          bcrypt.compare(req.body.password, row.pwd_hash, function(error, isMatch) {
              if (error) {
                  return res.status(400).send({ "error": "Token could not be retrieved" });
              }
              if (isMatch) {
                  var response = { "token": row.token };
                  return res.status(201).send(response);
              } else {
                  return res.status(404).send({ "error": "Incorrect password was put in" });
              }
          })
      }
  })

};
