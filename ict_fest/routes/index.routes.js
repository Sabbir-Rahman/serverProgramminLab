const express = require("express");

const router = express.Router();


router.get('/', (req,res)=> {
    res.send('App is running from index')
})

router.get("/dashboard", (req, res) => {
  res.render("dashboard.ejs");
});

module.exports = router