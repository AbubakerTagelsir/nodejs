const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

const app = express();

// handlebars middlewares

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);

app.set("view engine", "handlebars");

app.get("/about", (req, res, next) => {
  res.render("about");
});
app.get("/", (req, res, next) => {
  const title = "VidJot";
  res.render("index", {
    title: title
  });
});

app.listen(8000);
