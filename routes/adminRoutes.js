const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();

router.get("/users", adminController.getAllUsers); //true
//!----------------------------------------------------------------
router.post("/stations", adminController.addStation); //true
router.put("/stations/:id", adminController.editStation); //true
router.delete("/stations/:id", adminController.deleteStation); //true
router.get("/stations", adminController.getAllStations); //true
//!----------------------------------------------------------------
router.post("/lines", adminController.addLine); //true
router.put("/lines/:id", adminController.editLine); //true
router.delete("/lines/:id", adminController.deleteLine); //true
router.get("/lines", adminController.getAllLines); //true
//!---------------------------------------------------------------
router.get("/sumPayments", adminController.getSumOfPayments); //true

module.exports = router;
