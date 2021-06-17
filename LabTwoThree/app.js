const express = require('express')

const app = express()

const PORT = 5000

app.use(express.static("public"))

const authRoutes = require('./routers/authRoute')

app.use(authRoutes)

app.listen(PORT,(req,res)=>{
    console.log(`Server running on port ${PORT}`)
})





