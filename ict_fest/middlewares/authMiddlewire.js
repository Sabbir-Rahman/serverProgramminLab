const ensureAuthentication=(req,res,next)=>{
    if(req.isAuthenticated()){
        next()
    }else{
        req.flash("error","You don not have access")
        res.redirect("/users/login")
    }
}

module.exports = ensureAuthentication