import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, addAnecdote } from './reducers/anecdoteReducer'

const App = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    anecdotes.sort((a,b) => (a.votes <= b.votes) ? 1 : -1)

    const vote = (id) => {
        dispatch(voteAnecdote(id))
        console.log('vote', id)
    }

    const newAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anectode.value
        event.target.anectode.value = ''
        dispatch(addAnecdote(content))
        console.log('trying to add ', content)
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
            <h2>create new</h2>
            <form onSubmit={newAnecdote
    }>
                <input name='anectode'/>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default App