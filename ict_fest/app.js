const express = require('express')
const app = express()

//Static resources
app.use(express.static("public"))
//View engine
app.set("view engine", "ejs")

const indexRoutes = require('./routes/index.routes')
app.use(indexRoutes)


module.exports = app