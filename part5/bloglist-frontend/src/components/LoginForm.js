import { useState } from "react"

const LoginForm = ({handleLogin}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = async (event) => {
        event.preventDefault()
        handleLogin({username, password})
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <div>
                    username
                    <input type="text" value={username} name="Username" onChange={event => setUsername(event.target.value)} />
                </div>
                <div>
                    password
                    <input type="password" value={password} name="Password" onChange={event => setPassword(event.target.value)}/>
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default LoginForm