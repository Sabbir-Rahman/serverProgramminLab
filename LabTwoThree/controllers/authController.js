const userSchema = require('../model/userModel')
const bcrypt = require('bcrypt')
const saltRounds = 10
const alert = require('alert');
var LocalStorage = require('node-localstorage').LocalStorage;
const { request } = require('express');
localStorage = new LocalStorage('./scratch');


const getRegister = (req,res) => {
    res.sendFile("register.html", { root: "./views/templates/AdminLTE-master/pages/examples" })
    
}

const postRegister = async (req,res) => {
    //fullname,email,pass,confpass
    const {fullname,email,password,confpassword} = req.body

    if(password === confpassword){

        if(String(password).length <8){
            alert('Password must be atleast 8 charecters')
            res.redirect('/register')
            //res.status(400).json({message: 'Password must be atleast 8 charecters'})
            
        }else {
            const hashPassword = bcrypt.hashSync(password, saltRounds);

            const newUser = {fullname:fullname, email:email,password:hashPassword}

            try{
                await new userSchema(newUser).save()
                localStorage.setItem('fullname',fullname)
                alert("User Add Succesfully")
                res.redirect('/dashboard')
                //res.status(201).json({message:'New user created', data:newUser}).redirect('/')
            } catch (error){
                res.status(409).json({message: error.message})
            }
    
        }
    }else{
        alert('Password and retype pass not match')
        res.redirect('register')
        //res.status(400).json({message: 'Password and conf pass not match'})
    }
    

    
}


const getLogin = (req,res) => {
    res.sendFile("login.html", { root: "./views/templates/AdminLTE-master/pages/examples" })
    
    
}

const postLogin = async (req,res) => {
    const {email, password} = req.body

    if(String(email).length>0){
        const user = await userSchema.findOne({
            email: email
        })
        if(user){
            passwordMatch = bcrypt.compareSync(password, user.password)
            if(passwordMatch){
                localStorage.setItem('fullname',user.fullname)
                alert("Login succesfull")
                res.redirect('/dashboard')
                
            }
            else{
                alert("Wrong Password")
                res.redirect('/login')
                //res.status(400).json({message: 'Password not match'})
            }
        } else{
            
            alert("No user with this email please register")
            res.redirect('/login')
            //res.status(400).json({message: 'No user exist with this email please signup'})
        }
    }else {
        
        alert("Please input email")
        res.redirect('/login')
        //res.status(400).json({message: 'Please input email'})
    }
    
    
    
}

const getDashboard = (req,res) => {

    res.sendFile("index.html", { root: "./views/templates/AdminLTE-master" });    
}

const getLandingPage = (req,res) => {
    res.sendFile("landing.html", { root: "./views" });
}

module.exports = {
    getRegister,postRegister,getLogin,getDashboard,getLandingPage,postLogin
}