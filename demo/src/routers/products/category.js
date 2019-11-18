const products = require("../../db/products/all-products.json");
const qs = require("qs");

const findCategory = (req, res) => {
  let arrObj = [];
  let userBody;
  const find = qs.parse(req.url);

  products.filter(el => {
    const findValue = Object.values(find)[0];
    const elemFirstIndex = findValue.indexOf('"');
    const elemLastIndex = findValue.lastIndexOf('"');
    const categoryValue = findValue.slice(elemFirstIndex + 1, elemLastIndex);

    if (el.categories[0].includes(categoryValue)) {
      const obj = {
        id: el.id,
        sku: el.sku,
        name: el.name,
        description: el.description
      };
      arrObj.push(obj);
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

module.exports = findCategory;