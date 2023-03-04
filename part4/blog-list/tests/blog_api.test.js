const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('blogs have the identifying property id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
})
    

describe('adding a new blog', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(blog => blog.title)
        expect(titles).toContain('React patterns')
    })

    test('if likes property is missing likes is set to 0', async () => {
        const newBlog = {
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html"
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        blogsAtEnd.forEach(blog => {
            if(blog.title === newBlog.title){
                expect(blog.likes).toBe(0)
            } 
        })
    })

    test('if url or title is missing the response code will be 400', async () => {
        const newBlog = {
            author: "author",
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})


describe('deletion of a blog', () => {
    test('deletion of a blog returns 204 if the id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length -1)

        const titles = blogsAtEnd.map(blogs => blogs.titles)
        
        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('updating of a blog', () => {
    test('updating of a blog returns 204 if the id and the contents are valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const toBeUpdated = blogsAtStart[0]

        toBeUpdated.author = 'new author'

        await api
            .put(`/api/blogs/${toBeUpdated.id}`)
            .send(toBeUpdated)
            .expect(204)
        
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd.length).toBe(blogsAtStart.length)
    })
})
    

afterAll(async () => {
    await mongoose.connection.close()
})