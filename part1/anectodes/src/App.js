import { useState} from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  
  function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }

  const handleClickRandom = () => {
    setSelected(getRandomInt(0,anecdotes.length))
  }

  const handleClickVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    const maxVotes = Math.max(...copy)
    console.log('max votes', maxVotes)
    const indexOfMaxVotes = copy.indexOf(maxVotes)
    console.log('index of max votes', indexOfMaxVotes)
    setVotes(copy)
    setMostVotedIndex(indexOfMaxVotes)
  }

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVotedIndex, setMostVotedIndex] = useState(0) 
  

  return (
    <div>
      <h1>Anectode of the Day!</h1>
      {anecdotes[selected]}
      <br></br>
      <button onClick={handleClickVote}>Vote</button>
      <button onClick={handleClickRandom}>Random Anectode!</button>
      <p>has {votes[selected]} votes</p>

      <h2>Anectode with most votes</h2>
      {anecdotes[mostVotedIndex]}
      <p>has {votes[mostVotedIndex]} votes</p>
    </div>
  )
}

export default App