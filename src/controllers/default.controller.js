const defaultRoute = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>DEFAULT 200</h1>");
  res.end();
};

module.exports = defaultRoute;
