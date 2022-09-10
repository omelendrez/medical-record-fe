import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { formatDate, formatDateFull } from '../../helpers'
import TableActions from '../table/TableActions'

function Vaccination({ data, deleteVaccination, editVaccination }) {
  const {
    date,
    petName,
    customerName,
    vaccination,
    nextAppointment,
    petId,
    customerId,
    updatedAt,
    userName
  } = data

  return (
    <tr>
      <td className="text-nowrap">{formatDate(date)}</td>
      <td className="text-uppercase">
        <Link
          to={{
            pathname: `/clientes/${customerId}/${petId}`,
            state: { current: 'vacunaciones' }
          }}
        >
          {petName}
        </Link>
      </td>
      <td className="text-uppercase">{customerName}</td>
      <td>{vaccination}</td>
      <td className="text-nowrap">
        {nextAppointment ? formatDate(nextAppointment) : ''}
      </td>
      <td className="text-center text-capitalize small">
        <div>{userName || ''}</div>
        <div>{formatDateFull(updatedAt)}</div>
      </td>
      <TableActions
        actionDelete={deleteVaccination}
        actionEdit={editVaccination}
        data={data}
      />
    </tr>
  )
}

Vaccination.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  deleteVaccination: PropTypes.func.isRequired,
  editVaccination: PropTypes.func.isRequired
}

export default Vaccination
