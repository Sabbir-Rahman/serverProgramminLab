const getRegister = (req,res) => {
    res.sendFile("register.html", { root: "./views/templates/AdminLTE-master/pages/examples" })
}

const postRegister = (req,res) => {

}


const getLogin = (req,res) => {
    res.sendFile("login.html", { root: "./views/templates/AdminLTE-master/pages/examples" })
}

const getDashboard = (req,res) => {

    res.sendFile("index.html", { root: "./views/templates/AdminLTE-master" });    
}

const getLandingPage = (req,res) => {
    res.sendFile("landing.html", { root: "./views" });
}

module.exports = {
    getRegister,postRegister,getLogin,getDashboard,getLandingPage
}