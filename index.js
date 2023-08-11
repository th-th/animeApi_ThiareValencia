const app = require("./app");
const PORT = 3000;

const main = () => {
  app.listen(PORT, () => {
    console.log("Server is running on port 3000");
  });
};

main();
