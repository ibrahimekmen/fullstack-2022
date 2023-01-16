const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const personsRouter = require('./controllers/persons')
const infoRouter = require('./controllers/info')
const middleware = require('./utils/middleware')

const app = express()

app.use(express.static('build'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use('/api/persons', personsRouter)
app.use('/info', infoRouter)

morgan.token('sent-data', (request) => {
    const sentData = {
        'name': request.query.name,
        'number': request.query.number }
    return JSON.stringify(sentData)
})

app.use(morgan(':method :url :status :response-time :sent-data'))

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app