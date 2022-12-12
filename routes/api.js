var express = require('express');
var router = express.Router();
const apiController = require("../controllers/apiController")
/* GET users listing. */
 
router.get("/parking", apiController.showdata)
router.post("/parking", apiController.actionAddData)
router.put("/parking/:id", apiController.editParking)
router.delete("/parking/:id", apiController.deleteParking)
router.post('/parking/search', apiController.searchData)

module.exports = router;
