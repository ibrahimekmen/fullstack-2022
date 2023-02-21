const express = require('express')
const app = express()
const blogRouter = require('./controller/blog')
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app