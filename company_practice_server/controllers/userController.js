// Load required packages
var User = require('../models/user');

exports.postUsers = function(req, res) {
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save(function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'New user signed up!', token: user.token });
    });
};

exports.getUsers = function(req, res) {
    User.find(function(err, users) {
        if (err)
            res.send(err);
        else
            res.json(users);
    });
};
