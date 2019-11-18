const url = require("url");
const products = require("../../db/products/all-products.json");

const getId = url => {
  const lastIndex = url.lastIndexOf("/");
  if (lastIndex !== -1) {
    return url.substring(lastIndex + 1);
  }
};

const findProdById = (req, res) => {
  const parsedUrl = url.parse(req.url);
  const idFind = getId(parsedUrl.path);
  const idProd = products.filter(el => el.id === Number(idFind));
  const userBody = {
    status: "success",
    products: idProd
  };
  res.writeHead(201, { "Content-Type": "application/json" });
  res.write(JSON.stringify(userBody));
  res.end();
};

module.exports = findProdById;