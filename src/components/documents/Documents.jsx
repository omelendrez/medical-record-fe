import React, { useState, useEffect } from 'react'
import Document from './Document'
import TableHeader from '../table/TableHeader'
import Confirm from '../Confirm'
import {
  getDocuments,
  deleteDocument,
  deleteFile
} from '../../services/documents'

function Documents() {
  const [filter, setFilter] = useState('')
  const paginationDefault = {
    curPage: 1,
    totRecords: 0,
    limit: 10,
    filter
  }

  const [documents, setDocuments] = useState({ rows: [] })
  const [showConfirm, setShowConfirm] = useState(false)
  const [selected, setSelected] = useState({})

  const [pagination, setPagination] = useState(paginationDefault)

  useEffect(() => {
    const updateState = () => {
      const pag = pagination
      getDocuments(pagination).then((docs) => {
        pag.totRecords = docs.count
        setPagination(pag)
        setDocuments(docs)
      })
    }
    updateState()
  }, [pagination])

  const changePage = (page) => {
    setPagination({ ...pagination, curPage: page })
  }

  const handleDelete = (document) => {
    setSelected(document)
    setShowConfirm(true)
  }

  const confirmDelete = () => {
    const fileName = `${selected.petId}-${selected.id}.pdf`
    deleteFile(fileName).then(() =>
      deleteDocument(selected).then(() =>
        getDocuments(pagination).then((docs) => {
          setDocuments(docs)
          setShowConfirm(false)
        })
      )
    )
  }

  const handleChange = (e) => {
    setFilter(e.target.value)
    if (!e.target.value) setPagination({ ...pagination, filter: '' })
  }

  const handleClick = (e) => {
    e.preventDefault()
    setPagination({ ...pagination, filter, curPage: 1 })
  }

  const { rows } = documents
  const totPages = Math.ceil(pagination.totRecords / pagination.limit)

  return (
    <>
      {showConfirm && (
        <Confirm
          title="Desactivando documento"
          question={`¿Desea eliminar el documento "${selected.petId}-${selected.id}.pdf" del paciente ${selected.petName}?`}
          okButton="Eliminar"
          cancelButton="Cancelar"
          cancelDelete={() => setShowConfirm(false)}
          confirmDelete={() => confirmDelete()}
        />
      )}
      {/* {redirect && <Redirect to={redirect} />} */}
      <div className="container-fluid">
        <h3>Documentos</h3>
        <TableHeader
          onChange={handleChange}
          filter={filter}
          handleClick={handleClick}
          totPages={totPages}
          pagination={pagination}
          changePage={changePage}
        />
        <table className="table table-sm table-responsive">
          <thead>
            <tr>
              <th scope="col">Fecha</th>
              <th scope="col">Cliente</th>
              <th scope="col">Paciente</th>
              <th scope="col">Documento</th>
              <th scope="col">Referencia</th>
              <th scope="col" colSpan="3">
                &nbsp;
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((record, index) => (
              <Document
                key={record.id}
                indice={index + 1}
                data={record}
                deleteDocument={() => handleDelete(record)}
                deleteLabel="Eliminar"
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Documents
