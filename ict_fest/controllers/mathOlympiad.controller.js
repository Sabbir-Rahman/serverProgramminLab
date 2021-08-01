//getRegisterMO,postRegisterMO,getListMO,deleteMO

const MathOlympiad = require("../models/MathOlympiad.model");
const getRegisterMO = (req, res) => {
  res.render("mathOlympiad/register.ejs", { message: req.flash("message") });
};

const postRegisterMO = (req, res) => {
  console.log(req.body);
  const { name, email, contact, institution, category, tshirt } = req.body;
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

  let message = "";

  MathOlympiad.findOne({ name: name, contact: contact }).then((participant) => {
    if (participant) {
      message = "Participant with this name and contact number already exist";
      console.log(message);
      req.flash("message", message);
      res.redirect("/math_olympiad/register");
    } else {
      const participant = new MathOlympiad({
        name,
        email,
        category,
        contact,
        institution,
        paid,
        total,
        selected,
        tshirt,
      });
      participant
        .save()
        .then(() => {
          message = "Participants has been registered succesfully";
          console.log(message);
          req.flash("message", message);
          res.redirect("/math_olympiad/register");
        })
        .catch(() => {
          message = "Participant not registered";
          console.log(message);
          req.flash("message", message);
          res.redirect("/math_olympiad/register");
        });
    }
  });
};

const getListMO = (req, res) => {
  let allParticipants = [];
  let message = "";
  MathOlympiad.find()
    .then((data) => {
      allParticipants = data;
      res.render("mathOlympiad/list.ejs", {
        message: req.flash("message"),
        participants: allParticipants,
      });
    })
    .catch(() => {
      message = "Failed to fetch data";
      res.render("mathOlympiad/list.ejs", {
        message: req.flash("message"),
        participants: allParticipants,
      });
    });
};

const deleteMO = (req, res) => {
  let message = "";
  const id = req.params.id;
  MathOlympiad.deleteOne({ _id: id }, (err) => {
    if (err) {
      message = "Failed to delete data";
      req.flash("message", message);
      res.redirect("/math_olympiad/list");
    } else {
      message = "Data has been deleted succesfully";
      req.flash("message", message);
      res.redirect("/math_olympiad/list");
    }
  });
};

const paymentDoneMO = (req, res) => {
  const id = req.params.id;

  MathOlympiad.findOne({ _id: id }).then((participant) => {
    const total = participant.total;
    MathOlympiad.findOneAndUpdate({ _id: id }, { paid: total }, (err) => {
      if (err) {
        let message = "Data Could not been updated";
        req.flash("message", message);
        res.redirect("/math_olympiad/list");
      } else {
        let message = "Payment complete succesfully";
        req.flash("message", message);
        res.redirect("/math_olympiad/list");
      }
    });
  });
};

const selectParticipantMO = (req, res) => {
  const id = req.params.id;

  MathOlympiad.findOne({ _id: id }).then((participant) => {
    
    MathOlympiad.findOneAndUpdate({ _id: id }, { selected: true }, (err) => {
      if (err) {
        let message = "Data Could not been updated";
        req.flash("message", message);
        res.redirect("/math_olympiad/list");
      } else {
        let message = "Participant selected succesfully";
        req.flash("message", message);
        res.redirect("/math_olympiad/list");
      }
    });
  });
};

module.exports = {
  getRegisterMO,
  postRegisterMO,
  getListMO,
  deleteMO,
  paymentDoneMO,
  selectParticipantMO
};
