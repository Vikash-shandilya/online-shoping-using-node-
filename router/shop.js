const express = require("express");
const router = express.Router();

const shopcontroller = require("../controller/shopcontroller.js");
const errorshow = require("../controller/error");

router.get("/", shopcontroller.getIndex);
router.get("/products", shopcontroller.getProducts);

router.get("/products/:productid", shopcontroller.getproductid);

router.get("/cart", shopcontroller.getCart);

router.post("/cart", shopcontroller.posttocart);

router.post("/cartdeleteitem", shopcontroller.postcartdeleteproduct);

router.get("/orders", shopcontroller.getOrders);

router.get("/checkout", shopcontroller.getCheckout);

router.use("/", errorshow.showerror);

module.exports = router;
