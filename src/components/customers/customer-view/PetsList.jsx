import React from 'react'
import PropTypes from 'prop-types'
import { readOnly } from '../../../helpers'

function PetsList({ pet, pets, loadPet, handleAddPet }) {
  return (
    !pet.name && (
      <div className="pets mt-2">
        <div className="pets-header">Pacientes</div>
        <ul className="list-group">
          {pets.map((p) => (
            <li className="list-group-item" key={p.id}>
              <button
                onClick={() => loadPet(p)}
                type="button"
                className={`btn btn-${
                  p.statusId === 1 ? 'info' : 'danger'
                } btn-block`}
              >
                <span className="text-uppercase">{p.name} </span>
                {`(${p.statusId === 1 ? 'activo' : 'inactivo'})`}
              </button>
            </li>
          ))}
        </ul>
        {!pets.length && (
          <div className="alert alert-warning my-3">No tiene mascotas</div>
        )}
        {!readOnly() && (
          <div className="text-center">
            <button
              type="button"
              className="btn btn-link btn-sm mt-4"
              onClick={(e) => handleAddPet(e)}
            >
              Agregar paciente
            </button>
          </div>
        )}
      </div>
    )
  )
}

PetsList.propTypes = {
  pet: PropTypes.instanceOf(Object).isRequired,
  pets: PropTypes.instanceOf(Array).isRequired,
  loadPet: PropTypes.func.isRequired,
  handleAddPet: PropTypes.func.isRequired
}

export default PetsList
