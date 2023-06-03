const Product = require("../models/products");
const Cart = require("../models/cart");
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
    res.render("admin/products", {
      data: filecontent,
      path: "/",
      pagetitle: "adminproduct",
    });
  });
};
exports.geteditproduct = (req, res, next) => {
  const productid = req.params.productid;
  Product.findbyid(productid, (productcontent) => {
    res.render("admin/editproduct", {
      product: productcontent,
      pagetitle: "edit product",
    });
  });
};

exports.posteditproduct = (req, res, next) => {
  const productid = req.body.productid;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;

  const updateproduct = new Product(
    title,
    imageUrl,
    description,
    price,
    productid
  );
  updateproduct.update(productid);
  res.redirect("/admin/products");
};

exports.deleteproduct = (req, res, next) => {
  const productid = req.params.productid;
  Product.delete(productid);
  res.redirect("/admin/products");
};
