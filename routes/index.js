var express = require('express');
var router = express.Router();
const indexController = require("../controllers/indexController")
/* GET home page. */
router.get("/show", indexController.showdata)
router.get("/add", indexController.viewAddData)

module.exports = router;
