var mongoose = require('../db/mongoose');
var Schema = mongoose.Schema;
var now = Date.now;

var OrderSchema = new Schema({
    userId: { type: String, required: true},
    dateMade: { type: Date, required: true, default: now },
    isSatisfied: { type: Boolean, required: true, default: false},
    cost: { type: Number, required: true},
    items: { type: Array, required: true}
});

var OrderModel = mongoose.model('Order', OrderSchema);
module.exports = OrderModel;
