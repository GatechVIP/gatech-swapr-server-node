var models = require('../db/models');
var logger = require('../util/logger');

module.exports.createCourse = function(req, res) {

  if (typeof req.body.name !== 'string' || isNaN(req.body.institute)) {
      return res.status(500).send({ 'error': 'unable to create new course' });
  }

  models.Course.create({
      "name": req.body.name,
      "institute_id": req.body.institute
  }).then(function(created) {
      var result = {
          "id": created.id,
          "name": created.name,
          "institute_id": created.institute_id
      };
      return res.status(201).send(result);
  }).catch(function(error) {
      logger.error(error);
      return res.status(500).send({ 'error': 'unable to create new course' });
  });
};

module.exports.getCourse = function(req, res) {
    if (isNaN(req.params.course_id)) {
        return res.status(400).send({ 'error': 'invalid course id' });
    }

    models.Course.findById(parseInt(req.params.course_id)).then(function(course) {
        var result = {
            "id": course.id,
            "name": course.name,
            "institute_id": course.institute_id
        };
        return res.send(result);
    }).catch(function(error) {
        return res.status(404).send({ 'error': 'invalid course id' });
    });
};

module.exports.getAllCourses = function(req, res) {

    models.Course.findAll().then(function(courses) {
        var courseList = courses.map(function(course) {
            return {
                "id": course.id,
                "name": course.name,
                "institute_id": course.institute_id
            }
        });
        return res.send(courseList);

    }).catch(function(error) {
        return res.status(400).send({ 'error': 'could not get all courses' });
    });
};
