//getRegisterMO,postRegisterMO,getListMO,deleteMO

const MathOlympiad = require("../models/MathOlympiad.model");
const getRegisterMO = (req, res) => {
  res.render("mathOlympiad/register.ejs", { message: req.flash("message") });
};

const getEditMO = (req, res) => {
  res.render("mathOlympiad/edit.ejs", {
    participant: req.flash("participant"),
    message: req.flash("message"),
  });
};

const postEditMO = async (req, res) => {
  let message = "";
  const participant = req.body;
  const {id:_id} = req.params

  const updatedPost = await MathOlympiad.findByIdAndUpdate(
    _id,
    { ...participant, _id },
    { new: true }
  );
  
  if (updatedPost){
    message = "Participant edit Succesfull";
    req.flash("message", message);
    res.redirect("/dashboard");
  } else {
    message = "Participant edit failed";
    req.flash("message", message);
    res.redirect("/dashboard");
  }
  
};
  // res.render("mathOlympiad/edit.ejs");


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

const editMO = (req, res) => {
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
  editMO,
  paymentDoneMO,
  selectParticipantMO,
  getEditMO,
  postEditMO,
};
