import { useState } from 'react'
import PropTypes from 'prop-types'
const LoginForm = ({ handleLogin }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = async (event) => {
        event.preventDefault()
        handleLogin({ username, password })
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <div>
                    username
                    <input id="username" type="text" value={username} name="Username" onChange={event => setUsername(event.target.value)} />
                </div>
                <div>
                    password
                    <input id="password" type="password" value={password} name="Password" onChange={event => setPassword(event.target.value)}/>
                </div>
                <button id="login-button" type="submit">login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
}

export default LoginForm