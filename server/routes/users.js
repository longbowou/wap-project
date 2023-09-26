const  express = require('express');
const router = express.Router();
const userController = require("../Conttollers/userController")
/* GET users listing. */


router.post("/", userController.login)
module.exports = router;
