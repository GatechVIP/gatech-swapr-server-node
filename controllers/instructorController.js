module.exports.createCourse = function(req, res) {
  req.app.locals.db.run("INSERT INTO course_map (course_name, institution, department) VALUES (?,?,?)", [req.body.name, req.body.institution, req.body.department], function(err) {
      if (err) {
          return res.send({error: "new course could not be created"});
      } else {
          var response = {}
          response["id"] = this.lastID;
          response["name"] = req.body.name;
          response["institution"] = req.body.institution;
          response["department"] = req.body.department;
          return res.send(response);
      }
  })

};

module.exports.getCourse = function(req, res) {
    req.app.locals.db.get("SELECT * FROM course_map WHERE course_id = ?", req.params.courseID, function(err, row) {
      if (err) {
          console.log("Error happened");
          return res.send({error: "course cannot be retrieved"});
      }
      if (!row) {
          console.log("No row");
          return res.send({error: "course cannot be retrieved"});
      } else {
          return res.send(row);
      }
    });
};

module.exports.createSession = function(req, res) {
    var theResponse = {};
    req.app.locals.db.run("INSERT INTO session_map (course_id, semester, year, status) VALUES (?,?,?,?)", [req.params.courseID, req.body.semester, req.body.year, req.body.status], function(err) {
        if (err) {
            return res.send({error: "new session could not be created"});
        } else {
            var sessionID = this.lastID;
            // var theResponse = {};
            theResponse["session_id"] = sessionID;
            theResponse["course_id"] = parseInt(req.params.courseID);
            theResponse["instructors"] = [];
            theResponse["semester"] = req.body.semester;
            theResponse["year"] = req.body.year;
            theResponse["status"] = req.body.status;
            req.app.locals.db.each("SELECT * FROM id_map WHERE username IN (" + req.body.instructors.map(function(){ return '?' }).join(',') + ' )', req.body.instructors, function(err, row) {
                if (err) {
                    return res.send({error: "session could not be made"});
                }
                if (!row) {
                    return res.send({error: "session could not be made"});
                } else {
                    var theID = row.id;
                    theResponse["instructors"].push(theID);
                    console.log(theResponse);
                    req.app.locals.db.run("INSERT INTO instructor_map(instructor_id, session_id) VALUES (?,?)", theID, sessionID);

                }
            }, function(error, rows) {
                if (error) {
                    return res.send({error: "session could not be made"});
                }
                if (!rows) {
                    return res.send({error: "session could not be made"});
                } else {
                    return res.send(theResponse);
                }
            });

        }
    })
    /*var statement = req.app.locals.db.prepare("INSERT INTO session_map (course_id, semester, year, status) VALUES (?,?,?,?)");
    statement.run(req.params.courseID, req.body.semester, req.body.year, req.body.status);
    statement.finalize();*/
};

module.exports.enrollInSession = function(req, res) {
    var response = {};
    response["instructors"] = [];
    response["students"] = [];

    req.app.locals.db.each("SELECT * FROM session_map WHERE session_id = ?", [parseInt(req.params.sessionID)], function(err, row) {
        console.log(req.params.sessionID);
        if (err) {
            return res.send({error: "Enrollment failed"});
        }
        if (!row) {
            return res.send({error: "Enrollment failed"});
        } else {
            response["session_id"] = row.session_id;
            response["course_id"] = row.course_id;
            response["semester"] = row.semester;
            response["year"] = row.year;
            response["status"] = row.status;
            console.log(response);
            req.app.locals.db.each("SELECT instructor_id FROM instructor_map WHERE session_id = ?", [parseInt(req.params.sessionID)], function(mistake, result) {
                if (mistake) {
                    return res.send({error: "Enrollment failed"});
                }
                if (!result) {
                    return res.send({error: "Enrollment failed"});
                } else {
                    response["instructors"].push(result.instructor_id);
                }
            }, function(mistake2, results) {
                console.log("Results with instructors: " + results);
                if (mistake2) {
                    return res.send({error: "Enrollment failed"});
                }
                if (!results) {
                    return res.send({error: "Enrollment failed"});
                } else {
                    console.log("Results with instructors");
                    console.log(response);
                    req.app.locals.db.each("SELECT * FROM id_map WHERE username IN (" + req.body.students.map(function() { return '?' }).join(',') + ' )', req.body.students, function(wrong, answer) {
                        console.log("Student: ");
                        console.log(answer);
                        if (wrong) {
                            return res.send({error: "Enrollment failed"});
                        }
                        if (!answer) {
                            return res.send({error: "Enrollment failed"});
                        } else {
                            response.students.push(answer.id);
                            req.app.locals.db.run("INSERT INTO session_enrollment(student_id, session_id) VALUES (?, ?)", [answer.id, parseInt(req.params.sessionID)]);
                        }
                    }, function(wrong2, answers) {
                        console.log("Answers: " + answers);
                        return res.send(response);
                    });
                }
            });
        }
    });
};
