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
            res.status(400).json({message: 'Password must be atleast 8 charecters'})
            
        }else {
            const hashPassword = bcrypt.hashSync(password, saltRounds);

            const newUser = {fullname:fullname, email:email,password:hashPassword}

            try{
                await new userSchema(newUser).save()
                localStorage.setItem('fullname',fullname)
                alert("User Add Succesfully")
                //res.status(201).json({message:'New user created', data:newUser}).redirect('/')
            } catch (error){
                res.status(409).json({message: error.message})
            }
    
        }
    }else{
        res.status(400).json({message: 'Password and conf pass not match'})
    }
    

    
}


const getLogin = (req,res) => {
    res.sendFile("login.html", { root: "./views/templates/AdminLTE-master/pages/examples" })
    
    
}

const postLogin = (req,res) => {
    console.log(req.body)
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