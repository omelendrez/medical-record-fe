import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './Customer.css'
import TableActions from '../table/TableActions'
import { formatDateFull } from '../../helpers'

function Customer({ data, deleteCustomer, editCustomer }) {
  const { id, name, address, phone, pets, observations, updatedAt, user } = data
  const petsList = pets.map((pet) => pet.name)
  const userName = user ? user.name : ''

  return (
    <tr>
      <td className="name text-uppercase">
        <Link to={`/clientes/${id}`}>{name}</Link>
      </td>
      <td>
        <div className="pet-list text-uppercase">{petsList.join(', ')}</div>
      </td>
      <td>{address}</td>
      <td>{phone}</td>
      <td>{observations}</td>
      <td className="text-center text-capitalize small">
        <div>{userName || ''}</div>
        <div>{formatDateFull(updatedAt)}</div>
      </td>
      <TableActions
        actionDelete={deleteCustomer}
        actionEdit={editCustomer}
        data={data}
      />
    </tr>
  )
}

Customer.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
    pets: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        species: PropTypes.string,
        breed: PropTypes.string
      })
    ),
    observations: PropTypes.string,
    updatedAt: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  }).isRequired,
  deleteCustomer: PropTypes.func.isRequired,
  editCustomer: PropTypes.func.isRequired
}

export default Customer
