import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({message, isError}) => {
  const notificationStyle = {
    color: isError ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return message !== null ? (
    <div style={notificationStyle}>{message}</div>
  ) : null
}

const Filter = ({filterText, changeFilterText}) => (
  <div>
    filter shown with <input value={filterText} onChange={changeFilterText} />
  </div>
)

const PersonForm = ({addPerson, newName, changeNewName, newNumber, changeNewNumber}) => (
    <form onSubmit={addPerson}>
      <div>name: <input value={newName} onChange={changeNewName} /></div>
      <div>number: <input value={newNumber} onChange={changeNewNumber} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
)

const Persons = ({persons, deletePerson}) => 
  persons.map(person => (
    <div key={person.name}>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person)}>delete</button>
    </div>
  )
)


const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterText, setFilterText ] = useState('')
  const [notification, setNotification] = useState({
    message: null,
    error: false
  })


  useEffect(() => {
    personService
      .getAll()
      .then(setPersons)
  }, [])

  const changeNewName = event => setNewName(event.target.value)
  const changeNewNumber = event => setNewNumber(event.target.value)
  const changeFilterText = event => setFilterText(event.target.value.toLowerCase())
  const setNotificationMessage = message => setNotification({message, error: false})
  
  const changeNumber = person => {
    const changedPerson = {...person, number: newNumber}
    personService.changePerson(changedPerson).then(savedPerson => {
      const replace = person => person.id === savedPerson.id
      setPersons(persons.map(person => replace(person) ? savedPerson : person))
      setNewName('')
      setNewNumber('')
      setNotificationMessage(`Changed ${person.name}`)
      setTimeout(() => setNotificationMessage(null), 5000)
    })
    .catch(error => {
      setNotification({message: `Information of ${person.name} has already been removed from server`, error: true})
      setTimeout(() => setNotificationMessage(null), 5000)
      setPersons(persons.filter(p => p.id !== person.id))
    })
  }

  const addPerson = event => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    if(existingPerson) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        changeNumber(existingPerson) 
      }
      return
    }
    const newPerson = {
      name: newName, 
      number: newNumber 
    }
    personService
      .addPerson(newPerson)
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson))
        setNewName('')
        setNewNumber('')
        setNotificationMessage(`Added ${addedPerson.name}`)
        setTimeout(() => setNotificationMessage(null), 5000)
      })
  }

  const deletePerson = person => {
    if(window.confirm(`Delete ${person.name} ?`)){
      personService.deletePerson(person)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          setNotificationMessage(`Deleted ${person.name}`)
          setTimeout(() => setNotificationMessage(null), 5000)
        })
        .catch(error => {
          setNotification({message: `Information of ${person.name} has already been removed from server`, error: true})
          setTimeout(() => setNotificationMessage(null), 5000)
          setPersons(persons.filter(p => p.id !== person.id))
        })
      }
  }

  const visiblePersons =  persons.filter(person => person.name.toLowerCase().indexOf(filterText) > -1)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} isError={notification.error} />
      <Filter filterText={filterText} changeFilterText={changeFilterText} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} 
          newName={newName} changeNewName={changeNewName} 
          newNumber={newNumber} changeNewNumber={changeNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={visiblePersons} deletePerson={deletePerson} />
    </div>
  )

}

export default App