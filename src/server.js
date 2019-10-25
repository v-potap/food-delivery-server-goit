const http = require("http");
const url = require("url");

const morgan = require("morgan");

const RouteHandlers = require("./handlers/route.handlers");

const logger = morgan("combined");

const startServer = port => {
  const server = http.createServer((req, res) => {
    // Get route from the request
    const route = url.parse(req.url).pathname;

debugger

    // Get router function
    const func = RouteHandlers.getHandler(route, req.method);

    logger(req, res, () => func(req, res));
  });

  server.listen(port);

  console.log(`Server is listening on ${port}`);
};

module.exports = startServer;
