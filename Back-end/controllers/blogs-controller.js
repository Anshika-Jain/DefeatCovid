const mongoose = require("mongoose");
const fs = require("fs");

const User = require("../models/users");
const BlogsModel = require("../models/blogs");
const HttpError = require("../models/http-error");

//...................................................................................
const getBlogs = async (req, res, next) => {
  let blogs = [];
  try {
    blogs = await BlogsModel.find();
  } catch (err) {
    return next(new HttpError("sorry could not find the blogs", 402));
  }
  if (!blogs && blogs.length === 0) {
    var error = new HttpError(
      "Sorry Required Url orr information Not Found !",
      404
    );
    return next(error);
  }
  res
    .status(201)
    .json({ blogs: blogs.map((blog) => blog.toObject({ getters: true })) });
};
//......................................................................................
const getBlogById = async (req, res, next) => {
  let blog;
  let blogId = req.params.blogId;
  try {
    blog = await BlogsModel.findById(blogId);
  } catch (err) {
    return next(new HttpError("Sorry something went wrong", 402));
  }
  if (!blog) {
    return next(new HttpError("Sorry required blog does not exist", 404));
  }
  res.status(201).json({ blog: blog.toObject({ getters: true }) });
};
//.......................................................................................
const updateLikeOnBlog = async (req, res, next) => {
  let blogId = req.params.blogId;
  let claps = req.body.claps;
  try {
    let blog = await BlogsModel.findById(blogId);
    blog.claps = claps;
    await blog.save();
  } catch (err) {
    return next(new HttpError("Operation failed", 402));
  }

  res.status(201).json({ message: "update successfull" });
};

//.......................................................................................
async function createBlog(req, res, next) {
  const { title, description, creatorName, creatorPhoto } = req.body;
  const creator = req.userData.userId;
  const createdBlog = new BlogsModel({
    title: title,
    description,
    claps: 0,
    creatorName,
    creatorPhoto,
    creator,
  });
  let user;

  try {
    user = await User.findById(creator);
  } catch (err) {
    return next(new HttpError("Creating place failed", 500));
  }
  if (!user) return next(new HttpError("Could not find the user", 404));
  let sess;
  try {
    sess = await mongoose.startSession();
    sess.startTransaction();
    await createdBlog.save({ session: sess });
    await user.blogs.push(createdBlog); //special operation done by mongoose to do behind the scene establish the connection
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(new HttpError("Failed to create place", 500));
  }

  res.status(201).json({ createdBlog: createdBlog });
}

//..........................................................................................
exports.getBlogs = getBlogs;
exports.getBlogById = getBlogById;
exports.createBlog = createBlog;
exports.updateLikeOnBlog = updateLikeOnBlog;
