var log = require('../utils/log')(module);
var Food = require('../models/foodItem');

module.exports.getFoodDish = function(req, res) {
  Food.findOne({_id: req.params.id}, function(err, foodItem) {
    if (!foodItem) {
      res.statusCode = 404;
      return res.send({error: 'Not found'});
    }
    if (!err) {
      console.log(foodItem);
      return res.send(foodItem);
    } else {
      res.statusCode = 500;
      return res.send({error: 'Server error'});
    }
  });
};

module.exports.getFoodByCategory = function(req, res) {
  Food.find({categories: req.params.category}, function(err, items) {
    if (!items) {
      res.statusCode = 404;
      return res.send({error: 'Not found'});
    }
    if (!err) {
      return res.send(items);
    } else {
      res.statusCode = 500;
      return res.send({error: 'Server error'});
    }
  });
};
