const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/:id", userController.getUserById); //true
router.put("update/:id", userController.updateUserProfile); //true
router.delete("kill/:id", userController.deleteUserProfile); //true
//!----------------------------------------------------------------
router.post("/balance/recharge", userController.rechargeBalance); //true
router.post("/trips/payment", userController.deductPayment); //true
router.get("/payments/:user_id", userController.getAllPaymentsByuser_id); //true
//!----------------------------------------------------------------

router.post("/addTrips", userController.addTrip); //true
router.get("/trips/all", userController.getAllTrips); //true
router.get("/trips/:user_id", userController.getTripsByUserId); //true id of trip
//!----------------------------------------------------------------

router.get("/stations/all", userController.getAllStations); //true
router.get("/lines/all", userController.getAllLines); //true
router.get("/lines/number", userController.getLinesByNumber);
//http://localhost:4040/api/v1/users/lines/number?line_number=102

module.exports = router;
