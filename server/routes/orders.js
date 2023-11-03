var express = require("express");
var router = express.Router();
var { mockOrders } = require("../DB/main");

/* POST create new order. */
router.post("/", function (req, res, next) {
  const orderItems = req.body.orderItems;
  if (!orderItems) {
    res.status(400).json({ message: "Order is missing" });
    next();
  }

  const totalCost = orderItems.reduce((accumulator, object) => {
    return accumulator + object.price * object.quantity;
  }, 0);

  const totalItems = orderItems.reduce((accumulator, object) => {
    return accumulator + object.quantity;
  }, 0);

  const newOrder = {
    orderItems,
    totalItems,
    totalCost,
  };

  mockOrders.push(newOrder);
  res.status(200).json(newOrder);
});

module.exports = router;
