import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Customer from './Customer'
import Confirm from '../Confirm'
import Pagination from '../Pagination'
import { getCustomers, deleteCustomer } from '../../services/customers'

const Customers = ({ filter }) => {

  const paginationDefault = {
    curPage: 1,
    totRecords: 0,
    limit: 10,
    filter
  }

  const [customers, setCustomers] = useState({ rows: [] })
  const [showConfirm, setShowConfirm] = useState(false)
  const [selected, setSelected] = useState({})
  const [redirect, setRedirect] = useState('')
  const [pagination, setPagination] = useState(paginationDefault)

  useEffect(() => {
    updateState()
  }, [pagination])

  const updateState = () => {
    const pag = pagination
    getCustomers(pagination)
      .then(customers => {
        pag.totRecords = customers.count
        setPagination(pag)
        setCustomers(customers)
      })
  }

  const changePage = page => {
    setPagination({ ...pagination, curPage: page })
  }

  const confirmDelete = () => {
    deleteCustomer(selected)
      .then(() => getCustomers(pagination)
        .then(customers => {
          setCustomers(customers)
          setShowConfirm(false)
        })
      )
  }

  const handleDelete = customer => {
    setSelected(customer)
    setShowConfirm(true)
  }

  const handleEdit = customer => {
    setRedirect(`/edit-cliente/${customer.id}`)
  }

  const handleAdd = () => {
    setRedirect('/nuevo-cliente')
  }

  const handleRestore = () => {
    setRedirect('/restaurar/clientes')
  }

  const { rows } = customers
  const totPages = Math.ceil(pagination.totRecords / pagination.limit)

  return (
    <>
      {showConfirm &&
        <Confirm
          title="Eliminando cliente"
          question={`Desea eliminar cliente ${selected.name}?`}
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
              <th scope="col" style={{ width: '250px' }}>Nombre</th>
              <th scope="col" style={{ width: '250px' }}>Paciente</th>
              <th scope="col" style={{ width: '300px' }}>Domicilio</th>
              <th scope="col" style={{ width: '400px' }}>Teléfono</th>
              <th scope="col" style={{ width: '280px' }}>Observaciones</th>
              <th scope="col" colSpan="2">
                <button
                  className="btn btn-primary my-1 float-right"
                  onClick={() => handleAdd()}
                >Agregar</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((record, index) =>
              <Customer
                key={index}
                indice={index + 1}
                data={record}
                deleteCustomer={() => handleDelete(record)}
                editCustomer={() => handleEdit(record)}
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

export default Customers