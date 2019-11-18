const http = require("http");
const url = require("url");
const morgan = require("morgan");
const router = require("./routers/router");
const logger = morgan("combined");

const startServer = port => {
  const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    const func = router[parsedUrl.pathname] || router.default;
    logger(req, res, () => func(req, res));
  });

  server.listen(port);
};

module.exports = startServer;
