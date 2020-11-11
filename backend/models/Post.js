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
    // if (!c.comment_id) {
    //     this.comments.push(c)
    //     return this.save();
    // } else {
    //     const index = this.comments.findIndex ((comment) => {
    //         comment.id == c.comment_id
    //     })
    //     return index       
    // }
    
}


module.exports = mongoose.model('Post' , PostSchema)