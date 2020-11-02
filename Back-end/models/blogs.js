var mongoose = require("mongoose");

var BlogsSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  claps: { type: Number, required: true },
  creatorName: { type: String, required: true },
  creatorPhoto: { type: String, required: true },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = mongoose.model("blog", BlogsSchema);
