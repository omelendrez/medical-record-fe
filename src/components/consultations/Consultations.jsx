import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Consultation from './Consultation'
import Confirm from '../Confirm'
import Pagination from '../Pagination'
import Loading from '../Loading'
import { getConsultations, deleteConsultation } from '../../services/consultations'

const Consultations = () => {
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
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const updateState = () => {
      setLoading(true)
      const pag = pagination
      getConsultations(pagination)
        .then(consultations => {
          pag.totRecords = consultations.count
          setPagination(pag)
          setConsultations(consultations)
          setLoading(false)
        })
    }
    updateState()
  }, [pagination])


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

  const handleEdit = consultation => {
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

  const handleChange = e => {
    setFilter(e.target.value)
    if (!e.target.value) setPagination({ ...pagination, filter: '' })
  }

  const handleClick = (e) => {
    e.preventDefault()
    setPagination({ ...pagination, filter, curPage: 1 })
  }

  const { rows } = consultations
  const totPages = Math.ceil(pagination.totRecords / pagination.limit)

  if (loading) return <Loading />

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
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col" style={{ width: '100px' }}>Fecha</th>
              <th scope="col" style={{ width: '100px' }}>Paciente</th>
              <th scope="col" style={{ width: '250px' }}>Diagnostico</th>
              <th scope="col" style={{ width: '400px' }}>Tratamiento</th>
              <th scope="col" className="text-nowrap">Próx. Turno</th>
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
        <div className="row">
          <div className="col-4">
            <form className="form-inline">
              <input
                className="form-control mr-sm-2"
                type="search"
                aria-label="Search"
                onChange={e => handleChange(e)}
                value={filter}
              />
              <button
                className="btn btn-warning"
                onClick={e => handleClick(e)}
              >Buscar</button>
            </form>
          </div>
          <div className="col-4">
            {totPages > 1 && <Pagination pagination={pagination} changePage={changePage} />}
          </div>

          <div className="col-4">
            <div className="float-right">
              <button
                className="btn btn-outline-secondary"
                onClick={() => handleRestore()}>
                Restaurar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Consultations