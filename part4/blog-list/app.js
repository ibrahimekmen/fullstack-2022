const express = require('express')
require('express-async-errors')
const app = express()
const blogRouter = require('./controllers/blog')
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app