const fs = require("fs");
const path = require("path");

module.exports = class cart {
  static addtocart(id, price) {
    const appjsp = path.dirname(require.main.filename);
    const p = path.join(appjsp, "data", "cart.json");
    //read the files
    fs.readFiles(p, (err, filecontent) => {
      let cart = { product: [], totalprice: 0 };
      if (!err) {
        cart = JSON.parse(filecontent);
      }
      //analyse the cart find exisiting product
      const existingproductindex = cart.findIndex((p) => {
        if (p.id === id) {
          return;
        }
      });
      const existingproduct = cart.product[existingproductindex];
      let updatedproduct;
      if (existingproduct) {
        //update the existing product
        updatedproduct = { ...existingproduct };
        updatedproduct.qty += 1;
        //update the cart product
        cart.product = { ...cart.product };
        cart.product[existingproductindex] = updatedproduct;
      } else {
        updatedproduct = { id: id, qty: 1 };
        cart.product = [...cart.product, updatedproduct];
      }
      cart.totalprice = cart.totalprice + +price;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
