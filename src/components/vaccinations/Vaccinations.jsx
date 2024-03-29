import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Vaccination from './Vaccination'
import TableHeader from '../table/TableHeader'
import Confirm from '../Confirm'
import { getVaccinations, deleteVaccination } from '../../services/vaccinations'

function Vaccinations() {
  const [filter, setFilter] = useState('')
  const paginationDefault = {
    curPage: 1,
    totRecords: 0,
    limit: 10,
    filter
  }

  const [vaccinations, setVaccinations] = useState({ rows: [] })
  const [showConfirm, setShowConfirm] = useState(false)
  const [selected, setSelected] = useState({})
  const [redirect, setRedirect] = useState('')
  const [pagination, setPagination] = useState(paginationDefault)

  useEffect(() => {
    const updateState = () => {
      const pag = pagination
      getVaccinations(pagination).then((vac) => {
        pag.totRecords = vac.count
        setPagination(pag)
        setVaccinations(vac)
      })
    }
    updateState()
  }, [pagination])

  const changePage = (page) => {
    setPagination({ ...pagination, curPage: page })
  }

  const handleDelete = (vac) => {
    setSelected(vac)
    setShowConfirm(true)
  }

  const confirmDelete = () =>
    deleteVaccination(selected).then(() =>
      getVaccinations(pagination).then((vac) => {
        setVaccinations(vac)
        setShowConfirm(false)
      })
    )

  const handleEdit = (vaccination) => {
    setRedirect({
      pathname: `/edit-vacunacion/${vaccination.id}`,
      state: {
        from: '/vacunaciones'
      }
    })
  }

  const handleRestore = () => {
    setRedirect('/restaurar/vacunaciones')
  }

  const handleChange = (e) => {
    setFilter(e.target.value)
    if (!e.target.value) setPagination({ ...pagination, filter: '' })
  }

  const handleClick = (e) => {
    e.preventDefault()
    setPagination({ ...pagination, filter, curPage: 1 })
  }

  const { rows } = vaccinations
  const totPages = Math.ceil(pagination.totRecords / pagination.limit)

  return (
    <>
      {showConfirm && (
        <Confirm
          title="Desactivando vacunación"
          question={`¿Desea desactivar la vacunación del ${selected.date} del paciente ${selected.petName}?`}
          okButton="Desactivar"
          cancelButton="Cancelar"
          cancelDelete={() => setShowConfirm(false)}
          confirmDelete={() => confirmDelete()}
        />
      )}
      {redirect && <Redirect to={redirect} />}
      <div className="container-fluid">
        <h3>Vacunaciones</h3>
        <TableHeader
          onChange={handleChange}
          filter={filter}
          handleClick={handleClick}
          totPages={totPages}
          pagination={pagination}
          changePage={changePage}
          handleRestore={handleRestore}
        />
        <table className="table table-sm table-responsive">
          <thead>
            <tr>
              <th scope="col">Fecha</th>
              <th scope="col">Paciente</th>
              <th scope="col">Cliente</th>
              <th scope="col">Vacunación</th>
              <th scope="col" className="text-nowrap">
                Próx. Turno
              </th>
              <th scope="col" colSpan="3">
                &nbsp;
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((record, index) => (
              <Vaccination
                key={record.id}
                indice={index + 1}
                data={record}
                deleteVaccination={() => handleDelete(record)}
                editVaccination={() => handleEdit(record)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Vaccinations
