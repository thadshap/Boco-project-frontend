const fs = require("fs");

module.exports = {
  devServer: {
    https: {
      key: fs.readFileSync("./certs/clientBob.key"),
      cert: fs.readFileSync("./certs/bob.pem"),
    },
    public: "https://localhost:8080/",
  }
}
