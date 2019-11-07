const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");

const RouteHandlers = require("./handlers/route.handlers");
const errorHandler = require("./handlers/error.handlers");

const expressApp = express();

const staticPath = path.join(__dirname, "..", "db");

const startServer = port => {
  expressApp
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(morgan("dev"))
    .use(express.static(staticPath))
    .use("/", RouteHandlers.enumarateHandlers)
    .use(errorHandler);

  expressApp.listen(port);

  console.log(`Server is listening on ${port}`);
};

module.exports = startServer;
