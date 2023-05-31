const Product = require("../models/products");
exports.getproduct = (req, res, next) => {
  res.render("admin/addproduct", {
    path: "/admin/pp",
    pagetitle: "addproduct",
  });
};

exports.postproduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const products = new Product(title, imageUrl, description, price);
  products.save();
  res.redirect("/");
};

exports.showproduct = (req, res, next) => {
  Product.fetchall((filecontent) => {
    const parseddata = JSON.parse(filecontent);
    res.render("admin/products", {
      data: parseddata,
      path: "/",
      pagetitle: "shop",
    });
  });
};
