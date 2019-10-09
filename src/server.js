const http = require('http');
const url = require('url');

const morgan = require('morgan');

const defaultRouter = require('./routers/default.router');
const productsRouter = require('./routers/products.router');
const usersRouter = require('./routers/users.router');

const paths = Object.entries(QuestionsRouter)
    .map(([ routeStr, handler ]) => {
        const [ method, url ] = routeStr.split(' ');
        return { method, url, handler };
    });

const logger = morgan('combined');

const startServer = port => {

  const server = http.createServer((request, response) => {

    // Get route from the request
    const parsedUrl = url.parse(request.url);

    // Get router function
    const func = router[parsedUrl.pathname] || router.default;

    logger(request, response, () => func(request, response));
  });

  server.listen(port);
};

module.exports = startServer;