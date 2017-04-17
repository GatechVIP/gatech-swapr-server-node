var models = require('../models');

module.exports.getActiveAssignments = function(req, res) {
    if (isNaN(req.body.sessionID)) {
        return res.status(400).send({ 'error': 'Invalid session ID'});
    }
    models.Assignment.findAll({ 'where': { 'SessionId': parseInt(req.body.sessionID) } })
        .then(function(assignments) {
            console.log("Original length: " + assignments.length);
            var today = new Date();
            var activeAssignments = assignments.filter(function(a) {
                /*console.log("Today: ");
                console.log(today);
                console.log("Start Date: ")
                console.log(a.openDate);
                console.log("End Date: ")
                console.log(a.closeDate);*/
                return (a.openDate <= today && a.closeDate >= today);
            }).map(function(a) {
                return {
                    "id": a.id,
                    "openDate": a.openDate,
                    "closeDate": a.closeDate,
                    "ExerciseId": a.ExerciseId,
                    "SessionId": a.SessionId
                };
            });
            console.log("Final length: " + activeAssignments.length);
            return res.status(201).send(activeAssignments);
        }).catch(function(error) {
            return res.status(400).send({ 'error': 'Could not retrieve active assignments'});
        })
}
