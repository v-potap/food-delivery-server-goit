const ProductsController = require("../controllers/products.controller");

const ProductsRouter = {
  "/products": { GET: ProductsController.getAllProducts }
};

module.exports = ProductsRouter;
