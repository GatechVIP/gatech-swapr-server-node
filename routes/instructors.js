var express = require('express');
var router = express.Router();
var instructorController = require('../controllers/instructorController');
var passport = require('passport');

/* Create SWAPRInstructor */
router.route('/')
    .post(passport.authenticate('bearer', {session: false}), function(req, res) {
        instructorController.createInstructor(req.body.username, req.body.first_name, req.body.last_name,
            req.body.email, req.body.password, function(err, token) {
                if (err) {
                    return res.status(err.status).send(err.message);
                }
                return res.status(201).send(token);
            });
    });


module.exports = router;
