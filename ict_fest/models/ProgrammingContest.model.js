const mongoose = require("mongoose");

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
  default: Date.now,
};

const PCSchema = mongoose.Schema({
  team_name: requiredString,
  institution: requiredString,
  team_lead_name: requiredString,
  team_lead_email: requiredString,
  team_lead_contact: requiredString,
  team_lead_tshirt: requiredString,
  team_member2_name: requiredString,
  team_member2_email: requiredString,
  team_member2_contact: requiredString,
  team_member2_tshirt: requiredString,
  team_member3_name: requiredString,
  team_member3_email: requiredString,
  team_member3_contact: requiredString,
  team_member3_tshirt: requiredString,
  team_member4_name: string,
  team_member4_email: string,
  team_member4_contact: string,
  team_member4_tshirt: string,
  team_member5_name: string,
  team_member5_email: string,
  team_member5_contact: string,
  team_member5_tshirt: string,
  total: requiredNumber,
  paid: requiredNumber,
  selected: Boolean,
  date: dateNow,
});

module.exports = mongoose.model("ProgrammingContest", PCSchema);
