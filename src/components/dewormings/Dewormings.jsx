import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Deworming from './Deworming'
import TableHeader from '../table/TableHeader'
import Confirm from '../Confirm'
import { getDewormings, deleteDeworming } from '../../services/dewormings'

function Dewormings() {
  const [filter, setFilter] = useState('')
  const paginationDefault = {
    curPage: 1,
    totRecords: 0,
    limit: 10,
    filter
  }

  const [dewormings, setDewormings] = useState({ rows: [] })
  const [showConfirm, setShowConfirm] = useState(false)
  const [selected, setSelected] = useState({})
  const [redirect, setRedirect] = useState('')
  const [pagination, setPagination] = useState(paginationDefault)

  useEffect(() => {
    const updateState = () => {
      const pag = pagination
      getDewormings(pagination).then((deworms) => {
        pag.totRecords = deworms.count
        setPagination(pag)
        setDewormings(deworms)
      })
    }
    updateState()
  }, [pagination])

  const changePage = (page) => {
    setPagination({ ...pagination, curPage: page })
  }

  const handleDelete = (deworming) => {
    setSelected(deworming)
    setShowConfirm(true)
  }

  const confirmDelete = () => {
    deleteDeworming(selected).then(() =>
      getDewormings(pagination).then((deworms) => {
        setDewormings(deworms)
        setShowConfirm(false)
      })
    )
  }

  const handleEdit = (deworming) => {
    setRedirect({
      pathname: `/edit-desparasitacion/${deworming.id}`,
      state: {
        from: '/desparasitaciones'
      }
    })
  }

  const handleRestore = () => {
    setRedirect('/restaurar/desparasitaciones')
  }

  const handleChange = (e) => {
    setFilter(e.target.value)
    if (!e.target.value) setPagination({ ...pagination, filter: '' })
  }

  const handleClick = (e) => {
    e.preventDefault()
    setPagination({ ...pagination, filter, curPage: 1 })
  }

  const { rows } = dewormings
  const totPages = Math.ceil(pagination.totRecords / pagination.limit)

  return (
    <>
      {showConfirm && (
        <Confirm
          title="Desactivando desparasitación"
          question={`¿Desea desactivar la desparasitación del ${selected.date} del paciente ${selected.petName}?`}
          okButton="Desactivar"
          cancelButton="Cancelar"
          cancelDelete={() => setShowConfirm(false)}
          confirmDelete={() => confirmDelete()}
        />
      )}
      {redirect && <Redirect to={redirect} />}
      <div className="container-fluid">
        <h3>Desparasitaciones</h3>
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
              <th scope="col">Desparasitación</th>
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
              <Deworming
                key={record.id}
                indice={index + 1}
                data={record}
                deleteDeworming={() => handleDelete(record)}
                editDeworming={() => handleEdit(record)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Dewormings
