import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)

    const blogFormRef = useRef()

    const blogComparator = (a,b) => {
        if(a.likes < b.likes){
            return 1
        }else if(a.likes > b.likes){
            return -1
        }
        return 0    
    }

    const sortBlogs = (blogsToSort) => {
        const sortedBlogs = blogsToSort.sort(blogComparator)
        setBlogs(sortedBlogs)
    }

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser')
        if(loggedUser){
            const user = JSON.parse(loggedUser)
            setUser(user)
            blogService.getAll().then(blogs =>{
                const sortedBlogs = [...blogs].sort(blogComparator)
                setBlogs(sortedBlogs)
            })
        }
    }, [])

    const handleLogin = async (userObject) => {
        try {
            const user = await loginService.login(userObject)
            blogService.setToken(user.token)
            setUser(user)
            window.localStorage.setItem('loggedUser', JSON.stringify(user))

        } catch{
            setMessage('Wrong credentials')
            setError(true)
            setTimeout(() => {
                setMessage(null)
                setError(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)
    }

    const addBlog = async (blogObject) => {
        console.log("blog to be added", blogObject)
        try{
            const token = JSON.parse(window.localStorage.getItem('loggedUser')).token
            blogService.setToken(token)
            const response = await blogService.createBlog(blogObject)
            const newBlogs = blogs.concat(response)
            sortBlogs(newBlogs)
            setMessage(`a new blog ${response.title} by ${response.author} added`)
            setError(false)
            blogFormRef.current.toggleVisibility()
            setTimeout(() => {
                setMessage(null)
                setError(null)
            }, 5000)
            console.log("addBlog response ", response)
        } catch{
            console.log('error from new blog')
        }
    }

    const handleLikeBlog = async (likedBlog) => {
        const token = JSON.parse(window.localStorage.getItem('loggedUser')).token
        blogService.setToken(token)
        const changedBlog = await blogService.likeBlog(likedBlog)
        const newBlogs = [...blogs]
        const changedBlogIndex = newBlogs.map(blog => blog.id).indexOf(changedBlog.id)
        newBlogs[changedBlogIndex] = changedBlog
        sortBlogs(newBlogs)
    }

    const handleRemoveBlog = async (blogToRemove) => {
        const user = JSON.parse(window.localStorage.getItem('loggedUser'))
        blogService.setToken(user.token)
        await blogService.removeBlog(blogToRemove)
        setBlogs(blogs.filter(blog => blog.id !== blogToRemove.id))
    }

    return (
        <div>
            <h1>blogs</h1>
            <Notification message={message} error={error}/>
            {!user && 
                <Togglable buttonLabel="Log In">
                    <LoginForm handleLogin={handleLogin}/>
                </Togglable>
            }

            {user &&
                <div>
                    <p>{user.name} logged in <button onClick={handleLogout}>log out</button></p>
                    <Togglable buttonLabel="new blog" ref={blogFormRef}>
                        <BlogForm createBlog={addBlog}/>
                    </Togglable>
                    {blogs.map(blog => 
                        <Blog key={blog.id} blog={blog} name={user.name} likeBlog={handleLikeBlog} removeBlog={handleRemoveBlog}/>
                    )}
                </div>
            }
        </div>
    )
}

export default App