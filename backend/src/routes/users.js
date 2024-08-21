const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserControllers");
router.post("/signup", userController.registerUser);
router.post("/login", userController.loginUser);
router.post(
  "/verify/email/:email/:token",
  userController.handleVerifyUserToken
);
router.post("/verify/resend/:email", userController.handleRefreshVerifyToken);
router.get("/verify/status/:email", userController.getIsUserVerified);
router.post("/reset/password/:token", userController.handleVerifyForgetToken);
router.post("/reset/email/:email", userController.handleSendForgetToken);
//Route for token refresh
router.get("/refresh", userController.handleRefreshToken);

router.get("/logout", userController.logoutUser);
module.exports = router;
