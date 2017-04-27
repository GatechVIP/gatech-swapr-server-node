var debug = require('debug')('courseController');
var models = require('../models');

module.exports.createCourse = function(req, res) {

  if (typeof req.body.name !== 'string' || isNaN(req.body.institute)) {
      return res.status(500).send({ 'error': 'unable to create new course' });
  }

  models.Course.create({
      "name": req.body.name,
      "InstituteId": req.body.institute,
      "institute": {
          "id": req.body.institute
      }
  }).then(function(created) {
      var result = {
          "id": created.id,
          "name": created.name,
          "InstituteId": created.InstituteId
      }
      return res.status(201).send(result);
  }).catch(function(error) {
      debug(error);
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
        debug(error);
        return res.status(404).send({ 'error': 'invalid course id' });
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
