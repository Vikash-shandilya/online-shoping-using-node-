const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
//es6 syntax
const uniqueId = uuidv4();

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = uuidv4();
  }
  save() {
    const appjsp = path.dirname(require.main.filename);
    const p = path.join(appjsp, "data", "saaman.json");
    let products = [];

    if (fs.existsSync(p)) {
      fs.readFile(p, (err, filecontent) => {
        if (!err) {
          try {
            products = JSON.parse(filecontent);
          } catch (parseError) {
            console.log("Error parsing JSON:", parseError);
            return;
          }
        }
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          if (err) {
            console.log("Error writing file:", err);
          }
        });
      });
    } else {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err) {
          console.log("Error writing file:", err);
        }
      });
    }
  }

  static fetchall(cb) {
    const appjsp = path.dirname(require.main.filename);
    const p = path.join(appjsp, "data", "saaman.json");
    console.log(p);
    fs.readFile(p, (err, filecontent) => {
      if (err) {
        console.log("here");
        cb("[]");
      } else {
        cb(filecontent.toString());
      }
    });
  }

  static findbyid(id, cb) {
    const appjsp = path.dirname(require.main.filename);
    const p = path.join(appjsp, "data", "saaman.json");

    fs.readFile(p, (err, filecontent) => {
      if (err) {
        console.log(err);
      } else {
        const product = JSON.parse(filecontent);
        const productcontent = product.find((p) => {
          return p.id === id;
        });
        cb(productcontent);
      }
    });
  }
};
