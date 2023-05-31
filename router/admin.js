const express = require("express");
const router = express.Router();
const productcontroller = require("../controller/productcontroller");

router.get("/pp", productcontroller.getproduct); //getaddproduct

router.post("/ss", productcontroller.postproduct); //getpostproduct

router.get("/products", productcontroller.showproduct);

exports.router = router;
