const url = require("url");

class DefaultController {
  static defaultRoute(req, res) {
    const resource = url.parse(req.url).pathname;

    res.statusCode = 404;
    res.end(`"${resource}" not found`);
  }

  static defaultMethod(req, res) {
    const resource = url.parse(req.url).pathname;
    const method = req.method;

    res.statusCode = 405;
    res.end(`Method "${method}" not allowed for "${resource}"`);
  }
}

module.exports = DefaultController;
