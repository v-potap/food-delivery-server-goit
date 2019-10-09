const ProductsController = require("../controllers/products.controller");

const ProductsRouter = {
  "GET /products": ProductsController.getAllProducts,
};

module.exports = ProductsRouter;
