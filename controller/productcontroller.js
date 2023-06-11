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
  Product.create({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
  })
    .then((result) => {
      console.log(result);
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.showproduct = (req, res, next) => {
  Product.findAll()
    .then((filecontent) => {
      res.render("admin/products", {
        data: filecontent,
        path: "/",
        pagetitle: "adminproduct",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.geteditproduct = (req, res, next) => {
  const productid = req.params.productid;
  Product.findByPk(productid)
    .then((productcontent) => {
      res.render("admin/editproduct", {
        product: productcontent,
        pagetitle: "edit product",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.posteditproduct = (req, res, next) => {
  const productid = req.body.productid;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;

  Product.findByPk(productid)
    .then((product) => {
      (product.title = title),
        (product.imageUrl = imageUrl),
        (product.description = description),
        (product.price = price);
      return product.save();
    })
    .then((prod) => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteproduct = (req, res, next) => {
  const productid = req.params.productid;
  Product.findByPk(productid)
    .then((prod) => {
      return prod.destroy();
    })
    .then((prod) => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};
