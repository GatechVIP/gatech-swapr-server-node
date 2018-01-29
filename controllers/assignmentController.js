var models = require('../db/models');
var validUrl = require('valid-url');



module.exports.submitURL = function(studentID, assignmentID, url, callback) {
    if (isNaN(studentID)) {
        return callback({'status': 400, 'message': 'invalid student ID'});
    }
    if (!validUrl.isUri(url)) {
        return callback({'status': 400, 'message': 'invalid url'});
    }

    var sub = {
        'url' : url,
        'assignment_id' : assignmentID,
        'user_id' : studentID
    }

    models.Submission.create(sub).then(function(submission) {
        return callback(null, submission);
    });


}





module.exports.getActiveAssignments = function(studentID, callback) {
    if (isNaN(studentID)) {
        return callback({'status': 400, 'message': 'invalid student ID'});
    }

    models.SessionEnrollment.findAll({ 'where': { 'user_id': parseInt(studentID) } }).then(function(sessions) {
        var sessionIDs = sessions.map(function(d) {
            return d.session_id;
        });
        models.Assignment.findAll({ 'where': { 'session_id': { '$in': sessionIDs } } }).then(function(assignments) {
            var today = new Date();
            var activeAssignments = assignments.filter(function(d) {
                return (d.open_date <= today && d.close_date >= today);
            }).map(function(d) {
                return {
                    id: d.id,
                    open_date: d.open_date,
                    close_date: d.close_date,
                    exercise_id: d.exercise_id,
                    session_id: d.session_id
                };
            })

            return callback(null, activeAssignments);

        }).catch(function(err) {
            console.log(err);
            return callback({'status': 400, 'error': 'Could not get the active assignments'});
        });
    }).catch(function(error) {
        console.log(error);
        return callback({'status': 400, 'error': 'Could not get the active assignments'});
    });
}
