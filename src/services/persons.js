import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAllPersons = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const savePerson = (person) => {
    const request = axios.post(baseURL, person)
    return request.then(response => response.data)
}

const updatePerson = (id, person) => {
    const url = `${baseURL}/${id}`
    const request = axios.put(url, person)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const url = `${baseURL}/${id}`
    const request = axios.delete(url)
    return request.then(response => response.data)
}


export default { getAllPersons, savePerson, updatePerson, deletePerson }