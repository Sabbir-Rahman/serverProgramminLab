const express = require("express");
const {ensureAuthentication,addUserData} = require("../middlewares/authMiddlewire");

const router = express.Router();

router.get('/', (req,res)=> {
    res.render('welcome.ejs')
})

router.get("/dashboard",ensureAuthentication,addUserData, (req, res) => {
  res.render("dashboard.ejs",{user:req.user});
});



module.exports = router