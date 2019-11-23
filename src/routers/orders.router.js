var express = require("express");

const OrdersController = require("../controllers/orders.controller");
const DefaultController = require("../controllers/default.controller");

const ordersRouter = express.Router();

ordersRouter
  .post("/", OrdersController.createOrder)
  .get("/:id", OrdersController.getOrdersByID)
  .get("*", DefaultController.defaultMethod);

module.exports = ordersRouter;
