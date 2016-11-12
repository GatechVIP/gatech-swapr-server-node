var express = require('express');
var router = express.Router();

/* retrieve assignment metadata for a course */
router.route('/getUrlToGrade/?assignment=:assignment_id')   // not sure if this is a valid way to do this
  .get();

module.exports = router;
