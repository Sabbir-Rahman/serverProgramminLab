//getRegisterPC,postRegisterPC,getListPC,deletePC

const ProgrammingContest = require("../models/ProgrammingContest.model");
const getRegisterPC = (req, res) => {
  res.render("programmingContest/register.ejs", {
    message: req.flash("message"),
  });
};

const getEditPC = (req, res) => {
  res.render("programmingContest/edit.ejs", {
    participant: req.flash("participant"),
    message: req.flash("message"),
  });
};

const postEditPC = async (req, res) => {
  let message = "";
  const { name, email, contact, institution, category, tshirt } = req.body;
  const { id: _id } = req.params;

  let registrationFee = 0;
  if (category == "school") {
    registrationFee = 250;
  } else if (category == "college") {
    registrationFee = 400;
  } else if (category == "university") {
    registrationFee = 500;
  }

  const total = registrationFee;
  const paid = 0;
  const selected = false;

  if (category) {
    const updatedPost = await MathOlympiad.findByIdAndUpdate(
      _id,
      {
        name: name,
        email: email,
        category: category,
        contact: contact,
        institution: institution,
        paid: paid,
        total: total,
        selected: selected,
        tshirt: tshirt,
      },
      { new: true }
    )
      .then(() => {
        message = "Participant edit Succesfull";
        req.flash("message", message);
        res.redirect("/dashboard");
      })
      .catch(() => {
        message = "Participant edit failed";
        req.flash("message", message);
        res.redirect("/dashboard");
      });
  } else {
    const updatedPost = await MathOlympiad.findByIdAndUpdate(
      _id,
      {
        name: name,
        email: email,
        contact: contact,
        institution: institution,
        paid: paid,
        total: total,
        selected: selected,
        tshirt: tshirt,
      },
      { new: true }
    )
      .then(() => {
        message = "Participant edit Succesfull";
        req.flash("message", message);
        res.redirect("/dashboard");
      })
      .catch(() => {
        message = "Participant edit failed";
        req.flash("message", message);
        res.redirect("/dashboard");
      });
  }
};

const postRegisterPC = (req, res) => {
  console.log(req.body);
  const {
    team_name,
    institution,
    team_lead_name,
    team_lead_email,
    team_lead_contact,
    team_lead_tshirt,
    team_member2_name,
    team_member2_email,
    team_member2_contact,
    team_member2_tshirt,
    team_member3_name,
    team_member3_email,
    team_member3_contact,
    team_member3_tshirt,
    team_member4_name,
    team_member4_email,
    team_member4_contact,
    team_member4_tshirt,
    team_member5_name,
    team_member5_email,
    team_member5_contact,
    team_member5_tshirt
  } = req.body;

  let registrationFee = 2000;

  const total = registrationFee;
  const paid = 0;
  const selected = false;

  let message = "";
  ProgrammingContest.findOne({
    team_lead_email: {
      $in: [team_lead_email, team_member2_email, team_member3_email]
    },
    team_member2_email: {
      $in: [team_lead_email, team_member2_email, team_member3_email]
    },
    team_member3_email: {
      $in: [team_lead_email, team_member2_email, team_member3_email]
    },
  }).then((participant) => {
    console.log(participant)
    if (participant) {
      message = "Participant with this email already exist";
      console.log(message);
      req.flash("message", message);
      res.redirect("/programming_contest/register");
    } else {
      const participant = new ProgrammingContest({
        team_name,
        institution,
        team_lead_name,
        team_lead_email,
        team_lead_contact,
        team_lead_tshirt,
        team_member2_name,
        team_member2_email,
        team_member2_contact,
        team_member2_tshirt,
        team_member3_name,
        team_member3_email,
        team_member3_contact,
        team_member3_tshirt,
        team_member4_name,
        team_member4_email,
        team_member4_contact,
        team_member4_tshirt,
        team_member5_name,
        team_member5_email,
        team_member5_contact,
        team_member5_tshirt,
        total,
        paid,
        selected
      });
      participant
        .save()
        .then(() => {
          message = "Participants has been registered succesfully";
          console.log(message);
          req.flash("message", message);
          res.redirect("/programming_contest/register");
        })
        .catch((err) => {
          message = "Participant not registered";
          console.log(err);
          req.flash("message", message);
          res.redirect("/programming_contest/register");
        });
    }
  });
};

const getListPC = (req, res) => {
  let allParticipants = [];
  let message = "";
  ProgrammingContest.find()
    .then((data) => {
      allParticipants = data;
      res.render("programmingContest/list.ejs", {
        message: req.flash("message"),
        participants: allParticipants,
      });
    })
    .catch(() => {
      message = "Failed to fetch data";
      res.render("programmingContest/list.ejs", {
        message: req.flash("message"),
        participants: allParticipants,
      });
    });
};

const editPC = (req, res) => {
  let participant = {};
  let message = "";
  const id = req.params.id;
  console.log(id);
  MathOlympiad.findOne({ _id: id })
    .then((data) => {
      participant = data;
      message = "Data fetch success now edit participant";
      req.flash("participant", participant);
      req.flash("message", message);
      res.redirect("/math_olympiad/edit_participant_form");
    })
    .catch((err) => {
      message = "Data fetch failed";
      req.flash("message", message);
      res.resnder("/dashboard");
      console.log(err);
    });
};

const deletePC = (req, res) => {
  let message = "";
  const id = req.params.id;
  ProgrammingContest.deleteOne({ _id: id }, (err) => {
    if (err) {
      message = "Failed to delete data";
      req.flash("message", message);
      res.redirect("/programming_contest/list");
    } else {
      message = "Data has been deleted succesfully";
      req.flash("message", message);
      res.redirect("/programming_contest/list");
    }
  });
};

const paymentDonePC = (req, res) => {
  const id = req.params.id;

  ProgrammingContest.findOne({ _id: id }).then((participant) => {
    const total = participant.total;
    ProgrammingContest.findOneAndUpdate({ _id: id }, { paid: total }, (err) => {
      if (err) {
        let message = "Data Could not been updated";
        req.flash("message", message);
        res.redirect("/programming_contest/list");
      } else {
        let message = "Payment complete succesfully";
        req.flash("message", message);
        res.redirect("/programming_contest/list");
      }
    });
  });
};

const selectParticipantPC = (req, res) => {
  const id = req.params.id;

  ProgrammingContest.findOne({ _id: id }).then((participant) => {
    ProgrammingContest.findOneAndUpdate({ _id: id }, { selected: true }, (err) => {
      if (err) {
        let message = "Data Could not been updated";
        req.flash("message", message);
        res.redirect("/programming_contest/list");
      } else {
        let message = "Participant selected succesfully";
        req.flash("message", message);
        res.redirect("/programming_contest/list");
      }
    });
  });
};

module.exports = {
  getRegisterPC,
  postRegisterPC,
  getListPC,
  deletePC,
  editPC,
  paymentDonePC,
  selectParticipantPC,
  getEditPC,
  postEditPC,
};
