const  express = require('express');
const options = {
    "caseSensitive": false,
    "strict": false
};
const router = express.Router();
const userController = require("../Conttollers/productsController")
/* GET users listing. */

router.get("/", userController.getProduct);
module.exports = router;
