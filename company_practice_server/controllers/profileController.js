var log = require('../utils/log')(module);
var Profile = require('../models/profile');

/* GET profiles listing. */
module.exports.getProfiles =  function(req, res) {
    log.info("Get all Profiles");
   // console.log('token = ' + req.headers.authorization);
    console.log('user id = ' +req.user._id);

    Profile.find(function (err, profiles) {
        if (!err) {
            console.log("Got profiles");
            console.log(JSON.stringify(profiles));
            return res.send(profiles);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({error: 'Server error'});
        }
    });
};

/* Create a new profile. */
module.exports.createProfile =  function(req, res) {
    //console.log('token = ' + req.headers.authorization);
    console.log('user id = ' +req.user._id);
    console.log('user role = ' + req.user.role);
    console.log('request body = ' + JSON.stringify(req.body));

    var profile = new Profile({
        userId: req.user._id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        Email: req.user.username,
        Mobile: req.body.mobile,
        address: req.body.address
    });

    profile.save(function (err) {
        if (!err) {
            log.info("Profile created");
            return res.send({ status: 'OK', profile: profile });
        } else {
            console.log(err);
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
            log.error('Internal error(%d): %s',res.statusCode,err.message);
        }
    });
};

/* GET a profile with Id. */
module.exports.getProfile =  function(req, res) {
    //log.info("get profile for id : %s", req.params.id);
    console.log('user role = ' + req.user.role);
    console.log('user id = ' +req.user._id);

    Profile.findOne({userId: req.user._id}, function (err, profile) {
        if(!profile) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (!err) {
            console.log(profile);
            return res.send({ status: 'OK', profile: profile });
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });

};

/* Update a profile with id. */
module.exports.updateProfile =  function(req, res) {
    //log.info("Update the profile with id :%s", req.params.id);
    console.log('user role = ' + req.user.role);
    console.log("Request body contains : " + JSON.stringify(req.body));

    var query = {userId: req.user._id};


    Profile.findOne(query, function (err, profile) {
        if(!profile) {
            res.statusCode = 404;
            return res.send({ error: 'record not found' });
        }
        if(typeof req.body.firstName !== "undefined") {
            profile.firstName = req.body.firstName;
        }
        if(typeof req.body.lastName !== "undefined") {
            profile.lastName = req.body.lastName;
        }
        if(typeof req.body.Email !== "undefined") {
            profile.Email = req.body.Email;
        }
        if(typeof req.body.Mobile !== "undefined") {
            profile.Mobile = req.body.Mobile;
        }
        if(typeof req.body.address.street_address !== "undefined") {
          profile.address.street_address = req.body.address.street_address;
        }
        if(typeof req.body.address.city !== "undefined") {
          profile.address.city = req.body.address.city;
        }
        if(typeof req.body.address.pincode !== "undefined") {
          profile.address.pincode = req.body.address.pincode;
        }
        if(typeof req.body.address.state !== "undefined") {
          profile.address.state = req.body.address.state;
        }
        if(typeof req.body.address.country !== "undefined") {
          profile.address.country = req.body.address.country;
        }
        profile.modified = Date.now();

        profile.save(function (err) {
            if (!err) {
                log.info("Profile updated");
                return res.send({ status: 'OK', profile: profile });
            } else {
                console.log(err);
                if(err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
                log.error('Internal error(%d): %s',res.statusCode,err.message);
            }
        });
     });
};


/* Delete an order with Id. */
module.exports.deleteProfile =  function(req, res) {
    //log.info("Delete a profile with id : %s", req.params.id);
    console.log('user role = ' + req.user.role);
    //console.log('token = ' + req.headers.authorization);
    Profile.findOne({userId: req.user._id}, function (err, profile) {
        if(!profile) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        profile.remove(function (err) {
            if (!err) {
                console.log("profile removed");
                return res.send({ status: 'OK' });
            } else {
                res.statusCode = 500;
                log.error('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
        });
    });
};

module.exports.getProfileByID = function(req, res) {
  Profile.findOne({_id: req.params.id}, function(err, profile) {
    if (!profile) {
      res.statusCode = 404;
      return res.send({error: 'Not found'});
    }
    if (!err) {
      console.log(profile);
      return res.send(profile);
    } else {
      res.statusCode = 500;
      return res.send({error: 'Server error'});
    }
  });
};
