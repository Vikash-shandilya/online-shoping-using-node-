const express = require("express");
const router = express.Router();
const productcontroller = require("../controller/productcontroller");

router.get("/pp", productcontroller.getproduct); //getaddproduct

router.post("/ss", productcontroller.postproduct); //getpostproduct

router.get("/products", productcontroller.showproduct);

router.get("/editproduct/:productid", productcontroller.geteditproduct);

router.post("/productedited", productcontroller.posteditproduct);

router.post("/deleteproduct/:productid", productcontroller.deleteproduct);

exports.router = router;
