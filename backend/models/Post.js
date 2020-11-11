const mongoose = require('mongoose')
let PostSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        author : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comments : [
            {
                author: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref : 'User'
                } , 
                text : String,
                username : String
            }
        ]

        
    }
)

PostSchema.methods.comment = function(c) {
    this.comments.push(c);
    return this.save();  
}

PostSchema.methods.updatecomment = function(c) {
    for (var i in this.comments){
        if (this.comments[i]._id == c.comment_id){
            this.comments[i] = c
        }
    } 
    return this.save();
}

PostSchema.methods.removecomment = function(c) {
    for (var i in this.comments){
        if (this.comments[i]._id == c.comment_id){
            this.comments.splice(i,1)
        }
    } 
    return this.save();
}


module.exports = mongoose.model('Post' , PostSchema)