const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
const passport = require('passport')

const getLogin = (req,res) => {
    res.render('users/login.ejs')
}

const postLogin = (req, res,next) => {
    const {email,password} = req.body
    passport.authenticate("local",{
        successRedirect:"/dashboard",
        failureRedirect: "/users/login",
        failureFlash: true,
    })
    (req,res,next)
};
const getRegister = (req, res) => {
    res.render('users/register.ejs', {errors:req.flash('errors')})
};
const postRegister = (req, res) => {
    const {name,email,password,confPassword} = req.body
    

    //Data validation
    const errors = []
    if (!name || ! email ||!password ||!confPassword){
        errors.push("All fields are required")
    }
    if (password !== confPassword){
        errors.push("Password and retype password must match")
    }
    if (password.length <6){
        errors.push("Password must be 6 charecters")
    }

    if(errors.length > 0){
        req.flash("errors", errors)
        res.redirect("/users/register");
    }
    else{
        //Create new user

        User.findOne({email:email}).then((user)=>{
            if(user){
                errors.push("User already exist with this email")
                req.flash("errors", errors)
                res.redirect("/users/register")
            }else{
                bcrypt.genSalt(10, (err,salt)=>{
                    if(err){
                        errors.push(err)
                        req.flash("errors", errors);
                        res.redirect("/users/register");
                    }else {
                        bcrypt.hash(password,salt,(err,hash)=>{
                            if(err){
                                errors.push(err);
                                req.flash("errors", errors);
                                res.redirect("/users/register");
                            }else {
                                const newUser = new User({
                                    name,email,password:hash
                                })

                                newUser
                                .save()
                                .then(()=> {
                                    res.redirect("/users/login")
                                }).catch(()=>{
                                    errors.push("Saving user to database failed");
                                    req.flash("errors", errors);
                                    res.redirect("/users/register");
                                })
                            }
                        })
                    }
                })
            }
        })
        // res.redirect("/users/login")
    }

};

module.exports = { getLogin, postLogin, getRegister, postRegister}