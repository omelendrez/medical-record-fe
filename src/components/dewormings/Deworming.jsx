import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { formatDate, formatDateFull } from '../../helpers'
import TableActions from '../table/TableActions'

function Deworming({ data, deleteDeworming, editDeworming }) {
  const {
    date,
    petName,
    customerName,
    deworming,
    nextAppointment,
    petId,
    customerId,
    updatedAt,
    userName
  } = data

  return (
    <tr>
      <td className="text-nowrap">{formatDate(date)}</td>
      <td>
        <Link
          to={{
            pathname: `/clientes/${customerId}/${petId}`,
            state: { current: 'desparasitaciones' }
          }}
        >
          {petName}
        </Link>
      </td>
      <td>{customerName}</td>
      <td>{deworming}</td>
      <td className="text-nowrap">
        {nextAppointment ? formatDate(nextAppointment) : ''}
      </td>
      <td className="text-center text-capitalize small">
        <div>{userName || ''}</div>
        <div>{formatDateFull(updatedAt)}</div>
      </td>
      <TableActions
        actionDelete={deleteDeworming}
        actionEdit={editDeworming}
        data={data}
      />
    </tr>
  )
}

Deworming.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  deleteDeworming: PropTypes.func.isRequired,
  editDeworming: PropTypes.func.isRequired
}

export default Deworming
