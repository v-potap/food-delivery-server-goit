const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");

const productsRouter = require("./routers/products.router");
const usersRouter = require("./routers/users.router");
const ordersRouter = require("./routers/orders.router");
const DefaultController = require("./controllers/default.controller");

const errorHandler = require("./handlers/error.handlers");

const expressApp = express();

const staticPath = path.join(__dirname, "..", "db");

const startServer = port => {
  expressApp
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(morgan("dev"))
    .use(express.static(staticPath))
    .use("/products", productsRouter)
    .use("/users", usersRouter)
    .use("/orders", ordersRouter)
    .use("*", DefaultController.defaultRoute)
    .use(errorHandler);

  expressApp.listen(port);

  console.log(`Server is listening on ${port}`);
};

module.exports = startServer;
