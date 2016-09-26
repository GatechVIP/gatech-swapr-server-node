var log = require('../utils/log')(module);
var Order = require('../models/order');

module.exports.createOrder = function(req, res) {
  var order = new Order({
      userId: req.user._id,
      cost: req.body.cost,
      items: req.body.items
  });

  order.save(function(err) {
      if (!err) {
          log.info("Order created");
          return res.send({ status: 'OK', order: order });
      } else {
          if (err.name == 'ValidationError') {
              res.statusCode = 400;
              res.send({ error: 'ValidationError'});
          } else {
              res.statusCode = 500;
              res.send({ error: 'Server error' });
          }
      }
  });
};

module.exports.terminateOrder = function(req, res) {
  Order.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    Order.findById(req.params.id, function(err, post) {

      res.json(post);
    });
  });
};

module.exports.getMyOrders = function(req, res) {
    Order.findOne({ userId: req.user._id }, function(err, orders) {
      if (!orders) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
      if (!err) {
        return res.send(orders);
      } else {
        res.statusCode = 500;
        return res.send( { error: 'Server error' } );
      }
    });
};

module.exports.getOrdersByUserId = function(req, res) {
  Order.find({ userId: req.params.userId }, function(err, orders) {
    if (!orders) {
      res.statusCode = 404;
      return res.send({ error: 'Not found' });
    }
    if (!err) {
      return res.send(orders);
    } else {
      res.statusCode = 500;
      return res.send( { error: 'Server error' } );
    }
  });
};

module.exports.getOrderById = function(req, res) {
  Order.findOne({ _id: req.params.orderId }, function(err, order) {
    if (!order) {
      res.statusCode = 404;
      return res.send({ error: 'Not found' });
    }
    if (!err) {
      return res.send(order);
    } else {
      res.statusCode = 500;
      return res.send( { error: 'Server error' } );
    }
  });
};

module.exports.getAllOrders = function(req, res) {
  Order.find(function(err, orders) {
    if (!orders) {
      res.statusCode = 404;
      return res.send( { error: 'Not found' });
    }
    if (!err) {
      return res.send(orders);
    } else {
      res.statusCode = 500;
      return res.send( { error: 'Server error' } );
    }
  });
};
