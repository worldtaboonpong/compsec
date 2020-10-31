const mongoose = require('mongoose')
let UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            maxlength:32
        },
        email: {
            type: String,
            required: true,
           unique: true,
        },
        password : String,
        role: {
            type: Number,
            default: 0
        }
    }
)

module.exports = mongoose.model('User' , UserSchema)