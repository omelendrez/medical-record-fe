import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { formatDate } from '../helpers'

function ProgrammedVisits({ appointments }) {
  return (
    <div className="container">
      <h3>Visitas Programadas</h3>
      <div className=" d-none d-md-block">
        <Link to="/calendario" className="btn btn-primary">
          Ver calendario
        </Link>
      </div>
      <table className="table table-sm table-responsive">
        <tbody>
          {appointments.map((a) => (
            <tr key={`${a.id}${a.type}`}>
              <td>{a.type}</td>
              <td>{formatDate(a.nextAppointment)}</td>
              <td className="name">
                <Link
                  to={{
                    pathname: `/clientes/${a.customerId}/${a.petId}`,
                    state: { current: a.type, from: '/' }
                  }}
                >
                  {a.petName}
                </Link>
              </td>
              <td>{a.customerName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

ProgrammedVisits.propTypes = {
  appointments: PropTypes.instanceOf(Array).isRequired
}

export default ProgrammedVisits
