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

  static getBaseRoute(route) {
    const baseRouteEndPoint = route.indexOf("/", 1);

    if (baseRouteEndPoint == -1) {
      return route;
    } else {
      return route.slice(0, baseRouteEndPoint + 1);
    }
  }

  static getSpecificRoute(route) {
    const baseRouteEndPoint = route.indexOf("/", 1);

    if (baseRouteEndPoint == -1) {
      return undefined;
    } else {
      return route.slice(baseRouteEndPoint + 1) === ""
        ? undefined
        : route.slice(baseRouteEndPoint + 1);
    }
  }
}

module.exports = RouteHandlers;
