var models = require('../db/models');
var logger = require('../util/logger');

module.exports.createCourse = function(name, institute, callback) {
  if (typeof name !== 'string' || isNaN(institute)) {
      return callback({'status': 500, 'message': 'unable to create new course'});
  }

  models.Course.create({
      "name": name,
      "institute_id": institute
  }).then(function(created) {
      var result = {
          "id": created.id,
          "name": created.name,
          "institute_id": created.institute_id
      };
      return callback(null, result);
  }).catch(function(error) {
      logger.error(error);
      return callback({'status': 500, 'message': 'unable to create new course'});
  });
};

module.exports.getCourse = function(courseID, callback) {
    if (isNaN(courseID)) {
        return callback({'status': 400, 'message': 'invalid course id'});
    }

    models.Course.findById(parseInt(courseID)).then(function(course) {
        var result = {
            "id": course.id,
            "name": course.name,
            "institute_id": course.institute_id
        };
        return callback(null, result);
    }).catch(function(error) {
        logger.error(error);
        return callback({'status': 404, 'message': 'invalid course id'});
    });
};

module.exports.getAllCourses = function(callback) {
    models.Course.findAll().then(function(courses) {
        var courseList = courses.map(function(course) {
            return {
                "id": course.id,
                "name": course.name,
                "institute_id": course.institute_id
            }
        });
        return callback(null, courseList);
    }).catch(function(error) {
        return callback({'status': 400, 'message': 'could not get all courses'});
    });
};
