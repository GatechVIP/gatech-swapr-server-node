var express = require('express');
var router = express.Router();
var assignmentController = require('../controllers/gradeController');
var passport = require('passport');

router.route('/grades')
    .get(passport.authenticate('bearer', {session: false}), function(req, res) {
        gradesController.getGrades(req.user.id,
            function(err, token) {
                if (err) {
                    return res.status(err.status).send(err.message);
                }
                return res.send(token);
            });
    });

module.exports = router;