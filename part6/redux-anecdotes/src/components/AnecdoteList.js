import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
    let anecdotes = useSelector(state => {
        console.log('anecdote state', state.anecdotes)
        if (state.filter === ''){
            return state.anecdotes
        }else {
            return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
        }
    })
    const dispatch = useDispatch()

    const anecdotesToSort = [...anecdotes]
    anecdotesToSort.sort((a,b) => (a.votes <= b.votes) ? 1 : -1)
    anecdotes = anecdotesToSort
    

    const vote = (id) => {
        dispatch({
            type: 'anecdotes/vote',
            payload: {
                id: id
            }
        })
        console.log('vote', id)
    }

    return (
        <div>
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
        </div>
        
    )
}

export default AnecdoteList