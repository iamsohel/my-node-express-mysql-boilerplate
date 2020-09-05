const logger = require("./libs/logger");
const express = require("express");
const app = express();

require("./startup/logging");
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/config")();
require("./startup/prod")(app);

const port = process.env.PORT || 3001;
const server = app.listen(port, () =>
  logger.log(`Listening on port ${port}...`)
);

// print unhandled promise rejections
process.on("unhandledRejection", (error) => {
  // use logger so it is on one line in cloudwatch (easier to track visually)
  logger.error("mishandledRejection", error.message, error.stack);
});

module.exports = server;
