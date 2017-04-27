var express = require('express');
var router = express.Router();
var instituteController = require('../controllers/instituteController');

/* List ALL institutes */
router.route('/')
  .get(instituteController.getAllinstitutes);

/* Create institute */
router.route('/')
  .post(instituteController.createinstitute);

/* Retrieve a institute */
router.route('/:instituteID')
  .get(instituteController.getinstitute);

module.exports = router;
