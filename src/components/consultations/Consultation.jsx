import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../services/utils'
import TableActions from '../TableActions'

const Consultation = ({ data, deleteConsultation, editConsultation }) => {

  const { date, petName, customerName, diagnosis, nextAppointment, petId, customerId } = data

  return (
    <tr>
      <td className="text-nowrap">
        {formatDate(date)}
      </td>
      <td>
        <Link to={`/clientes/${customerId}/${petId}`}>
          {petName}
        </Link>
      </td>
      <td>{customerName}</td>
      <td>{diagnosis}</td>
      <td className="text-nowrap">{nextAppointment ? formatDate(nextAppointment) : ''}</td>

      <TableActions
        actionDelete={deleteConsultation}
        actionEdit={editConsultation}
        data={data}
      />

    </tr>
  )
}

export default Consultation