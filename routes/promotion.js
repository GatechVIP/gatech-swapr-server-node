var express = require('express');
var router = express.Router();
var promotionController = require('../controllers/promotionController');

/* Promote User */
router.route('/promote')
  .post(promotionController.promoteUser);


module.exports = router;
