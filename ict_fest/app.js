const express = require('express')
const app = express()
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

//using flash session
const session = require('express-session')
const flash = require('connect-flash')


//mongodb connect

const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology: true })
  .then(() =>
    
      console.log(`Mongodb connected`)
  )
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
const indexRoutes = require('./routes/index.routes')
const userRoutes = require('./routes/user.routes')

app.use(indexRoutes)
app.use("/users",userRoutes)


module.exports = app