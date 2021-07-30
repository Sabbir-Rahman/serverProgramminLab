const express = require('express')
const app = express()

//Static resources
app.use(express.static("public"))
//View engine
app.set("view engine", "ejs")

//body parser
app.use(express.urlencoded({
    extended: false
}))

const indexRoutes = require('./routes/index.routes')
const userRoutes = require('./routes/user.routes')

app.use(indexRoutes)
app.use("/users",userRoutes)


module.exports = app