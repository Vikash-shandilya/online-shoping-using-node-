const Product = require("../models/products");
const cart = require("../models/cart");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.findAll().then((parseddata) => {
    res.render("shop/productlist", {
      data: parseddata,
      pagetitle: "All Products",
      path: "/products",
    });
  });
};

exports.getproductid = (req, res, next) => {
  const productid = req.params.productid; //this productid is defined in router shop.js
  Product.findByPk(productid).then((productcontent) => {
    res.render("shop/productdetail", {
      product: productcontent,
      pagetitle: "Product detail",
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        data: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cartitem) => {
    const cartfiles = [];
    Product.fetchall((products) => {
      for (item in products) {
        console.log(item, "item");
        const cartitemdata = cartitem.product.find((prod) => {
          return prod.id === products[item].id;
        });
        if (cartitemdata) {
          cartfiles.push({ data: products[item], qty: cartitemdata.qty });
        }
      }
      console.log(cartfiles);
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartfiles,
      });
    });
  });
};

exports.posttocart = (req, res, next) => {
  const productid = req.body.productid;
  Product.findbyid(productid, (product) => {
    cart.addtocart(productid, product.price);
  });
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

exports.postcartdeleteproduct = (req, res, next) => {
  const id = req.body.productId;
  Product.findbyid(id, (product) => {
    Cart.delete(id, product.price);
    res.redirect("/cart");
  });
};
