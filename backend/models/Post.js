const mongoose = require('mongoose')
let PostSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        author : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
)

module.exports = mongoose.model('Post' , PostSchema)