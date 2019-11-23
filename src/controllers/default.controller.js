class DefaultController {
  static defaultRoute(req, res) {
    const resource = req.baseUrl + req.url;

    res.statusCode = 404;
    res.end(`Route "${resource}" not found`);
  }

  static defaultMethod(req, res) {
    const resource = req.baseUrl + req.url;
    const method = req.method;

    res.statusCode = 405;
    res.end(
      `Wrong route "${resource}" or \nmethod "${method}" not allowed for route "${resource}"`
    );
  }
}

module.exports = DefaultController;
