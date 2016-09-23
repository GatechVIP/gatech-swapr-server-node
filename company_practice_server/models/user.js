var mongoose = require('../db/mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt        = require("jsonwebtoken");

var Schema = mongoose.Schema;

// Define our user schema
var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: false,
        default: "customer"
    },
    facebook_id: {
        type: String,
        required: false
    },
    facebook_token: {
      type: String,
      required: false
    },
    twitter_id: {
        type: String,
        required: false
    }
});

// Execute before each user.save() call
UserSchema.pre('save', function(callback) {
    var user = this;

    // Break out if the password hasn't changed
    if (!user.isModified('password')) return callback();

    // Password changed so we need to hash it
    bcrypt.genSalt(5, function(err, salt) {
        if (err) return callback(err);

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return callback(err);
            user.password = hash;
            user.token = jwt.sign(user, "app_secret");
            callback();
        });
    });
});

UserSchema.methods.verifyPassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
