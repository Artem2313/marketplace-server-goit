const products = require("../../db/products/all-products.json");
const findId = require("../products/sendProducts");
const path = require("path");
const findCategory = require("./category");
const findIds = require("./findIds");

const productsRoute = (req, res) => {
  const ids = products.map(el => el.id);
  const id = Number(path.basename(req.url));
  if (req.method === "GET" && req.url === "/products") {
    res.writeHead(201, { "Content-Type": "application/json" });
    res.write(JSON.stringify(products));
    res.end();
  } else if (req.method === "GET" && ids.includes(id)) {
    findId(req, res);
  } else if (req.method === "GET" && req.url.includes("category")) {
    findCategory(req, res);
  } else if (req.method === "GET" && req.url.includes("ids")) {
    findIds(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.write("404");
    res.end();
  };
};

module.exports = productsRoute;
