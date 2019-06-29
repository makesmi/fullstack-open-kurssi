import axios from 'axios'

const baseUrl = "http://localhost:3001/persons"

const getData = response => response.data

const getAll = () => axios.get(baseUrl).then(getData)

const addPerson = newPerson => axios.post(baseUrl, newPerson).then(getData)

export default {getAll, addPerson}