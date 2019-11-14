const fs = require("fs");
const path = require("path");
const url = require("url");
const qs = require("querystring");
const Product = require("../modules/db/schemas/product");

class ProductsController {
  static async getProductsByQuery(req, res) {
    const productsPath = path.join(
      __dirname,
      "../db/products",
      "all-products.json"
    );

    const productIDs = qs.parse(url.parse(req.url).query)["ids"];
    const categoryIDs = qs.parse(url.parse(req.url).query)["category"];

    const products = productIDs ? productIDs.split(",") : [];
    const categories = categoryIDs ? categoryIDs.split(",") : [];

    const sendProducts = products => {
      if (products.length > 0) {
        res.writeHead(200, "OK", {
          "Content-Type": "application/json"
        });
        res.end(JSON.stringify({ status: "success", products }));
      } else {
        res.writeHead(400, "Error: invalid request", {
          "Content-Type": "application/json"
        });
        res.end(JSON.stringify({ status: "no products", products: [] }));
      }
    };

    const sendNoProducts = error => {
      const errMessage = error ? error.message : "Error: invalid request";
      res.writeHead(400, errMessage, {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify({ status: "no products", products: [] }));
    };

    const options = {};

    if (products.length > 0) {
      options._id = { $in: products };
    }

    if (categories.length > 0) {
      options.categories = { $in: categories };
    }

    await Product.find()
      .then(sendProducts)
      .catch(sendNoProducts);
  }

  static getProductsByID(req, res) {
    const productsPath = path.join(
      __dirname,
      "../db/products",
      "all-products.json"
    );
    const route = url.parse(req.url).pathname;
    const productID = Number.parseInt(route.slice(1));
    const allProducts = JSON.parse(fs.readFileSync(productsPath));
    const products = allProducts.filter(product => product.id === productID);

    if (products.length > 0) {
      res.writeHead(200, "OK", {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify({ status: "success", products }));
    } else {
      res.writeHead(400, "Error: invalid request", {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify({ status: "no products", products }));
    }
  }
}

module.exports = ProductsController;
