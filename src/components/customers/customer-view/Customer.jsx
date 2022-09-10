import React from 'react'
import PropTypes from 'prop-types'
import PetsList from './PetsList'
import Pet from './Pet'
import { formatAmount, readOnly } from '../../../helpers'
import './Customer.css'

function Customer({ customer, pet, handleAddPet, loadPet, setBack, debt }) {
  const { name, address, phone, email, observations, pets, statusId } = customer

  return (
    <>
      <div className="text-center d-none d-md-block">
        <div className="card customer">
          <div className="card-body">
            <h5 className="card-title text-uppercase">{name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{address}</h6>
            <h6 className="card-subtitle mb-2 text-muted">{phone}</h6>
            <h6 className="card-subtitle mb-2 text-muted">{email}</h6>
            {observations && (
              <p className="card-text observations">{observations}</p>
            )}
            {!readOnly() && debt.balance > 0 && (
              <p className="card-text text-danger">
                {`Debe ${formatAmount(debt.balance)}`}
              </p>
            )}
            <p className={`status ${statusId === 1 ? 'active' : 'inactive'}`}>
              {statusId === 1 ? 'Activo' : 'Inactivo'}
            </p>
          </div>
        </div>
        {pet.name && <Pet pet={pet} />}

        <div className="container mt-3 button-container">
          <button
            type="button"
            className="btn btn-warning btn-block"
            onClick={() => setBack(true)}
          >
            Volver
          </button>
        </div>
      </div>
      <PetsList
        pet={pet}
        pets={pets}
        loadPet={loadPet}
        handleAddPet={handleAddPet}
      />
    </>
  )
}

Customer.propTypes = {
  customer: PropTypes.instanceOf(Object).isRequired,
  pet: PropTypes.instanceOf(Object).isRequired,
  handleAddPet: PropTypes.func.isRequired,
  loadPet: PropTypes.func.isRequired,
  setBack: PropTypes.func.isRequired,
  debt: PropTypes.instanceOf(Object).isRequired
}

export default Customer
