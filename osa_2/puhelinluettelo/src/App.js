import React, { useState, useEffect } from 'react'
import axios from 'axios'

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

const Persons = ({persons}) => 
  persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)


const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterText, setFilterText ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
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
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')

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
      <Persons persons={visiblePersons} />
    </div>
  )

}

export default App