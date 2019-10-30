const ProductsController = require("../controllers/products.controller");
const DefaultController = require("../controllers/default.controller");

const ProductsRouter = {
  "/products": {
    GET: ProductsController.getAllProducts,
    default: DefaultController.defaultMethod
  },
  "/products/": {
    GET: ProductsController.getProductsByID,
    default: DefaultController.defaultMethod
  }
};

module.exports = ProductsRouter;
