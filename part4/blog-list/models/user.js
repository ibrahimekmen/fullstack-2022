const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')
const uniqueValidator = require('mongoose-unique-validator')
const url = config.MONGODB_URI

mongoose.connect(url)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.info('error connecting to MongoDB:', error.message)
    })

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

const User = mongoose.model('User', userSchema)

module.exports = User