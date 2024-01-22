const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: "String",
  accountNo: "String",
  bankName: "String",
  address1: "String",
  address2: "String",
  city: "String",
  country: "String",
  zipCode: "String",
});

module.exports = mongoose.model("users", userSchema);