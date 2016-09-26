var express = require('express');
var router = express.Router();
var passport = require('../config/passport');
var orderController = require('../controllers/orderController');

router.route("/")
.get(/*passport.authenticate('bearer', { session : false }),*/ orderController.getAllOrders)
.post(/*passport.authenticate('bearer', { session : false }),*/ orderController.createOrder);


router.route("/:orderId")
.get(/*passport.authenticate('bearer', { session : false }),*/ orderController.getOrderById)
.put(/*passport.authenticate('bearer', { session : false }),*/ orderController.terminateOrder);

router.route("/user/:userId")
.get(/*passport.authenticate('bearer', { session : false }),*/ orderController.getOrdersByUserId);

router.route("/myOrder")
.get(passport.authenticate('bearer', { session : false }), orderController.getMyOrders);

module.exports = router;
