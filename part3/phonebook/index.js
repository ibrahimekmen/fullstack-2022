const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const People = require('./models/people')

const app = express()

app.use(express.static('build'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

morgan.token('sent-data', (request) => {
    const sentData = {
        'name': request.query.name,
        'number': request.query.number }
    return JSON.stringify(sentData)
})

app.use(morgan(':method :url :status :response-time :sent-data'))

app.get('/api/persons', (request, response, next) => {
    People.find({}).then(people => {
        response.json(people)
    }).catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    if(request.body.name && request.body.number){
        const newPerson =  new People({
            'name': request.body.name,
            'number': request.body.number
        })
        newPerson.save().then(savedPerson => {
            response.status(200).send(savedPerson)
        }).catch(error => next(error))
    }else{
        response.status(400).send({ error: 'undefined name or number' })
    }
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    People.findById(id).then(person => {
        if(person){
            response.json(person)
        }else{
            response.status(404).end()
        }
    }).catch(error => {next(error)})
})

app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    const body = request.body
    const newPerson = {
        name: body.name,
        number: body.number
    }
    People.findOneAndUpdate({ _id: id }, newPerson, { new: true, runValidators: true }).then(updatedPerson => {
        response.json(updatedPerson)
    }).catch(error => {next(error)})
})

app.get('/info', (request, response, next) => {
    People.find({}).then(people => {
        response.send(`<p>Phonebook has info for ${people.length} people</p><p>${new Date()}</p>`)
    }).catch(error => next(error))
})


app.delete('/api/persons/:id', (request,response, next) => {
    const id = request.params.id
    response.send()
    People.findByIdAndRemove(id).then(() => {
        response.status(204).end()
    }).catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)


const PORT = 3001
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})