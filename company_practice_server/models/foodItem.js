var mongoose = require('../db/mongoose');
var Schema = mongoose.Schema;

var FoodSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    picture: {type: String, required: true},
    categories: {type: [String], required: true}
});

var FoodModel = mongoose.model('Food', FoodSchema);
module.exports = FoodModel;
