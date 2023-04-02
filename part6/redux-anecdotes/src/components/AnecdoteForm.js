import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const newAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anectode.value
        event.target.anectode.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        console.log('nweAnecdote ',newAnecdote)
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