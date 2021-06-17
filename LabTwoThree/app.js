const express = require('express')

const app = express()

const PORT = 5000



app.use(express.static("public"))
app.listen(PORT,(req,res)=>{
    console.log(`Server running on port ${PORT}`)
})

app.get('/',(req,res)=> {

    res.sendFile("login.html", { root: "./views/templates/AdminLTE-master/pages/examples" });
})


