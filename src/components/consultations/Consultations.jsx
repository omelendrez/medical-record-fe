import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Consultation from './Consultation'
import Confirm from '../Confirm'
import Pagination from '../Pagination'
import { getConsultations, deleteConsultation } from '../../services/consultations'

const Consultations = ({ filter }) => {

  const paginationDefault = {
    curPage: 1,
    totRecords: 0,
    limit: 3,
    filter
  }

  const [consultations, setConsultations] = useState({ rows: [] })
  const [showConfirm, setShowConfirm] = useState(false)
  const [selected, setSelected] = useState({})
  const [redirect, setRedirect] = useState('')
  const [pagination, setPagination] = useState(paginationDefault)

  useEffect(() => {
    updateState()
  }, [pagination])

  const updateState = () => {
    const pag = pagination
    getConsultations(pagination)
      .then(consultations => {
        pag.totRecords = consultations.count
        setPagination(pag)
        setConsultations(consultations)
      })
  }

  const changePage = page => {
    setPagination({ ...pagination, curPage: page })
  }

  const handleDelete = consultation => {
    setSelected(consultation)
    setShowConfirm(true)
  }

  const confirmDelete = () => {
    deleteConsultation(selected)
      .then(() => getConsultations(pagination)
        .then(consultations => {
          setConsultations(consultations)
          setShowConfirm(false)
        })
      )
  }

  const handleEdit = Consultation => {
    setRedirect(`./edit-consulta/${Consultation.id}`)
  }

  const handleRestore = () => {
    setRedirect('/restaurar/consultas')
  }

  const { rows } = consultations
  const totPages = Math.ceil(pagination.totRecords / pagination.limit)

  return (
    <>
      {showConfirm &&
        <Confirm
          title="Eliminando consulta"
          question={`Desea eliminar consulta del ${selected.date} del paciente ${selected.pet.name}?`}
          okButton="Eliminar"
          cancelButton="Cancelar"
          cancelDelete={() => setShowConfirm(false)}
          confirmDelete={() => confirmDelete()}
        />
      }
      {redirect && <Redirect to={redirect} />}
      <div className="container-fluid">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Fecha</th>
              <th scope="col">Paciente</th>
              <th scope="col">Diagnostico</th>
              <th scope="col">Tratamiento</th>
              <th scope="col">Próx. Turno</th>
              <th scope="col" colSpan="2">
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((record, index) =>
              <Consultation
                key={index}
                indice={index + 1}
                data={record}
                deleteConsultation={() => handleDelete(record)}
                editConsultation={() => handleEdit(record)}
              />
            )}
          </tbody>
        </table>
        {totPages > 1 && <Pagination pagination={pagination} changePage={changePage} />}
        <div className="float-right">
          <button
            className="btn btn-warning"
            onClick={() => handleRestore()}
          >
            Restaurar
          </button>
        </div>

      </div>
    </>
  )
}

export default Consultations