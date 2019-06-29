import React, { useState, useEffect } from 'react'
import personService from './services/persons'

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

  useEffect(() => {
    personService
      .getAll()
      .then(setPersons)
  }, [])

  const changeNewName = event => setNewName(event.target.value)
  const changeNewNumber = event => setNewNumber(event.target.value)
  const changeFilterText = event => setFilterText(event.target.value.toLowerCase())
  
  const addPerson = event => {
    event.preventDefault()
    if(persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
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
      })
  }

  const deletePerson = person => {
    if(window.confirm(`Delete ${person.name} ?`)){
      personService.deletePerson(person)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  const visiblePersons =  persons.filter(person => person.name.toLowerCase().indexOf(filterText) > -1)

  return (
    <div>
      <h2>Phonebook</h2>
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