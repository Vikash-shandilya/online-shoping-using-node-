const http = require("http");
const express = require("express");
const path = require("path");

const admindata = require("./router/admin");
const shopRouter = require("./router/shop");

//import my models

const products = require("./models/products");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

//import sequalize from database.js
const sequelize = require("./utils/database");

const app = express();
app.set("view engine", "pug"); //statement tells Express to use the Pug template engine to generate the HTML output
app.set("views", __dirname + "/views"); //we can use app.set('views','views') if views is in same dir as this file
app.use(express.urlencoded({ extended: true })); //used for parsing the data
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", admindata.router);

app.use(shopRouter);

products.belongsTo(User, { constraint: true, onDelete: "CASCADE" }); //user created this product
User.hasMany(products); //ONE USER HAS MANY PRODUCT
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(products, { through: CartItem });
products.belongsToMany(Cart, { through: CartItem });

sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "vikash", email: "vikashjha041@gmail.com" });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then((cart) => {
    app.listen(8001);
  })
  .catch((err) => {
    console.log(err);
  });
