const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'], // Restrict role to 'admin' or 'user'
      default: 'user', // Set default role to 'user'
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
);

module.exports = mongoose.model("User", userSchema);
