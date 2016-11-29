var express = require('express');
var router = express.Router();

/* List ALL Courses */
router.route('/courses')
  .get();

/* Create Course */
router.route('/courses')
  .post(function(req, res) {
      req.app.locals.db.get("INSERT INTO course_map (course_name, institution, department) VALUES (?,?,?)", [req.body.name, req.body.institution, req.body.department], function(err, row) {
          if (err) {
              return res.send({error: "new course could not be created"});
          }
          if (!row) {
              return res.send({error: "new course could not be created"});
          } else {
              var response = {}
              response["id"] = row.course_id;
              response["name"] = row.course_name;
              response["institution"] = row.institution;
              response["department"] = row.department;
              return res.send(response);
          }
      })
  });

/* Retrieve a Course */
router.route('/courses/:courseID')
  .get();


module.exports = router;
