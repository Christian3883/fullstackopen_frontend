import React, { useState, useEffect } from 'react'
import Agenda from './components/Agenda'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')  
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [filterName, setFilterName] = useState('')

  const showNotification = (message) => {
    setNotificationMessage(message)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
  }

  const getPersons = (filter) =>{
    personService.getAllPersons()
    .then(
      setPersons(filterPersonsArray(filter))
    )
  }


  useEffect(() => {
    personService.getAllPersons()
      .then(data => {setPersons(data) })
      .catch(error => { alert(`Error al recuperar personas del server: ${error}`) })
  }, [])

  function filterPersonsArray(query) {
    if (persons !== undefined) {
      return persons.filter(function (el) {
        return el.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
      })
    }

    return persons
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterNameChange = (event) => {        
    console.log('Value',event.target.value.toLowerCase())
    const newFilter = event.target.value.toLowerCase()
    console.log('Antes',filterName)
    setFilterName(newFilter)        
    console.log('Despues',filterName)
    getPersons(newFilter)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const busquedaPersona = persons.find(person => person.name === newName)
    if (busquedaPersona !== undefined) {
      const updatePerson = { ...busquedaPersona, number: newPerson.number }
      UpdatePerson(updatePerson)
    }
    else {
      AddNewPerson(newPerson)
    }

    setNewName('')
    setNewNumber('')

  }

  const AddNewPerson = (person) => {
    personService.savePerson(person)
      .then(data => {
        setPersons(persons.concat(data))
        showNotification(`Added ${person.name}`)
      })      
  }

  const UpdatePerson = (person) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Desea actualizar el telefono de ${person.name}`) === true) {

      personService.updatePerson(person.id, person)
        .then(data => {
          setPersons(persons.map(p => p.id !== person.id ? p : data))          
          showNotification(`Updated ${person.name}`)
        })

    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} />
      <p>Filter  shown with: <input value={filterName} onChange={handleFilterNameChange} /></p>
      <h3>Add a new</h3>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          <br /><br />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <br />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      <Agenda persons={persons} />
    </div>
  )
}

export default App