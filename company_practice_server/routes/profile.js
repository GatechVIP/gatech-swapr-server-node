var express = require('express');
var router = express.Router();
var log = require('../utils/log')(module);
var profileController = require('../controllers/profileController');
//var authController = require('../controllers/authController');
var passport = require('../config/passport');

router.route('/profiles')
  .post(passport.authenticate('bearer', { session : false }), profileController.createProfile)
    .get(passport.authenticate('bearer', { session : false }), profileController.getProfiles);

router.route('/myProfile')
  .get(passport.authenticate('bearer', { session : false }), profileController.getProfile)
  .put(passport.authenticate('bearer', { session : false }), profileController.updateProfile)
  .delete(passport.authenticate('bearer', { session : false }), profileController.deleteProfile);

router.route('/profiles/:id')
  .get(passport.authenticate('bearer', { session : false }), profileController.getProfileByID);

module.exports = router;
