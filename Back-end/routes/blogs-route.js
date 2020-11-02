const express = require("express");

const checkAuth = require("../middlewares/check-auth");
const blogControllers = require("../controllers/blogs-controller");

const router = express.Router();
router.get("/", blogControllers.getBlogs);
router.patch("/claps/:blogId", blogControllers.updateLikeOnBlog);
router.get("/read/:blogId", blogControllers.getBlogById);

router.use(checkAuth);
router.post("/createBlog", blogControllers.createBlog);

module.exports = router;
