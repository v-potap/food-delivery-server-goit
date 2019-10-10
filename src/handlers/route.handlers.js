const DefaultRouter = require("../routers/default.router");
const ProductsRouter = require("../routers/products.router");
const UsersRouter = require("../routers/users.router");

class RouteHandlers {
  static getHandler(route, method) {
    const routes = { ...DefaultRouter, ...ProductsRouter, ...UsersRouter };
    const routeToProceed = routes[route];

    if (!routeToProceed) {
      return routes.default;
    } else {
      return routeToProceed[method] || routeToProceed.default;
    }
  }
}

module.exports = RouteHandlers;
