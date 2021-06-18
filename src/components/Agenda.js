import React from 'react'
import Person from './Person'

function Agenda({persons}) {    

    return (
        <div>
            {persons.map(person => <Person key={person.id} person={person}/>)} 
        </div>
    )
}

export default Agenda
