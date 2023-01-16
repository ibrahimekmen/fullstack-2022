const personsRouter = require('express').Router()
const People = require('../models/people')


personsRouter.get('/', (request, response, next) => {
    People.find({}).then(people => {
        response.json(people)
    }).catch(error => next(error))
})

personsRouter.post('/', (request, response, next) => {
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

personsRouter.get('/:id', (request, response, next) => {
    const id = request.params.id
    People.findById(id).then(person => {
        if(person){
            response.json(person)
        }else{
            response.status(404).end()
        }
    }).catch(error => {next(error)})
})

personsRouter.put('/:id', (request, response, next) => {
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

personsRouter.delete('/:id', (request,response, next) => {
    const id = request.params.id
    response.send()
    People.findByIdAndRemove(id).then(() => {
        response.status(204).end()
    }).catch(error => next(error))
})

module.exports = personsRouter