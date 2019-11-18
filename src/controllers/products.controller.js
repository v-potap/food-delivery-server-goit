const fs = require("fs");
const path = require("path");
const url = require("url");
const qs = require("querystring");
const Product = require("../modules/db/schemas/product");

class ProductsController {
  static async getProductsByQuery(req, res) {
    const productIDs = qs.parse(url.parse(req.url).query)["ids"];
    const categoryIDs = qs.parse(url.parse(req.url).query)["category"];

    const products = productIDs ? productIDs.split(",") : [];
    const categories = categoryIDs ? categoryIDs.split(",") : [];

    const allProducts = await Product.find()

    debugger;

    let filteredProducts = [];

    if (products.length > 0) {
      filteredProducts = allProducts.filter(product =>
        products.includes(product.id + "")
      );
    } else {
      filteredProducts = [...allProducts];
    }

    if (categories.length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        const productsOfCategory = product.categories.filter(category =>
          categories.includes(category)
        );
        return productsOfCategory.length > 0;
      });
    }

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
