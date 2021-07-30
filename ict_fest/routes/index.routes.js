const express = require("express");
const ensureAuthentication = require("../middlewares/authMiddlewire");

const router = express.Router();
const ensureAuthenticated = require("../middlewares/authMiddlewire")

router.get('/', (req,res)=> {
    res.render('welcome.ejs')
})

router.get("/dashboard",ensureAuthentication, (req, res) => {
  res.render("dashboard.ejs");
});



module.exports = router