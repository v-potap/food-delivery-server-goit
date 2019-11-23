const fs = require("fs");
const path = require("path");
const url = require("url");
const qs = require("querystring");
const Product = require("../modules/db/schemas/product");

class ProductsController {
  static async getProductsByQuery(req, res) {
    const productIDs = qs.parse(url.parse(req.url).query)["ids"];
    const categoryIDs = qs.parse(url.parse(req.url).query)["category"];

    const products = productIDs ? productIDs.replace(/\"/g, "").split(",") : [];
    const categories = categoryIDs
      ? categoryIDs.replace(/\"/g, "").split(",")
      : [];

    let filteredProducts = [];
    let criteria = {};

    if (products.length > 0) {
      criteria._id = { $in: products };
    }

    if (categories.length > 0) {
      criteria.categories = { $in: categories };
    }

    if (criteria._id && criteria.categories) {
      criteria = {
        $and: [{ _id: criteria._id }, { categories: criteria.categories }]
      };
    }

    filteredProducts = await Product.find(criteria);

    if (filteredProducts.length > 0) {
      res.writeHead(200, "OK", {
        "Content-Type": "application/json"
      });
      res.end(
        JSON.stringify({ status: "success", products: filteredProducts })
      );
    } else {
      res.writeHead(400, "Error: invalid request", {
        "Content-Type": "application/json"
      });
      res.end(
        JSON.stringify({ status: "no products", products: filteredProducts })
      );
    }
  }

  static async getProductsByID(req, res) {
    const route = url.parse(req.url).pathname;
    const productID = Number.parseInt(route.slice(1));
    const product = await Product.findOne({ _id: productID });

    if (product) {
      res.writeHead(200, "OK", {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify({ status: "success", products: [product] }));
    } else {
      res.writeHead(400, "Error: invalid request", {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify({ status: "no products", products: [] }));
    }
  }
}

module.exports = ProductsController;
