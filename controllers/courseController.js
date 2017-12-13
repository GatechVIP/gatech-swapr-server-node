var models = require('../db/models');
var logger = require('../util/logger');

//module.exports.createCourse = function(req, res) {
module.exports.createCourse = function(name, institute, callback) {
  //if (typeof req.body.name !== 'string' || isNaN(req.body.institute)) {
  if (typeof name !== 'string' || isNaN(institute)) {
      //return res.status(500).send({ 'error': 'unable to create new course' });
      return callback({'status': 500, 'message': 'unable to create new course'});
  }

  models.Course.create({
      //"name": req.body.name,
      "name": name,
      //"institute_id": req.body.institute
      "institute_id": institute
  }).then(function(created) {
      var result = {
          "id": created.id,
          "name": created.name,
          "institute_id": created.institute_id
      };
      //return res.status(201).send(result);
      return callback(null, result);
  }).catch(function(error) {
      logger.error(error);
      //return res.status(500).send({ 'error': 'unable to create new course' });
      return callback({'status': 500, 'message': 'unable to create new course'});
  });
};

//module.exports.getCourse = function(req, res) {
module.exports.getCourse = function(courseID, callback) {
    //if (isNaN(req.params.course_id)) {
    if (isNaN(courseID)) {
        //return res.status(400).send({ 'error': 'invalid course id' });
        return callback({'status': 400, 'message': 'invalid course id'});
    }

    //models.Course.findById(parseInt(req.params.course_id)).then(function(course) {
    models.Course.findById(parseInt(courseID)).then(function(course) {
        var result = {
            "id": course.id,
            "name": course.name,
            "institute_id": course.institute_id
        };
        //return res.send(result);
        return callback(null, result);
    }).catch(function(error) {
        logger.error(error);
        //return res.status(404).send({ 'error': 'invalid course id' });
        return callback({'status': 404, 'message': 'invalid course id'});
    });
};

//module.exports.getAllCourses = function(req, res) {
module.exports.getAllCourses = function(callback) {
    models.Course.findAll().then(function(courses) {
        var courseList = courses.map(function(course) {
            return {
                "id": course.id,
                "name": course.name,
                "institute_id": course.institute_id
            }
        });
        //return res.send(courseList);
        return callback(null, courseList);
    }).catch(function(error) {
        //return res.status(400).send({ 'error': 'could not get all courses' });
        return callback({'status': 400, 'message': 'could not get all courses'});
    });
};
