const express = require("express");

const DefaultRouter = require("../routers/default.router");
const ProductsRouter = require("../routers/products.router");
const UsersRouter = require("../routers/users.router");

// const routes = { ...ProductsRouter, ...UsersRouter };
const routes = { ...DefaultRouter, ...ProductsRouter, ...UsersRouter };
const apiRoutes = express.Router();

class RouteHandlers {
  static getHandler(route, method) {
    const routeToProceed = routes[route];

    if (!routeToProceed) {
      return routes.default;
    } else {
      return routeToProceed[method] || routeToProceed.default;
    }
  }

  static enumarateHandlers() {
    Object.entries(routes).forEach(route => {
      Object.entries(route[1]).forEach(methodHandler => {
        if (apiRoutes[methodHandler[0].toLowerCase()]) {
          apiRoutes[methodHandler[0].toLowerCase()](route[0], methodHandler[1]);
        }
      });
    });
    apiRoutes.get("*", routes.default);
  }
}

module.exports = RouteHandlers;
