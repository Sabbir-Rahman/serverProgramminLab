let express = require('express');
let cookieParser = require('cookie-parser');
//setup express app
const app = express()
app.use(cookieParser())

var LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');
const alert = require('alert');



const isLoggedIn = (req,res,next) => {

    const user = localStorage.getItem("fullname")
    
    if (user){
        res.clearCookie(user);
        res.cookie("user", user);
        alert(`Welcome ${user}`)
        next()
    }else {
        alert('Please log in first')
        res.redirect('/')
    }
}

module.exports = isLoggedIn