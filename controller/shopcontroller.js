const Product = require("../models/products");
const Cart = require("../models/cart");
const user = require("../models/user");
const cartItem = require("../models/cart-item");

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
  req.user
    .getCart()
    .then((item) => {
      return item.getProducts();
    })
    .then((cart) => {
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cart,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  // Cart.getCart((cartitem) => {
  //   const cartfiles = [];
  //   Product.fetchall((products) => {
  //     for (item in products) {
  //       console.log(item, "item");
  //       const cartitemdata = cartitem.product.find((prod) => {
  //         return prod.id === products[item].id;
  //       });
  //       if (cartitemdata) {
  //         cartfiles.push({ data: products[item], qty: cartitemdata.qty });
  //       }
  //     }
  //     console.log(cartfiles);
  //     res.render("shop/cart", {
  //       path: "/cart",
  //       pageTitle: "Your Cart",
  //       products: cartfiles,
  //     });
  //   });
  // });
};

exports.posttocart = (req, res, next) => {
  const productid = req.body.productid;
  const newquantity = 1;

  let fetchedcart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedcart = cart;
      return cart.getProducts({ where: { id: productid } });
    })
    .then((prod) => {
      let product;
      if (prod.length > 0) {
        product = prod[0];
      }
      if (product) {
        //if product is present
        const oldquantity = product.cartItem.quantity;
        newquantity = oldquantity + 1;
        return product;
      }
      return Product.findByPk(productid); //for new product
    })
    .then((product) => {
      return fetchedcart.addProduct(product, {
        through: { quantity: newquantity },
      });
    })
    .then((prod) => {
      res.redirect("/cart");
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

exports.postcartdeleteproduct = (req, res, next) => {
  const id = req.body.productId;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: id } });
    })
    .then((prod) => {
      const product = prod[0];
      return product.cartItem.destroy();
    })
    .then(() => {
      res.redirect("/cart");
    });
};
