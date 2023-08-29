const express = require("express");
const upload = require("../middleware/uploader");
const {
  newrestaurant,
  restaurantVerify,
  signin,
  logout,
  getAll,
  getOne,
  forgotPassword,
  resetpassword,
  resendEmailVerification,
  updaterestaurant,
  deleterestaurant,
} = require("../controllers/restaurantController");

const { isAdmin, userAuth } = require("../middleware/authmiddleware");
const router = express.Router();

router.post("/rest/signup", newrestaurant);

router.put("/rest/verify/:token", restaurantVerify);
router.post("/rest/signin", signin);
router.get("/rest/logout", userAuth, logout);
router.get("/rest/getall", getAll);
router.get("/rest/getone/:id", getOne);
router.put("/rest/update-user/:restaurantId", userAuth, updaterestaurant);
router.delete("/rest/delete-user/:userId", userAuth, deleterestaurant);
router.post("/rest/forgot-password", forgotPassword);
router.get("/rest/resend-email-verification", resendEmailVerification);
router.put("/rest/reset-password/:token", resetpassword);
// router.get("/rest/make",searchlocation)
module.exports = router;