const mongoose  =  require('mongoose')

//this is for replicating required
const requiredString = {
    type: String,
    required: true
}

const userSchema = mongoose.Schema({
    fullname: requiredString,
    email: requiredString,
    password: requiredString
})

module.exports = mongoose.model('User', userSchema)