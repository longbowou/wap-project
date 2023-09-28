const express = require('express');
const options = {
    "caseSensitive": false,
    "strict": false
};
const router = express.Router();
const productController = require("../Conttollers/productsController")
/* GET users listing. */

router.get("/", productController.getProduct);
router.post("/", productController.placeOrder);
module.exports = router;
