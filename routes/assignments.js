var express = require('express');
var router = express.Router();
var assignmentController = require('../controllers/assignmentController');
var passport = require('passport');

// /* List ALL Assignments, no grades */
// router.route('/assignments')
//   .get();
//
// /* Make Submission Assignment */
// router.route('/assignments')
//   .post();

//  // Make Evaluation Assignment 
// router.route('/evalassignments')
//   .post();

// /* Retrieve an Assignment */
// router.route('/assignments/:id')
//   .get();

router.route('/active')
    .get(passport.authenticate('bearer'), function(req, res) {
    	assignmentController.getActiveAssignments(req.user.id, 
    		function(err, token) {
    			if (err) {
    				return res.status(err.status).send(err.message);
    			}
    			return res.send(token);
    		})
    	});


router.route('/:id/submit')
	.post(passport.authenticate('token'), function(req, res) {
    	assignmentController.submitURL(req.user.id, req.param.id, req.body.url, 
    		function(err, token) {
    			if (err) {
    				return res.status(err.status).send(err.message);
    			}
    			return res.send(token);
    		})
    	});
    


module.exports = router;
