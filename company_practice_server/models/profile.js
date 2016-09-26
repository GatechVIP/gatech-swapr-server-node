var mongoose = require('../db/mongoose');

var Schema = mongoose.Schema;

var now = Date.now;

var ProfileSchema = new Schema({
    userId: { type: String, required: true},
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    Email: { type: String, required: true},
    Mobile: { type: String, required: true},
    address: {
        street_address: { type: String, required: false },
        city: { type: String, required: false },
        pincode: { type: String, required: false },
        state:  { type: String, required: false },
        country: { type: String, required: false }
    },
    created: { type: Date, default: now },
    modified: { type: Date, default: now }
});

var ProfileModel = mongoose.model('Profile', ProfileSchema);

module.exports = ProfileModel;
