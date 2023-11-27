const {verify} = require("jsonwebtoken");
const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    min: 3,
    max: 25,
  },
  lastName: {
    type: String,
    required: true,
    min: 3,
    max: 25,
  },
  matrikelNr: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    enum: ["Admin", "Moderator", "Student"],
    default: "Student",
  },
  verifyed: {
    type: Boolean,
    default: "false",
  },
});

const User = model("User", userSchema);

module.exports = User;
