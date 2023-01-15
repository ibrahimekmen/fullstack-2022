import { useState, useEffect } from 'react'
import services from './services/phonebook'
import Notification from './components/notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [personsToShow, setPersonsToShow] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [error, setError] = useState(false)

  const hook = () => {
    services.getAll()
    .then(allPeople => {
      setPersons(allPeople)
      setPersonsToShow(allPeople)
    })
  }
  
  useEffect(hook, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
    if(event.target.value !== ""){
      setPersonsToShow(persons.filter((person)=> person.name.toLowerCase().startsWith(event.target.value.toLowerCase())))
    }else{
      setPersonsToShow(persons)
    }
  }

  const deletePerson = (personToDelete) => {
    if(window.confirm(`do you really want to delete ${personToDelete.name} from the list`)){
      services.deletePerson(personToDelete.id, personToDelete).then(response => {
        const changedPersons = persons.filter(person => person.id !== personToDelete.id)
        setPersons(changedPersons)
        setPersonsToShow(changedPersons)
        createMessage(`${personToDelete.name} has been deleted`)
      })
    }
    
  }

  const getID = () => {
    const newID = Math.max(persons.map(person => person.id)) + 1
    return newID;
  }

  const createMessage = (message, error=false) => {
    setNotificationMessage(message)
    setError(error)
    setTimeout(() => {
      setNotificationMessage(null)
      setError(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: getID()
    }
    
    let sameName = false
    persons.forEach(person => {
      if(person.name === newName){
        sameName = true
        if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
          services.updateNumber({...person, 'number': newNumber}).then(response => {
            const changedPersons = persons.map(person => person.id !== response.id ? person : response)
            setPersons(changedPersons)
            setPersonsToShow(changedPersons)
            createMessage(`${person.name}'s number has been changed from ${person.number} to ${newNumber}`, false)
          }).catch(error => {
            if(error.response.status === 404){
              createMessage(`Information of ${person.name} has already been deleted from the server`, true)
            }
          })
        }
      }
    })

    if(!sameName){
      
      services.addNewPerson(newPerson).then(response => {
        const newPersons = persons.concat(response)
        setPersons(newPersons)
        setPersonsToShow(newPersons)
      })
      createMessage(`${newPerson.name} has been added to the list`)
      setNewName('')
      setNewNumber('')
    }    
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} error={error}/>
      <div>
        Filter <input value={filterName} onChange={handleFilterChange}/>
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div> name: <input value={newName} onChange={handleNameChange}/></div>
        <div> number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person)=> <li key={person.id}>{person.name} {person.number}<button onClick={() => deletePerson(person)}>delete</button></li>)}  
      </ul>
    </div>
  )
}

export default App