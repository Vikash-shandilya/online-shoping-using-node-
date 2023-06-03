const fs = require("fs");
const path = require("path");

const Product = require("../models/products");

module.exports = class Cart {
  static addtocart(id, price) {
    const appjsp = path.dirname(require.main.filename);
    const p = path.join(appjsp, "data", "cart.json");

    fs.readFile(p, (err, filecontent) => {
      let cart = { product: [], totalprice: 0 };
      if (!err) {
        cart = JSON.parse(filecontent);
      }

      const existingProductIndex = cart.product.findIndex((p) => p.id === id);
      const existingProduct = cart.product[existingProductIndex];
      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        cart.product = [...cart.product];
        cart.product[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.product.push(updatedProduct);
      }

      cart.totalprice += +price;

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }
  static delete(id, price) {
    const appjsp = path.dirname(require.main.filename);
    const p = path.join(appjsp, "data", "cart.json");
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.product.find((prod) => prod.id === id);
      const productQty = product.qty;
      updatedCart.product = updatedCart.product.filter(
        (prod) => prod.id !== id
      );
      updatedCart.totalprice = updatedCart.totalprice - price * productQty;

      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }

  static getCart(cb) {
    const appjsp = path.dirname(require.main.filename);
    const p = path.join(appjsp, "data", "cart.json");
    fs.readFile(p, (err, filecontent) => {
      if (!err) {
        console.log(JSON.parse(filecontent));
        cb(JSON.parse(filecontent));
      } else {
        cb(null);
      }
    });
  }
};
