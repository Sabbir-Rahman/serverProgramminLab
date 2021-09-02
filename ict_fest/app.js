const express = require('express')
const app = express()
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const passport = require('passport')
const nodemailer = require('nodemailer')

//Passport Strategy
require('./config/passport')(passport)

//using flash session
const session = require('express-session')
const flash = require('connect-flash')

const email = require('./controllers/email.controller')


//mongodb connect

email.sendEmail('sabbirrahman42@iut-dhaka.edu','function test','This is called from function')

const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false,
  })
  .then(() => console.log(`Mongodb connected`))
  .catch((error) => console.log(error.message));

//Static resources
app.use(express.static("public"))
//View engine
app.set("view engine", "ejs")

//body parser
app.use(express.urlencoded({
    extended: false,
    
}))

//use flash and session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

const indexRoutes = require('./routes/index.routes')
const userRoutes = require('./routes/user.routes')
const moRoutes = require('./routes/mathOlympiad.routes')
const pcRoutes = require('./routes/programmingContest.routes')

app.use(indexRoutes)
app.use("/users",userRoutes)
app.use("/math_olympiad",moRoutes)
app.use("/programming_contest", pcRoutes)


module.exports = app