const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')

blogRouter.get('/', async(request, response) => {   
    const blogs = await Blog.find({}).populate("user", {username: 1, name: 1})
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
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id){
        return response.status(401).json({error: 'token invalid'})
    }

    const user = await User.findById(decodedToken.id)
    if(!body.title || !body.url){
        response.status(400).send('Bad Request')
    }else{
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            user: user.id
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
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
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id){
        return response.status(401).json({error: 'token invalid'})
    }
    
    const userRemoving = await User.findById(decodedToken.id)
    const id = request.params.id
    const blogToRemove = await Blog.findById(id)

    if(!blogToRemove){
        return response.status(404).send('Not Found')
    }

    if(blogToRemove.user.toString() !== userRemoving.id.toString()){
        return response.status(401).json({error: 'unauthorized to remove this post'})
    }
    
    // deleting the blog from the user's blogs
    const blogToRemoveId = userRemoving.blogs.indexOf(id)
    userRemoving.blogs.splice(blogToRemoveId, 1)
    await userRemoving.save()

    const responseMongoDb = await Blog.findByIdAndRemove(id)
    if(responseMongoDb){
        response.status(204).end()
    }else{
        response.status(404).send('Not Found')
    }
})

module.exports = blogRouter
