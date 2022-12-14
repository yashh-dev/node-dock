const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true,"Post must have a title"]
    },
    body:{
        type: String,
        required: [true,"body must not be empty"]
    }
})

const Post = new mongoose.model('Post',postSchema);

module.exports = Post;