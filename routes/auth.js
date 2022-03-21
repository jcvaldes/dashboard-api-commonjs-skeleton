const express = require("express");
const RefreshTokenPostController = require("../controllers/auth/RefreshTokenPostController");
const SignInPostController = require("../controllers/auth/SignInPostController");
const { ensureAuth } = require("../middlewares/ensureAuth");

const router = express.Router();
router.post("/signin", SignInPostController.signIn);
router.post(
  "/refresh-access-token",
  [ensureAuth],
  RefreshTokenPostController.refreshToken
);

module.exports = router;
