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
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

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

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password
            })
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            window.localStorage.setItem('loggedUser', JSON.stringify(user))

        } catch{
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }

        console.log('logging in with', username, password)
    }

    const handleNewBlog = async (event) => {
        event.preventDefault()
        try{
            const response = await blogService.createBlog({
                title,
                url, 
                password
            })
            const newBlogs = blogs.concat(response)
            setBlogs(newBlogs)
            setErrorMessage(`a new blog ${title} by ${author} added`)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
            setUrl('')
            setTitle('')
            setAuthor('')
            console.log(response)
        } catch{
            console.log('error from new blog')
            setUrl('')
            setTitle('')
            setAuthor('')
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)
    }

    return (
        <div>
            <h1>blogs</h1>
            <Notification message={errorMessage}/>
            {!user && 
                <Togglable buttonLabel="Log In">
                    <LoginForm
                        username={username}
                        password={password}
                        handleUsernameChange={({target}) => setUsername(target.value)}
                        handlePasswordChange={({target}) => setPassword(target.value)}
                        handleLogin={handleLogin}
                    />
                </Togglable>
            }

            {user &&
                <div>
                    <p>{user.name} logged in <button onClick={handleLogout}>log out</button></p>
                    <Togglable buttonLabel="new blog">
                        <BlogForm 
                            onSubmit={handleNewBlog} title={title} author={author} url={url}  
                            handleTitleChange={({target}) => setTitle(target.value)} 
                            handleAuthorChange={({target}) => setAuthor(target.value)}
                            handleUrlChange={({target}) => setUrl(target.value)}/>
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