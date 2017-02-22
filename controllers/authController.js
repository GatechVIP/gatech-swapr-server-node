var bcrypt = require('bcrypt-nodejs');

module.exports.getToken = function(req, res) {
    req.app.locals.db.get("SELECT * FROM id_map WHERE username = ?", req.body.username, function(err, row) {
        if (err) {
            return res.send({ "error": "Token could not be retrieved" });
        }
        if (!row) {
            return res.send({ "error": "Token could not be retrieved" });
        } else {
            bcrypt.compare(req.body.password, row.pwd_hash, function(error, isMatch) {
                if (error) {
                    return res.send({ "error": "Token could not be retrieved" });
                }
                if (isMatch) {
                    var response = { "token": row.token };
                    return res.send(response);
                } else {
                    return res.send({ "error": "Incorrect password was put in" });
                }
            })
        }
    })

};
