const mongoose = require('mongoose')
const config = require('../util/config')
const logger = require('../util/logger')

const url = config.MONGODB_URI

mongoose.connect(url)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.info('error connecting to MongoDB:', error.message)
    })

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  
module.exports = mongoose.model('Blog', blogSchema)