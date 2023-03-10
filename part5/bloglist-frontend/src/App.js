import { useState, useEffect } from 'react'
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

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser')
        if(loggedUser){
            const user = JSON.parse(loggedUser)
            setUser(user)
            blogService.getAll().then(blogs =>
                setBlogs( blogs )
            )  
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
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }


    const addBlog = async (blogObject) => {
        try{
            blogService.setToken(user.token)
            const response = await blogService.createBlog(blogObject)
            setBlogs(blogs.concat(response))
            setMessage(`a new blog ${response.title} by ${response.author} added`, false)
            setTimeout(() => {
                setMessage(null)
            }, 5000)
            console.log(response)
        } catch{
            console.log('error from new blog')
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)
    }

    return (
        <div>
            <h1>blogs</h1>
            <Notification message={message}/>
            {!user && 
                <Togglable buttonLabel="Log In">
                    <LoginForm
                        handleLogin={handleLogin}
                    />
                </Togglable>
            }

            {user &&
                <div>
                    <p>{user.name} logged in <button onClick={handleLogout}>log out</button></p>
                    <Togglable buttonLabel="new blog">
                        <BlogForm 
                            createBlog={addBlog}/>
                    </Togglable>
                    {blogs.map(blog => 
                        <Blog key={blog.id} blog={blog} />
                    )}
                </div>
            }
        </div>
    )
}

export default App