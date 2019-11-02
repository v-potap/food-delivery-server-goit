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
    const productIDs = qs.parse(url.parse(req.url).query)["ids"];
    const categoryIDs = qs.parse(url.parse(req.url).query)["category"];

    if (!specificRoute && !productIDs && !categoryIDs) {
      res.writeHead(400, "Error: invalid request", {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify({ status: "no products", products: [] }));
      return;
    }

    const products = productIDs
      ? productIDs.split(",")
      : specificRoute
      ? [specificRoute]
      : [];
    const categories = categoryIDs ? categoryIDs.split(",") : [];
    const allProducts = JSON.parse(fs.readFileSync(productsPath));

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
}

module.exports = ProductsController;
