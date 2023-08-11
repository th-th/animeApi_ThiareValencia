const express = require("express");
const app = express();
const animeRoutes = require("./routes/anime.routes");

app.use(express.json());

app.use("/api/v1/anime", animeRoutes);

module.exports = app;
