const { Schema, model } = require("mongoose");

//email validator
const validateEmail = function (email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};
// Schema to create a new User model

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Please enter your username"],
      trim: true,
      max_length: 30,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please enter your email"],
      validate: [validateEmail, "Please enter a valid email"],
      max_length: 50,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("user", userSchema);
module.exports = User;
