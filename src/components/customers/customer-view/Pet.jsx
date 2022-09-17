import React from 'react'
import PropTypes from 'prop-types'
import { getSexName, getAge } from '../../../helpers'
import './Pet.css'

function Pet({ pet }) {
  const { name, type, breed, sex, weight, birthDate, observations, statusId } =
    pet
  return (
    <div className="card pet">
      <div className="card-body">
        <h5 className="card-title text-uppercase">{name}</h5>
        <h6 className="card-subtitle mb-2 text-muted text-capitalize">
          {type}
        </h6>
        <h6 className="card-subtitle mb-2 text-muted text-capitalize">
          {breed}
        </h6>
        <h6 className="card-subtitle mb-2 text-muted">{getSexName(sex)}</h6>
        <h6 className="card-subtitle mb-2 text-muted">{weight}</h6>
        <h6 className="card-subtitle mb-2 text-muted">{getAge(birthDate)}</h6>
        {observations && (
          <p className="card-text observations">{observations}</p>
        )}
        <p className={`status ${statusId === 1 ? 'active' : 'inactive'}`}>
          {statusId === 1 ? 'Activo' : 'Inactivo'}
        </p>
      </div>
    </div>
  )
}

Pet.propTypes = {
  pet: PropTypes.instanceOf(Object).isRequired
}

export default Pet
