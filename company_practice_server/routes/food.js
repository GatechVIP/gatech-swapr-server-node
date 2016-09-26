var express = require('express');
var router = express.Router();
var passport = require('../config/passport');
var foodController = require('../controllers/foodController');

router.route("/:id")
  .get(/*passport.authenticate('bearer', { session : false }),*/ foodController.getFoodDish);

router.route("/category/:category")
  .get(/*passport.authenticate('bearer', { session : false }),*/ foodController.getFoodByCategory);

module.exports = router;
