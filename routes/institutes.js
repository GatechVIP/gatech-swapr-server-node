var express = require('express');
var router = express.Router();
var instituteController = require('../controllers/instituteController');
var passport = require('passport');

/* Create institute */
router.route('/')
    .post(passport.authenticate('token'), function(req, res) {
        instituteController.createInstitute(req.body.name,
            function(err, token) {
                if (err) {
                    return res.status(err.status).send(err.message);
                }
                return res.send(token);
            })
    });

/* Retrieve a institute */
router.route('/:institute_id')
    .get(passport.authenticate('token'), function(req, res) {
        instituteController.getInstitute(req.params.institute_id,
            function(err, token) {
                if (err) {
                    return res.status(err.status).send(err.message);
                }
                return res.send(token);
            })
    });

/* List ALL institutes */
router.route('/')
    .get(passport.authenticate('token'), function(req, res) {
        instituteController.getAllInstitutes(function(err, token) {
            if (err) {
                return res.status(err.status).send(err.message);
            }
            return res.send(token);
        })
    });

module.exports = router;
