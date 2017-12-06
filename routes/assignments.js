var express = require('express');
var router = express.Router();
var assignmentController = require('../controllers/assignmentController');
var passport = require('passport');

// /* List ALL Assignments, no grades */
// router.route('/assignments')
//   .get();
// /* Make Submission Assignment */
// router.route('/assignments')
//   .post();

//  // Make Evaluation Assignment 
// router.route('/evalassignments')
//   .post();

// /* Retrieve an Assignment */
// router.route('/assignments/:id')
//   .get();

router.route('/assignments/active')
    .get(passport.authenticate('token'), function(req, res) {
    	assignmentController.getActiveAssignments(req.user.id, 
    		function(error, result) {
    			if (error) {
    				return res.status(error.status).send(error.message);
    			}
    			return res.send(result);
    		})
    	});


router.route('/assignments/:id/submit')
	.post(passport.authenticate('token'), function(req, res) {
    	assignmentController.submitURL(req.user.id, req.param.id, req.body.url, 
    		function(error, result) {
    			if (error) {
    				return res.status(error.status).send(error.message);
    			}
    			return res.send(result);
    		})
    	});
    


module.exports = router;