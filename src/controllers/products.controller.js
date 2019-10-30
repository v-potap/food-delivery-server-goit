const fs = require("fs");
const path = require("path");
const url = require("url");
const qs = require("querystring");

class ProductsController {
  static getAllProducts(req, res) {
    const productsPath = path.join(
      __dirname,
      "../db/products",
      "all-products.json"
    );

    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    const readStream = fs.createReadStream(productsPath);

    readStream.pipe(res);
  }

  static getProductsByID(req, res) {
    const RouteHandlers = require("../handlers/route.handlers");
    const productsPath = path.join(
      __dirname,
      "../db/products",
      "all-products.json"
    );
    const route = url.parse(req.url).pathname;
    const specificRoute = RouteHandlers.getSpecificRoute(route);
    const ids = qs.parse(url.parse(req.url).query)["ids"];

    if (!specificRoute && !ids) {
      res.writeHead(400, "Error: invalid request", {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify({ status: "no products", products: [] }));
      return;
    }

    const products = ids ? ids.split(",") : [specificRoute];

    debugger;

    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    const readStream = fs.createReadStream(productsPath);

    readStream.pipe(res);
  }
}

module.exports = ProductsController;
