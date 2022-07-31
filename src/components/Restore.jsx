import React, { useState, useEffect } from 'react'
import Pagination from './Pagination'
import Loading from './Loading'
import { fieldsDefault } from '../helpers'

function Restore(props) {
  const {
    match: {
      params: { table }
    }
  } = props || {}
  const paginationDefault = {
    curPage: 1,
    totRecords: 0,
    limit: 10,
    filter: ''
  }

  const [records, setRecords] = useState({})
  const [error, setError] = useState('')
  const [update, setUpdate] = useState(false)
  const [pagination, setPagination] = useState(paginationDefault)
  const [loading, setLoading] = useState(true)

  const { fields } = fieldsDefault[table]
  const { getRecords } = fieldsDefault[table]
  const { restoreRecord } = fieldsDefault[table]
  const { deleteRecord } = fieldsDefault[table]

  const handleRestore = (record) => {
    restoreRecord(record).then(() => setUpdate(!update))
  }

  const handleDelete = (record) => {
    deleteRecord(record).then(() => setUpdate(!update))
  }

  const changePage = (page) => {
    setPagination({ ...pagination, curPage: page })
    setUpdate(!update)
  }

  useEffect(() => {
    const updateState = () => {
      setLoading(true)
      const pag = pagination
      getRecords(pagination).then((recs) => {
        pag.totRecords = recs.count
        setPagination(pag)
        setRecords(recs)
        if (!recs.count) {
          setError('No hay registros para recuperar')
        }
        setLoading(false)
      })
    }
    updateState()
  }, [update, pagination, getRecords])

  const { rows } = records
  const totPages = Math.ceil(pagination.totRecords / pagination.limit)

  if (loading) return <Loading />

  return (
    <div className="restore">
      {rows && (
        <table className="table table-responsive">
          <thead>
            <tr>
              {fields.map((field) => (
                <th scope="col" key={field.name}>
                  {field.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((record) => (
              <tr key={record.id}>
                {fields.map((field) => (
                  <td key={field.name} className={field.className || null}>
                    {record[field.name]}
                  </td>
                ))}
                <td>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => handleRestore(record)}
                  >
                    Restaurar
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(record)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {error && (
        <div className="alert alert-warning container text-center">{error}</div>
      )}
      {totPages > 1 && (
        <Pagination pagination={pagination} changePage={changePage} />
      )}
    </div>
  )
}

export default Restore
