const express = require('express')
require('express-async-errors')
const app = express()
const blogRouter = require('./controllers/blog')
const usersRouter = require('./controllers/users')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)

const url = config.MONGODB_URI

mongoose.connect(url)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.info('error connecting to MongoDB:', error.message)
    })

module.exports = app