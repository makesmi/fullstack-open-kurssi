import axios from 'axios'

const baseUrl = "http://localhost:3001/api/persons"

const getData = response => response.data

const getAll = () => axios.get(baseUrl).then(getData)

const addPerson = newPerson => axios.post(baseUrl, newPerson).then(getData)

const deletePerson = person => axios.delete(`${baseUrl}/${person.id}`)

const changePerson = person => axios.put(`${baseUrl}/${person.id}`, person).then(getData)

export default {getAll, addPerson, deletePerson, changePerson}