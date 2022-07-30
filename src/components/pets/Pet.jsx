import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getSexName, getAge, formatDateFull } from '../../helpers'
import './Pet.css'
import TableActions from '../table/TableActions'

function Pet({ data, deletePet, editPet }) {
  const {
    id,
    name,
    type,
    breed,
    sex,
    birthDate,
    customerId,
    customerName,
    updatedAt,
    userName
  } = data
  return (
    <tr>
      <td className="name">
        <Link
          to={{
            pathname: `/clientes/${customerId}/${id}`,
            state: { from: '/pacientes' }
          }}
        >
          {name}
        </Link>
      </td>
      <td className="customer-row">{customerName}</td>
      <td>{type}</td>
      <td>{breed}</td>
      <td>{getSexName(sex)}</td>
      <td>{getAge(birthDate)}</td>
      <td className="text-center text-capitalize small">
        <div>{userName || ''}</div>
        <div>{formatDateFull(updatedAt)}</div>
      </td>

      <TableActions actionDelete={deletePet} actionEdit={editPet} data={data} />
    </tr>
  )
}

Pet.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  deletePet: PropTypes.func.isRequired,
  editPet: PropTypes.func.isRequired
}

export default Pet
