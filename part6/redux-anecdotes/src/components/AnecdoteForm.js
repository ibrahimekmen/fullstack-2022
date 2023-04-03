import { useDispatch } from 'react-redux'
import { createAnecdote } from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const newAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anectode.value
        event.target.anectode.value = ''
        const newAnecdote = await createAnecdote(content)
        console.log('newAnecdote ', newAnecdote)
        dispatch({type: 'anecdotes/appendAnecdote', payload: newAnecdote})
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