const fs = require("fs");
const path = require("path");

const signUpRoute = async (request, response) => {
  if (request.method === "POST") {
    let body = "";
    await request.on("data", function(data) {
      body += data;
    });
    const userName = JSON.parse(body);

    if (
      !userName ||
      !userName.username ||
      !userName.password ||
      !userName.telephone ||
      !userName.email
    ) {
      response.writeHead(400, { "Content-Type": "text/plain" });
      response.write("Error: Invalid Request");
      response.end();
      return;
    }

    const filePath = path.join(
      __dirname,
      "../../",
      "db/",
      "users/",
      `${userName.username}.json`
    );
    fs.writeFile(filePath, body, err => {
      if (err) {
        throw err;
      }
      const userBody = {
        status: "success",
        user: JSON.parse(body)
      };
      response.writeHead(201, { "Content-Type": "application/json" });
      response.write(JSON.stringify(userBody));
      response.end();
    });
  }
};

module.exports = signUpRoute;
