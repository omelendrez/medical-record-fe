import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAppointments } from '../services/appointments'
import TableHeader from './table/TableHeader'
import { formatDate } from '../helpers'

function Appointments() {
  const [filter, setFilter] = useState('')
  const paginationDefault = {
    curPage: 1,
    totRecords: 0,
    limit: 15,
    filter
  }

  const [pagination, setPagination] = useState(paginationDefault)
  const [appointments, setAppointments] = useState([])

  const changePage = (page) => {
    setPagination({ ...pagination, curPage: page })
  }

  const handleChange = (e) => {
    setFilter(e.target.value)
    if (!e.target.value) setPagination({ ...pagination, filter: '' })
  }

  const handleClick = (e) => {
    e.preventDefault()
    setPagination({ ...pagination, filter, curPage: 1 })
  }

  useEffect(() => {
    const pag = pagination
    getAppointments(pagination).then((app) => {
      pag.totRecords = app.count
      setPagination(pag)
      setAppointments(app.rows)
    })
  }, [pagination])

  const totPages = Math.ceil(pagination.totRecords / pagination.limit)

  return (
    <div className="container-fluid">
      <h3>Turnos</h3>
      <TableHeader
        handleChange={handleChange}
        filter={filter}
        handleClick={handleClick}
        totPages={totPages}
        pagination={pagination}
        changePage={changePage}
      />
      <div className=" d-none d-md-block mb-3">
        <Link to="/calendario" className="btn btn-primary">
          Ver calendario
        </Link>
      </div>

      {appointments.length > 0 && (
        <table className="table table-sm table-responsive">
          <tbody>
            {appointments.map((a) => (
              <tr key={`${a.id}${a.type}`}>
                <td className="text-capitalize">{a.type}</td>
                <td>{formatDate(a.nextAppointment)}</td>
                <td className="name text-uppercase">
                  <Link
                    to={{
                      pathname: `/clientes/${a.customerId}/${a.petId}`,
                      state: { current: a.type, from: '/' }
                    }}
                  >
                    {a.petName}
                  </Link>
                </td>
                <td className="text-uppercase">{a.customerName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Appointments
