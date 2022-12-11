var express = require('express');
var router = express.Router();
const indexController = require("../controllers/indexController")
/* GET home page. */

router.get('/', indexController.showdashboard);
router.get("/show", indexController.showdata)
router.get("/parking", indexController.viewAddData)
router.post("/parking", indexController.actionAddData)
router.post('/parking/search', indexController.searchData)
router.put("/parking", indexController.editParking)
router.delete("/parking/:id", indexController.deleteParking)

module.exports = router;
