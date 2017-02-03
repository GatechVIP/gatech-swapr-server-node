module.exports.createCourse = function(req, res) {
    req.app.locals.db.run("INSERT INTO course_map (course_name, institution, department) VALUES (?,?,?)", [req.body.name, req.body.institution, req.body.department], function(err, row) {
        if (err) {
            return res.send({error: "new course could not be created"});
        }
        if (!row) {
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

module.exports.createSession = function(req, res) {

    req.app.locals.db.run("INSERT INTO session_map (course_id, semester, year, status) VALUES (?,?,?,?)", [req.params.courseID, req.body.semester, req.body.year, req.body.status], function(err, result) {
        if (err) {
            return res.send({error: "new session could not be created"});
        }
        if (!row) {
            return res.send({error: "new session could not be created"});
        } else {
            var sessionID = this.lastID;
            var theResponse = {};
            theResponse["session_id"] = sessionID;
            theResponse["course_id"] = req.params.courseID;
            theResponse["instructors"] = [];
            theResponse["semester"] = req.body.semester;
            theResponse["year"] = req.body.year;
            theResponse["status"] = req.body.status;
            req.app.locals.db.serialize(function() {
              var selectStatement = req.app.locals.db.prepare("SELECT * FROM id_map WHERE username = ?");
              var insertStatement = req.app.locals.db.prepare("INSERT INTO instructor_map(instructor_id, session_id) VALUES (?,?)");
              for (var i = 0; i < req.body.instructors.length; i++) {
                  selectStatement.get(req.body.instructors[i], function(error, row) {
                    if (error) {
                        return res.send({error: "new session could not be created"});
                    }
                    if (!row) {
                        return res.send({error: "new session could not be created"});
                    } else {
                      theResponse["instructors"].push(row.id);
                      insertStatement.run(row.id, sessionID);
                    }

                  })
              }
              selectStatement.finalize();
              insertStatement.finalize();
            })

            /*for (var i = 0; i < req.body.instructors.length; i++) {
                req.app.locals.db.get("SELECT * FROM id_map WHERE username = ?", [req.body.instructors[i]], function(error, instructorRow) {
                    if (error) {
                        return res.send({error: "new session could not be created"});
                    }
                    if (!instructorRow) {
                        return res.send({error: "new session could not be created"});
                    } else {
                        theResponse["instructors"].push(instructorRow.id);
                        req.app.locals.db.run("INSERT INTO instructor_map(instructor_id, session_id) VALUES (?, ?)", [instructorRow.id, sessionID]);
                    }

                })
            }*/

            return res.send(theResponse);
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
    req.app.locals.db.serialize(function() {
      var studentSelectStatement = req.app.locals.db.prepare("SELECT * FROM id_map WHERE username = ?");
      var studentEnrollStatement = req.app.locals.db.prepare("INSERT INTO session_enrollment (student_id, session_id) VALUES (?,?)");
      for (var student in req.body.students) {
          studentSelectStatement.get(student, function(err, row) {
              if (err) {
                  return res.send({error: "enrollment could not happen"});
              } else if (!row) {
                  return res.send({error: "enrollment could not happen"});
              } else {
                req.app.locals.db.serialize(function() {
                  studentEnrollStatement.run(row.id, req.params.sessionID);
                })

              }
          })
      }
      studentSelectStatement.finalize();
      studentEnrollStatement.finalize();
      response["course_id"] = req.params.courseID;
      response["session_id"] = req.params.sessionID;
      req.app.locals.db.get("SELECT * FROM session_map WHERE session_id = ?", [req.params.sessionID], function(err, row) {
          if (err) {
              return res.send({error: "session enrollment failed"})
          }
          if (!row) {
              return res.send({error: "session enrollment failed"})
          } else {
              response["semester"] = row.semester;
              response["year"] = row.year;
              response["status"] = row.status;
          }
      });
      req.app.locals.db.each("SELECT * FROM instructor_map WHERE session_id = ?", [req.params.sessionID], function(err, row) {
          if (err) {
              return res.send({error: "session enrollment failed"})
          }
          if (!row) {
              return res.send({error: "session enrollment failed"})
          } else {
              response["instructors"].push(row.instructor_id);
          }
      });
      req.app.locals.db.each("SELECT * FROM session_enrollment WHERE session_id = ?", [req.params.sessionID], function(err, row) {
          if (err) {
              return res.send({error: "session enrollment failed"})
          }
          if (!row) {
              return res.send({error: "session enrollment failed"})
          } else {
              response["students"].push(row.student_id);
          }
      });
    })
    /*req.app.locals.db.serialize(function() {
        for (var student in req.body.students) {
            req.app.locals.db.get("SELECT * FROM id_map WHERE username = ?", [student], function(err, row) {
                if (err) {
                    return res.send({error: "session enrollment failed"})
                }
                if (!row) {
                    return res.send({error: "session enrollment failed"})
                } else {
                    var studentID = row.id;
                    req.app.locals.db.run("INSERT INTO session_enrollment (student_id, session_id) VALUES (?,?)", [studentID, req.params.sessionID]);
                }
            })
        }
        response["course_id"] = req.params.courseID;
        response["session_id"] = req.params.sessionID;
        req.app.locals.db.get("SELECT * FROM session_map WHERE session_id = ?", [req.params.sessionID], function(err, row) {
            if (err) {
                return res.send({error: "session enrollment failed"})
            }
            if (!row) {
                return res.send({error: "session enrollment failed"})
            } else {
                response["semester"] = row.semester;
                response["year"] = row.year;
                response["status"] = row.status;
            }
        });
        req.app.locals.db.each("SELECT * FROM instructor_map WHERE session_id = ?", [req.params.sessionID], function(err, row) {
            if (err) {
                return res.send({error: "session enrollment failed"})
            }
            if (!row) {
                return res.send({error: "session enrollment failed"})
            } else {
                response["instructors"].push(row.instructor_id);
            }
        });
        req.app.locals.db.each("SELECT * FROM session_enrollment WHERE session_id = ?", [req.params.sessionID], function(err, row) {
            if (err) {
                return res.send({error: "session enrollment failed"})
            }
            if (!row) {
                return res.send({error: "session enrollment failed"})
            } else {
                response["students"].push(row.student_id);
            }
        });
    });*/
    return res.send(response);
};
