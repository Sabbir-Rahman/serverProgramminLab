const express = require("express");

const router = express.Router();


router.get('/', (req,res)=> {
    res.render('welcome.ejs')
})

router.get("/dashboard", (req, res) => {
  res.render("dashboard.ejs");
});

router.get('/login',(req,res)=> {
    res.render("users/login.ejs")
})

router.get('/register',(req,res)=> {
    res.render("users/register.ejs")
})

module.exports = router