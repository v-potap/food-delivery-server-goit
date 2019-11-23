var express = require("express");

const DefaultController = require("../controllers/default.controller");

const defaultRouter = express.Router();

defaultRouter
  .get("*", DefaultController.defaultRoute);

module.exports = defaultRouter;
