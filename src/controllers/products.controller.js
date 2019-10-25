const fs = require("fs");
const path = require("path");

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

  static getProductsByIDs(req, res) {
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
}

module.exports = ProductsController;
