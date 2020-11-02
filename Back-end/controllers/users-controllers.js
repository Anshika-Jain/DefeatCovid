const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = require("../models/users");
const HttpError = require("../models/http-error");

//...................................................................
const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await userModel.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("some thing went wrong", 402));
  }

  if (existingUser)
    return next(new HttpError("user already exist please Sign In", 422));

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError("Could not Create your, please try again.", 500));
  }

  const createdUser = new userModel({
    name,
    email,
    password: hashedPassword,
    image: req.file.path,
    blogs: [],
  });
  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError("Signing up failed", 500));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(new HttpError("Signing up failed", 500));
  }

  res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email,
    userName: createdUser.name,
    image: createdUser.image,
    token: token,
  });
};
//...........................................................................
const signin = async (req, res, next) => {
  const { email, password } = req.body;

  let identifiedUser;
  try {
    identifiedUser = await userModel.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Login failed please try again later", 500));
  }

  if (!identifiedUser) {
    const error = new HttpError(
      "Colutd not identify user, credentials seem to be wrong",
      401
    );
    return next(error);
  }

  var isValidPassword = false;

  try {
    isValidPassword = await bcrypt.compare(password, identifiedUser.password);
  } catch (err) {
    return next(
      new HttpError(
        "Could not log you in, please check your credentials and try again",
        500
      )
    );
  }

  if (!isValidPassword) {
    console.log(isValidPassword);
    return next(
      new HttpError(
        "Could not log you in, please check your credentials and try again later",
        500
      )
    );
  }
  let token;
  try {
    token = await jwt.sign(
      { userId: identifiedUser.id, email: identifiedUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    return new HttpError("could not log you in, please try again ", 500);
  }
  res.json({
    userId: identifiedUser.id,
    userName: identifiedUser.name,
    email: identifiedUser.email,
    token: token,
    image: identifiedUser.image,
  });
};
//............................................................................

exports.signup = signup;
exports.signin = signin;
