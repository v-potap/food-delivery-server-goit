const url = require("url");

const Order = require("../modules/db/schemas/order");
const OrdersValidators = require("../handlers/orders.validators");

class OrdersController {
  static async createOrder(req, res) {
    const order = req.body;
    const err = OrdersValidators.validateNewOrder(order);

    if (err) {
      res.writeHead(err.errCode, err.response.status, {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify(err.response));
      return;
    }

    const newOrder = await Order.create(order);

    const responseSuccess = {
      status: "success",
      order: newOrder
    };

    res.writeHead(201, {
      "Content-Type": "application/json"
    });

    res.end(JSON.stringify(responseSuccess));
  }

  static async getOrdersByID(req, res) {
    const route = url.parse(req.url).pathname;
    const orderID = route.slice(1);

    try {
      const order = await Order.findById(orderID);

      const responseSuccess = {
        status: "success",
        order
      };

      res.writeHead(201, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify(responseSuccess));
    } catch (err) {
      res.writeHead(400, "Invalid request", {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify(err.message));
      return;
    }
  }
}

module.exports = OrdersController;
