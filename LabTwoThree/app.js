const express = require('express')
const app = express()

const dotenv = require('dotenv')
const mongoose = require('mongoose')

const authRoutes = require('./routers/authRoute')
dotenv.config()

const PORT = process.env.PORT
const CONNECTION_URL = process.env.CONNECTION_URL
app.use(express.static("public"))
app.use(authRoutes)


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Mongodb connected and Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false)







