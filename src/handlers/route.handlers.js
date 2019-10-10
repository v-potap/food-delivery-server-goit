const DefaultRouter = require("../routers/default.router");
const ProductsRouter = require("../routers/products.router");
const UsersRouter = require("../routers/users.router");

class RouteHandlers {
  static getHandler(route, method) {
    const routes = DefaultRouter;
    const { r } = { ProductsRouter, UsersRouter };

    return routes.default;
  }
}

module.exports = RouteHandlers;
