// const mongoose = require("mongoose");
import mercury from "@mercury-js/core";
export const User = mercury.createModel("User",
  {
    userName: {
      type: "string",
      required: true,
    },
    // role: {
    //   type: "string",
    //   enum: ['admin', 'user'], // Restrict role to 'admin' or 'user'
    //   default: 'user', // Set default role to 'user'
    // },
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    password: {
      type: "string",
      required: true,
    },
  },
);

// module.exports = mongoose.model("User", userSchema);
