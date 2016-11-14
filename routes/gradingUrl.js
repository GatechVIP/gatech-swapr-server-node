var express = require('express');
var router = express.Router();
var controller = require('../controllers/gradingUrlController');

/* retrieve assignment metadata for a course */
router.route('/getUrlToGrade')
  .get(controller.getURL);

module.exports = router;
