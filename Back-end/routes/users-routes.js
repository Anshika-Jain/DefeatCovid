const express = require("express");

const fileUpload = require("../middlewares/file-upload");
const userControllers = require("../controllers/users-controllers");
const router = express.Router();

router.post("/signup", fileUpload.single("image"), userControllers.signup);

router.post("/signin", userControllers.signin);

module.exports = router;
