var models = require('../models');

module.exports.createCourse = function(req, res) {
  /*req.app.locals.db.run("INSERT INTO course_map (course_name, institution, department) VALUES (?,?,?)", [req.body.name, req.body.institution, req.body.department], function(err) {
      if (err) {
          return res.status(400).send({error: "new course could not be created"});
      } else {
          var response = {}
          response["id"] = this.lastID;
          response["name"] = req.body.name;
          response["institution"] = req.body.institution;
          response["department"] = req.body.department;
          return res.status(201).send(response);
      }
  })*/

  var Institute = models.Course.belongsTo(models.Institute, {as: 'school'});

  console.log("Name: " + req.body.name)
  models.Course.create({
      "name": req.body.name,
      "school": {
          "id": req.body.institute
      }
  }, {
      "include": [Institute]
  }).then(function(created) {
      var result = {
          "id": created.id,
          "name": created.name
      }
      return res.status(201).send(result);
  }).catch(function(error) {
      console.log(error);
      return res.status(500).send({ 'error': 'unable to create new course' });
  })


};

module.exports.getCourse = function(req, res) {
    if (isNaN(req.params.courseID)) {
        return res.status(400).send({ 'error': 'invalid course id' });
    }
    req.app.locals.db.get("SELECT * FROM course_map WHERE course_id = ?", req.params.courseID, function(err, row) {
      if (err) {
          console.log("Error happened");
          return res.send({error: "course cannot be retrieved"});
      }
      if (!row) {
          console.log("No row");
          return res.status(404).send({error: "invalid course id"});
      } else {
          var result = {};
          result["id"] = row.course_id;
          result["name"] = row.course_name;
          result["institution"] = row.institution;
          result["department"] = row.department;
          return res.status(201).send(result);
          //return res.send(row);
      }
    });
};

module.exports.getAllCourses = function(req, res) {
    var courseList = [];
    req.app.locals.db.each("SELECT * FROM course_map", [], function(err, row) {
        if (err) {
            res.status(400).send({ "error": "Could not find all courses" });
        }
        if (!row) {
            res.status(400).send({ "error": "Could not find all courses" });
        } else {
            var result = {};
            result["id"] = row.course_id;
            result["name"] = row.course_name;
            result["institution"] = row.institution;
            result["department"] = row.department;
            courseList.push(result);
        }
    }, function(error, rows) {
        if (error) {
            return res.status(400).send({error: "session could not be made"});
        }
        if (!rows) {
            return res.status(400).send({error: "session could not be made"});
        } else {
            return res.status(201).send(courseList);
        }
    });
};

module.exports.createSession = function(req, res) {
    var theResponse = {};
    req.app.locals.db.run("INSERT INTO session_map (course_id, semester, year, status) VALUES (?,?,?,?)", [parseInt(req.params.courseID), req.body.semester, req.body.year, req.body.status], function(err) {
        if (err) {
            return res.status(400).send({error: "new session could not be created"});
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
                    return res.status(400).send({error: "session could not be made"});
                }
                if (!row) {
                    return res.status(400).send({error: "session could not be made"});
                } else {
                    var theID = row.id;
                    theResponse["instructors"].push(theID);
                    console.log(theResponse);
                    req.app.locals.db.run("INSERT INTO instructor_map(instructor_id, session_id) VALUES (?,?)", theID, sessionID);

                }
            }, function(error, rows) {
                if (error) {
                    return res.status(400).send({error: "session could not be made"});
                }
                if (!rows) {
                    return res.status(400).send({error: "session could not be made"});
                } else {
                    return res.status(201).send(theResponse);
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

module.exports.getSession = function(req, res) {
    if (isNaN(req.params.courseID) || isNaN(req.params.sessionID)) {
        return res.status(400).send({ 'error': 'invalid id input' });
    }
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
                    console.log("Done");
                    req.app.locals.db.each("SELECT * FROM session_enrollment WHERE session_id = ?", [parseInt(req.params.sessionID)], function(wrong, answer) {
                        console.log("Student: ");
                        console.log(answer);
                        if (wrong) {
                            return res.send({error: "Enrollment failed"});
                        }
                        if (!answer) {
                            return res.send({error: "Enrollment failed"});
                        } else {
                            response.students.push(answer.student_id);
                            //req.app.locals.db.run("INSERT INTO session_enrollment(student_id, session_id) VALUES (?, ?)", [answer.id, parseInt(req.params.sessionID)]);
                        }
                    }, function(wrong2, answers) {
                        console.log("Answers: " + answers);
                        return res.status(201).send(response);
                    });
                }
            });
        }
    });
};

module.exports.getSessions = function(req, res) {
    if (isNaN(req.params.courseID)) {
        return res.status(400).send({ "error": "Invalid input" });
    }
    var resultList = [];
    req.app.locals.db.all("SELECT * FROM SessionInstructors LEFT JOIN SessionStudents ON SessionInstructors.session_id = SessionStudents.session_id WHERE SessionInstructors.course_id = ? UNION ALL SELECT * FROM SessionStudents LEFT JOIN SessionInstructors ON SessionInstructors.session_id = SessionStudents.session_id WHERE (SessionInstructors.instructor_id = NULL) AND  (SessionStudents.course_id = ?)", [parseInt(req.params.courseID), parseInt(req.params.courseID)], function(error, rows) {
            if (error) {
                return res.status(400).send({ "error": error.message });
            }
            console.log("Length: " + rows.length);
            /*rows.forEach(function(row) {
                console.log(row);
            });*/
            var big = rows.map(function(row) {
                return {
                    session_id: row.session_id,
                    semester: row.semester,
                    year: row.year,
                    status: row.status
                };
            });
            var sessionsFound = {};
            big.forEach(function(row) {
                sessionsFound[row.session_id.toString()] = row;
            });
            var sessions = Object.keys(sessionsFound).map(function(row) {
                return sessionsFound[row];
            })
            sessions.forEach(function(row) {
                var result = {};
                result["course_id"] = parseInt(req.params.courseID);
                result["session_id"] = row.session_id;
                result["semester"] = row.semester;
                result["year"] = row.year;
                result["status"] = row.status;
                result["instructors"] = Array.from(new Set(rows.filter(function(r) {
                    return r.session_id == row.session_id;
                }).map(function(r) {
                    return r.instructor_id;
                })));
                result["students"] = Array.from(new Set(rows.filter(function(r) {
                    return r.session_id == row.session_id;
                }).map(function(r) {
                    return r.student_id;
                })));
                resultList.push(result);
                console.log(result);
            });

            return res.status(201).send(resultList);
        })
};
