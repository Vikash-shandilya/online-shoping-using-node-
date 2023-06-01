const Product = require("../models/products");

exports.getProducts = (req, res, next) => {
  Product.fetchall((products) => {
    const parseddata = JSON.parse(products);
    res.render("shop/productlist", {
      data: parseddata,
      pagetitle: "All Products",
      path: "/products",
    });
  });
};

exports.getproductid = (req, res, next) => {
  const productid = req.params.productid; //this productid is defined in router shop.js
  Product.findbyid(productid, (productcontent) => {
    res.render("shop/productdetail", {
      product: productcontent,
      pagetitle: "Product detail",
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchall((products) => {
    const parseddata = JSON.parse(products);
    res.render("shop/index", {
      data: parseddata,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
  });
};

exports.posttocart = (req, res, next) => {
  const productid = req.body.productid;
  console.log(productid);
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
