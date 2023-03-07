const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9]*$/.test(v)
            },
            message: props => `${props.value} is not a valid username!`
        }
    },
    name: String,
    passwordHash: {
        type: String,
        required: true,
        minLength: 3
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        } 
    ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id,
        delete returnedObject.__v,
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)