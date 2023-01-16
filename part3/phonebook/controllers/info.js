const infoRouter = require('express').Router()
const People = require('../models/people')

infoRouter.get('/info', (request, response, next) => {
    People.find({}).then(people => {
        response.send(`<p>Phonebook has info for ${people.length} people</p><p>${new Date()}</p>`)
    }).catch(error => next(error))
})

module.exports = infoRouter