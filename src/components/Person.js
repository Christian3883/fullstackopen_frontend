import React from 'react'
import personServices from '../services/persons'

function Person({ person }) {
    const { id, name, number } = person

    const deletPersonClick = (event) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Desea borrar el usuario ${name} ${id}`) === true) {
            console.log('Eleigio borrar')
            personServices.deletePerson(id)
        }
    }

    return (
        <p>
            <label>{name} : {number}</label>
            <input type='button' value="Delete" onClick={deletPersonClick} />
        </p>

    )
}

export default Person
