const ensureAuthentication=(req,res,next)=>{
    if(req.isAuthenticated()){
        next()
    }else{
        req.flash("error","You don not have access")
        res.redirect("/users/login")
    }
}

const addUserData = (req,res,next) => {
    res.locals.req = req
    res.locals.res = res
    next()
}



module.exports = {ensureAuthentication, addUserData}