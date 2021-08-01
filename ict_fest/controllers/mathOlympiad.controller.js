//getRegisterMO,postRegisterMO,getListMO,deleteMO

const MathOlympiad = require("../models/MathOlympiad.model");
const getRegisterMO = (req, res) => {
  res.render("mathOlympiad/register.ejs", { message: req.flash("message")});
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
      req.flash("message",message)
      res.redirect("register");
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
            message = 'Participants has been registered succesfully'
            console.log(message)
            req.flash("message", message);
            res.redirect("register")
        })
        .catch(() => {
            message = "Participant not registered";
            console.log(message);
            req.flash("message", message);
            res.redirect("register");
        });
    }
  });
};

const getListMO = (req, res) => {
  res.render("mathOlympiad/list.ejs");
};

const deleteMO = (req, res) => {
  const id = req.params.id;

  console.log(id);
  res.render("mathOlympiad/list.ejs");
};

module.exports = { getRegisterMO, postRegisterMO, getListMO, deleteMO };
