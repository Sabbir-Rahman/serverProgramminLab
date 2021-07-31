const mongoose = require('mongoose')

//this is for replicating required
const string = {
  type: String,
};

const requiredString = {
  type: String,
  required: true,
};

const requiredNumber = {
  type: Number,
  required: true,
};

const requiredUniqueString = {
  type: String,
  required: true,
  unique: true,
};

const dateNow = {
    type: Date,
    default:Date.now,
}

const MOSchema = mongoose.Schema({
  name: requiredString,
  category: requiredString,
  contact: requiredString,
  email: string,
  institution: requiredString,
  total: requiredNumber,
  paid: requiredNumber,
  selected: Boolean,
  tshirt: requiredString,
  date: dateNow


});

module.exports = mongoose.model("MathOlympiad", MOSchema);
