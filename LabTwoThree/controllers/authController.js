const userSchema = require('../model/userModel')

const getRegister = (req,res) => {
    res.sendFile("register.html", { root: "./views/templates/AdminLTE-master/pages/examples" })
}

const postRegister = async (req,res) => {
    //fullname,email,pass,confpass
    const {fullname,email,password,confpassword} = req.body

    const newUser = {fullname:fullname, email:email,password:password}
    console.log(newUser)

    try{
        await new userSchema(newUser).save()
        console.log('New User created')
        res.status(201).json({newUser})
    } catch (error){
        res.status(409).json({message: error.message})
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