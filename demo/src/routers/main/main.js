const fs = require("fs");
const path = require("path");

const mainRoute = (request, response) => {
  const filePath = path.join(__dirname, "../../../", "assets", "pizza.jpg");
  fs.stat(filePath, err => {
    if (err) {
      throw err;
    }
    response.writeHead(200, {
      "Content-Type": "image/jpeg"
    });
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(response);
  });
};

module.exports = mainRoute;
