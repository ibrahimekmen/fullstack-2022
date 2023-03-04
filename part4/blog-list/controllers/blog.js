const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogRouter.get('/', async(request, response) => {   
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.get('/:id', async(request, response) => {   
    const id = request.params.id
    const blog = await Blog.findById(id)
    if(blog){
        response.json(blog)
    }else{
        response.status(404).send('Not Found')
    }
})

blogRouter.post('/', async(request, response) => {
    const body = request.body
    if(!body.title || !body.url){
        response.status(400).send('Bad Request')
    }else{
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0
        })

        const savedBlog = await blog.save()
        response.status(201).json(savedBlog) 
    }    
})

blogRouter.put('/:id', async(request, response) => {
    const id = request.params.id
    const body = request.body
    if(!body.title || !body.url){
        response.status(400).send('Bad Request')
    }else{
        const blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0
        }
        const updatedBlog = await Blog.findOneAndUpdate({ _id: id }, blog, {new: true})
        response.status(204).json(updatedBlog)
    }
})

blogRouter.delete('/:id', async(request, response) => {
    const id = request.params.id
    const responseMongoDb = await Blog.findByIdAndRemove(id)
    if(responseMongoDb){
        response.status(204).end()
    }else{
        response.status(404).send('Not Found')
    }
})

module.exports = blogRouter
