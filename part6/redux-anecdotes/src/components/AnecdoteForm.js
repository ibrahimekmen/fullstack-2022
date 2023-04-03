import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const newAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anectode.value
        event.target.anectode.value = ''
        dispatch(createAnecdote(content))
    }

    return (
        <div>
            <h2>Create New</h2>
            <form onSubmit={newAnecdote}>
                <input name='anectode'/>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm