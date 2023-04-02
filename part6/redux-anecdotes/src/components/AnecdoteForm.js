import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const newAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anectode.value
        event.target.anectode.value = ''
        dispatch({type: 'anecdotes/createAnecdote', payload: content})
        console.log('trying to add ', content)
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