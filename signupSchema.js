const mongoose = require('mongoose')

const signup_schema = new mongoose.Schema({
    email:String,
    password:String,
    name:String,
    number:Number,
    address:String
})

const signupModel = mongoose.model('signups',signup_schema)
module.exports = signupModel;
