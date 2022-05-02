const fs = require("fs");

module.exports = {
  devServer: {
    /*https: {
      key: fs.readFileSync("./certs/localhost+1-key.pem"),
      cert: fs.readFileSync("./certs/localhost+1.pem"),
    },*/
    public: "http://localhost:8080/",
  }
}