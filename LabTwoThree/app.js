const express = require('express')

const app = express()

const PORT = 5000



app.use(express.static("public"))
app.listen(PORT,(req,res)=>{
    console.log(`Server running on port ${PORT}`)
})

app.get('/',(req,res)=> {
    res.sendFile("landing.html", { root: "./views" });
})

app.get('/dashboard',(req,res)=> {
    res.sendFile("index.html", { root: "./views/templates/AdminLTE-master" });
})

app.get('/login',(req,res)=> {

    res.sendFile("login.html", { root: "./views/templates/AdminLTE-master/pages/examples" })
})

app.get('/register',(req,res)=>{
    res.sendFile("register.html", { root: "./views/templates/AdminLTE-master/pages/examples" })
})

app.get((req,res)=> {
    res.send('Page not found')
})

