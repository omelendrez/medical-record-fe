import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Consultation from './Consultation'
import TableHeader from '../table/TableHeader'
import Confirm from '../Confirm'
import {
  getConsultations,
  deleteConsultation
} from '../../services/consultations'

function Consultations() {
  const [filter, setFilter] = useState('')
  const paginationDefault = {
    curPage: 1,
    totRecords: 0,
    limit: 10,
    filter
  }

  const [consultations, setConsultations] = useState({ rows: [] })
  const [showConfirm, setShowConfirm] = useState(false)
  const [selected, setSelected] = useState({})
  const [redirect, setRedirect] = useState('')
  const [pagination, setPagination] = useState(paginationDefault)

  useEffect(() => {
    const updateState = () => {
      const pag = pagination
      getConsultations(pagination).then((cons) => {
        pag.totRecords = cons.count
        setPagination(pag)
        setConsultations(cons)
      })
    }
    updateState()
  }, [pagination])

  const changePage = (page) => {
    setPagination({ ...pagination, curPage: page })
  }

  const handleDelete = (consultation) => {
    setSelected(consultation)
    setShowConfirm(true)
  }

  const confirmDelete = () => {
    deleteConsultation(selected).then(() =>
      getConsultations(pagination).then((cons) => {
        setConsultations(cons)
        setShowConfirm(false)
      })
    )
  }

  const handleEdit = (consultation) => {
    setRedirect({
      pathname: `/edit-consulta/${consultation.id}`,
      state: {
        from: '/consultas'
      }
    })
  }

  const handleRestore = () => {
    setRedirect('/restaurar/consultas')
  }

  const handleChange = (e) => {
    setFilter(e.target.value)
    if (!e.target.value) setPagination({ ...pagination, filter: '' })
  }

  const handleClick = (e) => {
    e.preventDefault()
    setPagination({ ...pagination, filter, curPage: 1 })
  }

  const { rows } = consultations
  const totPages = Math.ceil(pagination.totRecords / pagination.limit)

  return (
    <>
      {showConfirm && (
        <Confirm
          title="Desactivando consulta"
          question={`¿Desea desactivar la consulta del ${selected.date} del paciente ${selected.petName}?`}
          okButton="Desactivar"
          cancelButton="Cancelar"
          cancelDelete={() => setShowConfirm(false)}
          confirmDelete={() => confirmDelete()}
        />
      )}
      {redirect && <Redirect to={redirect} />}
      <div className="container-fluid">
        <h3>Consultas</h3>
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
              <th scope="col">Diagnóstico</th>
              <th scope="col">Etapa tratamiento</th>
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
              <Consultation
                key={record.id}
                indice={index + 1}
                data={record}
                deleteConsultation={() => handleDelete(record)}
                editConsultation={() => handleEdit(record)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Consultations
