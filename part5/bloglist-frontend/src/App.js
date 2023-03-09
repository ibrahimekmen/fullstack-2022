import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    

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

    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)
    }

    if (user === null){
        return (
            <div>
                <Notification message={errorMessage}/>
                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)} />
                    </div>
                    <div>
                        password
                        <input type="password" value={password} name="Password" onChange={({target}) => setPassword(target.value)}/>
                    </div>
                    <button type="submit">login</button>
                </form>
            </div>
        )
    }

    return (
        <div>
            <h2>blogs</h2>
            <p>{user.name} logged in</p> <button onClick={handleLogout}>log out</button>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div> 
        
    )
}

export default App