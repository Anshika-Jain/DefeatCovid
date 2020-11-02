const { Schema } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoose = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  image: { type: String, required: true },
  blogs: [{ type: mongoose.Types.ObjectId, ref: "blog", required: true }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", userSchema);
