const mongoose = require('mongoose')
const post_schema = new mongoose.Schema({
    title:String,
    description:String,
    created_on: { type: Date, default: Date.now }
})



const postModel = mongoose.model('posts',post_schema)
module.exports = postModel;

