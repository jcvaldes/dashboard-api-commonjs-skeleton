const express = require("express");
const SignUpPostController = require("../controllers/users/SignUpPostController");
const UsersGetController = require("../controllers/users/UsersGetController");
const { ensureAuth } = require("../middlewares/ensureAuth");

const router = express.Router();
router.post("/signup", SignUpPostController.signUp);
router.get("/users", [ensureAuth], UsersGetController.getUsers);

module.exports = router;
