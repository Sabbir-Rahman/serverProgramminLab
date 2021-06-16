const express = require('express')

const app = express()

const PORT = 5000

app.listen(PORT,(req,res)=>{
    console.log(`Server running on port ${PORT}`)
})

app.get('/',(req,res)=> {

    res.send(`Hello from port ${PORT}`)
})


