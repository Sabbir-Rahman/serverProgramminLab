const mongoose = require("mongoose");

//this is for replicating required
const requiredString = {
  type: String,
  required: true,
};

const requiredUniqueString = {
  type: String,
  required: true,
  unique: true,
};

const date = {
    type: Date,
    default:Date.now,
}

const userSchema = mongoose.Schema({
  name: requiredString,
  email: requiredUniqueString,
  password: requiredString,
  date:date,
});

module.exports = mongoose.model("User", userSchema);
