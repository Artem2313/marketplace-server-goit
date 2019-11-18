const products = require("../../db/products/all-products.json");
const qs = require("qs");

const findIds = (req, res) => {
  let arrObj = [];
  let userBody;
  const ids = qs.parse(req.url);
  const findIds = Object.values(ids)[0];
  const elemFirstIndex = findIds.indexOf("'");
  const elemLastIndex = findIds.lastIndexOf("'");
  const idsValue = findIds.slice(elemFirstIndex + 1, elemLastIndex).split(",");
  idsValue.map(el => {
    const findProduct = products.find(elem => elem.id === +el);
    if (findProduct) {
      const obj = {
        id: findProduct.id,
        sku: findProduct.sku,
        name: findProduct.name,
        description: findProduct.description
      };
      arrObj.push(obj);
    }
    if (arrObj) {
      userBody = {
        status: "success",
        products: arrObj
      };
    } else {
      userBody = {
        status: "no products",
        products: []
      };
    }
  });
  res.writeHead(201, { "Content-Type": "application/json" });
  res.write(JSON.stringify(userBody));
  res.end();
};

module.exports = findIds;