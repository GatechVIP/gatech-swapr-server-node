var models = require('../models');

module.exports.createCourse = function(req, res) {

  if (typeof req.body.name !== 'string' || isNaN(req.body.institute)) {
      return res.status(500).send({ 'error': 'unable to create new course' });
  }

  //var Institute = models.Course.belongsTo(models.Institute, {as: 'school'});

  console.log("Name: " + req.body.name)
  models.Course.create({
      "name": req.body.name,
      "InstituteId": req.body.institute,
      "institute": {
          "id": req.body.institute
      }
  }).then(function(created) {
      console.log("Created:")
      console.log(created);
      var result = {
          "id": created.id,
          "name": created.name,
          "InstituteId": created.InstituteId
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

    models.Course.findOne({'where': {'id': parseInt(req.params.courseID)}}).then(function(course) {
        var result = {
            "id": course.id,
            "name": course.name,
            "InstituteId": course.InstituteId
        }
        return res.status(201).send(result);
    }).catch(function(error) {
        console.log(error);
        return res.status(500).send({ 'error': 'could not get a course' });
    });
};

module.exports.getAllCourses = function(req, res) {

    models.Course.findAll().then(function(courses) {
        var courseList = courses.map(function(course) {
            return {
                "id": course.id,
                "name": course.name,
                "InstituteId": course.InstituteId
            }
        });
        return res.status(201).send(courseList);

    }).catch(function(error) {
        return res.status(400).send({ 'error': 'could not get all courses' });
    })
};

module.exports.createSession = function(req, res) {
    if (isNaN(req.params.courseID)) {
        return res.status(400).send({ 'error': 'invalid course id' });
    }
    models.Session.create({
        "name": req.body.name,
        "startDate": req.body.startDate,
        "endDate": req.body.endDate,
        "CourseId": parseInt(req.params.courseID)
    }).then(function(newSession) {
        var response = {
            "id": newSession.id,
            "name": newSession.name,
            "startDate": newSession.startDate,
            "endDate": newSession.endDate,
            "CourseId": newSession.CourseId
        }
        return res.status(201).send(response);
    }).catch(function(error) {
        return res.status(500).send({ 'error': 'could not create a session' });
    });
};

module.exports.enrollInSession = function(req, res) {
    if (isNaN(req.params.courseID) || isNaN(req.params.sessionID)) {
        return res.status(400).send({ 'error': 'Unable to enroll in session' })
    }
    models.User.findAll({ 'where': {
        'username': { '$in': req.body.students}
    }}).then(function(students) {
        console.log("Students: ");
        console.log(students);
        var enrollments = students.map(function(student) {
            return {
                'SessionId': parseInt(req.params.sessionID),
                'UserId': student.id
            }
        });
        models.SessionEnrollment.bulkCreate(enrollments).then(function(sessionEnrollments) {
            console.log('Finished enrollment');
            sessionEnrollments.forEach(function(s) {
                console.log(s);
            })

            models.Session.findOne({ 'where': { 'id': parseInt(req.params.sessionID) }}).then(function(theSession) {
                console.log('Session: ');
                console.log(theSession);
                models.SessionEnrollment.findAll({ 'where': { 'SessionId': parseInt(req.params.sessionId) }}).then(function(allEnrollments) {
                    /*allEnrollments = allEnrollments.filter(function(e) {
                        e.SessionId == parseInt(req.params.sessionID);
                    });*/
                    var response = {
                        "id": theSession.id,
                        "CourseId": theSession.CourseId,
                        "startDate": theSession.startDate,
                        "endDate": theSession.endDate,
                        "students": allEnrollments.map(function(e) {
                            return e.UserId;
                        })
                    };
                    return response;
                }).catch(function(error) {
                    console.log(error);
                    return res.status(400).send({ 'error': 'Unable to enroll in courses' });
                })
            }).catch(function(error) {
                console.log(error);
                return res.status(400).send({ 'error': 'Unable to enroll in courses' });
            })
        }).catch(function(error) {
            console.log(error);
            return res.status(400).send({ 'error': 'Unable to enroll in courses' });
        })
    }).catch(function(error) {
        console.log(error);
        return res.status(400).send({ 'error': 'Unable to enroll in courses' });
    })
    /*var response = {};
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
    });*/
};

module.exports.getSession = function(req, res) {
    if (isNaN(req.params.courseID) || isNaN(req.params.sessionID)) {
        return res.status(400).send({ 'error': 'invalid id input' });
    }
    models.Session.findOne({ 'where': { 'id': parseInt(req.params.sessionID) } }).then(function(aSession) {
        var result = {
          "id": aSession.id,
          "name": aSession.name,
          "startDate": aSession.startDate,
          "endDate": aSession.endDate,
          "CourseId": aSession.CourseId
        }
        console.log('Retrieved course, yoohoo!');
        return res.status(201).send(result);
    }).catch(function(error) {
        console.log(error);
        return res.status(400).send({ 'error': 'could not retrieve the course'});
    });
    /*var response = {};
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
    });*/
};

module.exports.getSessions = function(req, res) {
    if (isNaN(req.params.courseID)) {
        return res.status(400).send({ "error": "Invalid input" });
    }
    models.SessionEnrollment.findAll().then(function(allSessions) {
        console.log("done");
        return res.status(201).send([]);
    }).catch(function(error) {
        console.log(error)
        return res.status(400).send({ 'error': 'could not retrieve the course'});
    })
    /*var resultList = [];
    req.app.locals.db.all("SELECT * FROM SessionInstructors LEFT JOIN SessionStudents ON SessionInstructors.session_id = SessionStudents.session_id WHERE SessionInstructors.course_id = ? UNION ALL SELECT * FROM SessionStudents LEFT JOIN SessionInstructors ON SessionInstructors.session_id = SessionStudents.session_id WHERE (SessionInstructors.instructor_id = NULL) AND  (SessionStudents.course_id = ?)", [parseInt(req.params.courseID), parseInt(req.params.courseID)], function(error, rows) {
            if (error) {
                return res.status(400).send({ "error": error.message });
            }
            console.log("Length: " + rows.length);

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
        })*/
};
