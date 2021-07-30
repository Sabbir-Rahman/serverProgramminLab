const getLogin = (req,res) => {
    res.render('users/login.ejs')
}

const postLogin = (req, res) => {
    console.log(req.body)
    const {email,password} = req.body
};
const getRegister = (req, res) => {
    res.render('users/register.ejs')
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
        console.log(errors)
        res.redirect("/users/register");
    }
    else{
        res.redirect("/users/login")
    }

};

module.exports = { getLogin, postLogin, getRegister, postRegister}