const fs = require("fs");
const util = require("util");
const path = require("path");

const productsFolder = path.resolve(__dirname, "../", "db/products");
const productsFile = path.resolve(productsFolder, "all-products.json");

class OrdersController {
  static checkProducts(req, res, next) {
    const readProductsFile = util.promisify(fs.readFile);

    const readProducts = () => {
      res.json({
        status: "success",
        user: userData
      });
    };

    const sendError = err => {
      res.status(500);
      res.json({
        error: "Internal error!!!"
      });
    };

    readProductsFile(productsFile, "utf-8")
      .then((err, req, res, products) => {
        next(err, req, res, products);
      })
      .catch(sendError);
  }

  static createFolder(products) {
    console.log("products", products);
    next();
  }

  static createOrderJSON(req, res, next) {}

  static sendOrderResponse(req, res, next) {}
}

module.exports = OrdersController;
