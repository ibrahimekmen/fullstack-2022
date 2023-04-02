import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        createAnecdote(state, action) {
            const content = action.payload
            state.push({
                content,
                votes: 0
            })
        },
        vote(state, action) {
            const id = action.payload.id
            const anecdoteToVote = state.find(anecdote => anecdote.id === id)
            const votedAnecdote = {
                ...anecdoteToVote,
                votes: anecdoteToVote.votes+1
            }
            return state.map(anecdote => anecdote.id === id ? votedAnecdote : anecdote)
        },
        appendAnecdote(state, action) {
            state.push(action.payload)
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const { createAnecdote, vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer