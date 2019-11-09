const fs = require("fs");
const util = require("util");
const path = require("path");

const productsFolder = path.resolve(__dirname, "../", "db/products");
const productsFile = path.resolve(productsFolder, "all-products.json");
const usersFolder = path.resolve(__dirname, "../", "db/users");

class OrdersController {
  static checkProducts(req, res, next) {
    const readProductsFile = util.promisify(fs.readFile);

    const removeWrongProducts = allProducts => {
      const productIDsOnStock = allProducts.map(product => product.id);
      req.body.products = req.body.products.filter(product =>
        productIDsOnStock.includes(product)
      );
    };

    const sendError = err => {
      res.status(500);
      res.json({
        error: "Internal error!!!"
      });
    };

    readProductsFile(productsFile, "utf-8")
      .then(allProducts => {
        removeWrongProducts(JSON.parse(allProducts));
      })
      .then(() => {
        if (req.body.products.length === 0) {
          res.writeHead(400, "Error: invalid request", {
            "Content-Type": "application/json"
          });
          res.end(JSON.stringify({ status: "failed", order: null }));
        } else {
          next();
        }
      })
      .catch(sendError);
  }

  static createFolder(req, res, next) {
    const userFolder = path.resolve(usersFolder, req.body.user + "");
    const userOrdersFolder = path.resolve(userFolder, "orders");

    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder);
    }

    if (!fs.existsSync(userOrdersFolder)) {
      fs.mkdirSync(userOrdersFolder);
    }

    req.body.id = Math.floor(Math.random() * 100000000);
    req.orderFile = path.resolve(userOrdersFolder, req.body.id + ".json");

    next();
  }

  static createOrderJSON(req, res, next) {
    const writeOrderFile = util.promisify(fs.writeFile);

    const sendError = err => {
      res.status(500);
      res.json({
        error: "Internal error!!!"
      });
    };

    writeOrderFile(req.orderFile, JSON.stringify(req.body), "utf8")
      .then(() => next())
      .catch(sendError);
  }

  static sendOrderResponse(req, res, next) {
    res.writeHead(200, "OK", {
      "Content-Type": "application/json"
    });
    res.end(JSON.stringify({ status: "success", order: req.body }));
  }
}

module.exports = OrdersController;
