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
