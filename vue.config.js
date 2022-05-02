const fs = require("fs");

module.exports = {
  devServer: {
<<<<<<< HEAD
    /*https: {
      key: fs.readFileSync("./certs/localhost+1-key.pem"),
      cert: fs.readFileSync("./certs/localhost+1.pem"),
    },*/
    public: "http://localhost:8080/",
=======
    https: {
      key: fs.readFileSync("./certs/clientBob.key"),
      cert: fs.readFileSync("./certs/bob.pem"),
    },
    public: "https://localhost:8080/",
>>>>>>> 5123624083864fa565d469c36ef81c45bbaa90df
  }
}
