const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: Date.now },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Register", registerSchema);
