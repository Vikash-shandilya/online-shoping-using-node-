const http = require("http");
const express = require("express");
const path = require("path");

const admindata = require("./router/admin");
const shopRouter = require("./router/shop");

//import sequalize from database.js
const sequelize = require("./utils/database");

const app = express();
app.set("view engine", "pug"); //statement tells Express to use the Pug template engine to generate the HTML output
app.set("views", __dirname + "/views"); //we can use app.set('views','views') if views is in same dir as this file
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", admindata.router);

app.use(shopRouter);

sequelize
  .sync()
  .then((result) => {
    app.listen(8001);
  })
  .catch((err) => {
    console.log(err);
  });
