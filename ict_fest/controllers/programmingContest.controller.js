//getRegisterPC,postRegisterPC,getListPC,deletePC
const { sendEmail, hashPassword } = require("./wrapper");
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
    team_member5_tshirt,
  } = req.body;
  const { id: _id } = req.params;

  const updatedPost = await ProgrammingContest.findByIdAndUpdate(
    _id,
    {
      team_name: team_name,
      institution: institution,
      team_lead_name: team_lead_name,
      team_lead_email: team_lead_email,
      team_lead_contact: team_lead_contact,
      team_lead_tshirt: team_lead_tshirt,
      team_member2_name: team_member2_name,
      team_member2_email: team_member2_email,
      team_member2_contact: team_member2_contact,
      team_member2_tshirt: team_member2_tshirt,
      team_member3_name: team_member3_name,
      team_member3_email : team_member3_email,
      team_member3_contact: team_member3_contact,
      team_member3_tshirt: team_member3_tshirt,
      team_member4_name: team_member4_name,
      team_member4_email: team_member4_email,
      team_member4_contact: team_member4_contact,
      team_member4_tshirt: team_member4_tshirt,
      team_member5_name: team_member5_name,
      team_member5_email: team_member5_email,
      team_member5_contact: team_member5_contact,
      team_member5_tshirt: team_member5_tshirt
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
    team_member5_tshirt,
  } = req.body;

  let registrationFee = 2000;

  const total = registrationFee;
  const paid = 0;
  const selected = false;

  let message = "";
  ProgrammingContest.findOne({
    team_lead_email: {
      $in: [team_lead_email, team_member2_email, team_member3_email],
    },
    team_member2_email: {
      $in: [team_lead_email, team_member2_email, team_member3_email],
    },
    team_member3_email: {
      $in: [team_lead_email, team_member2_email, team_member3_email],
    },
  }).then((participant) => {
    console.log(participant);
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
        selected,
      });
      participant
        .save()
        .then(object => {
          message = "Participants has been registered succesfully";
          const hashId = hashPassword(object.id);
          const subject = "Register for ICT fest";
          
          const text1 = `Hello,\n\n${team_lead_name}. Thanks for registering in ICT fest for programming contest.\nYour key is ${hashId} .\nDon't forget it`;
          sendEmail(team_lead_email, subject, text1);

          const text2 = `Hello,\n\n${team_member2_name}. Thanks for registering in ICT fest for programming contest.\nYour key is ${hashId} .\nDon't forget it`;
          sendEmail(team_member2_email, subject, text2);

          const text3 = `Hello,\n\n${team_member3_name}. Thanks for registering in ICT fest for programming contest.\nYour key is ${hashId} .\nDon't forget it`;
          sendEmail(team_member3_email, subject, text3);
          
          if (team_member4_email != ''){
            const text4 = `Hello,\n\n${team_member4_name}. Thanks for registering in ICT fest for programming contest.\nYour key is ${hashId} .\nDon't forget it`;
            sendEmail(team_member4_email, subject, text4);
          }

          if (team_member5_email != "") {
            const text5 = `Hello,\n\n${team_member5_name}. Thanks for registering in ICT fest for programming contest.\nYour key is ${hashId} .\nDon't forget it`;
            sendEmail(team_member5_email, subject, text5);
          }

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
  ProgrammingContest.findOne({ _id: id })
    .then((data) => {
      participant = data;
      message = "Data fetch success now edit participant";
      req.flash("participant", participant);
      req.flash("message", message);
      res.redirect("/programming_contest/edit_participant_form");
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
    ProgrammingContest.findOneAndUpdate(
      { _id: id },
      { selected: true },
      (err) => {
        if (err) {
          let message = "Data Could not been updated";
          req.flash("message", message);
          res.redirect("/programming_contest/list");
        } else {
          let message = "Participant selected succesfully";
          req.flash("message", message);
          res.redirect("/programming_contest/list");
        }
      }
    );
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
