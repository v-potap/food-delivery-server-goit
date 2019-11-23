var express = require("express");

const ProductsController = require("../controllers/products.controller");
const DefaultController = require("../controllers/default.controller");

const productsRouter = express.Router();

productsRouter
  .get("/", ProductsController.getProductsByQuery)
  .get("/:id([1-9][0-9]{7})", ProductsController.getProductsByID)
  .put("/:id([1-9][0-9]{7})", ProductsController.updateProductByID)
  .get("*", DefaultController.defaultMethod);

module.exports = productsRouter;
