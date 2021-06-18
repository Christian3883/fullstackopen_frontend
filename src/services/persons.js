import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAllPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const savePerson = (person) => {
    const request = axios.post(baseUrl, person)
    return request.then(response => response.data)
}

const updatePerson = (id, person) => {
    const url = `${baseUrl}/${id}`
    const request = axios.put(url, person)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const url = `${baseUrl}/${id}`
    const request = axios.delete(url)
    return request.then(response => response.data)
}


export default { getAllPersons, savePerson, updatePerson, deletePerson }