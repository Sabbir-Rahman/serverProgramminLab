const express = require('express')

const router = express.Router()

const { getLogin, postLogin, getRegister, postRegister} = require('../controllers/users.controller')

router.route('/login').get(getLogin).post(postLogin)
router.route('/register').get(getRegister).post(postRegister)
router.get("/logout",(req,res)=>{
    req.logOut()
    res.redirect("/")
})

module.exports = router