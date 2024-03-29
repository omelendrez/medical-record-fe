import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Customer from './Customer'
import Confirm from '../Confirm'
import TableHeader from '../table/TableHeader'
import { getCustomers, deleteCustomer } from '../../services/customers'
import { readOnly } from '../../helpers'

const filterFields = [
  {
    id: 'name',
    label: 'Nombre'
  },
  {
    id: 'address',
    label: 'Domicilio'
  },
  {
    id: 'phone',
    label: 'Teléfono'
  }
]

function Customers() {
  const [filter, setFilter] = useState('')
  const [filterField, setFilterField] = useState('name')
  const paginationDefault = {
    curPage: 1,
    totRecords: 0,
    limit: 10,
    filterField,
    filter
  }

  const [customers, setCustomers] = useState({ rows: [] })
  const [showConfirm, setShowConfirm] = useState(false)
  const [selected, setSelected] = useState({})
  const [redirect, setRedirect] = useState('')
  const [pagination, setPagination] = useState(paginationDefault)

  useEffect(() => {
    const updateState = () => {
      const pag = pagination
      getCustomers(pagination).then((custs) => {
        pag.totRecords = custs.count
        setPagination(pag)
        setCustomers(custs)
      })
    }
    updateState()
  }, [pagination])

  const changePage = (page) => {
    setPagination({ ...pagination, curPage: page })
  }

  const confirmDelete = () => {
    deleteCustomer(selected).then(() =>
      getCustomers(pagination).then((custs) => {
        setCustomers(custs)
        setShowConfirm(false)
      })
    )
  }

  const handleDelete = (customer) => {
    setSelected(customer)
    setShowConfirm(true)
  }

  const handleEdit = (customer) => {
    setRedirect(`/edit-cliente/${customer.id}`)
  }

  const handleAdd = () => {
    setRedirect('/nuevo-cliente')
  }

  const handleRestore = () => {
    setRedirect('/restaurar/clientes')
  }

  const handleChange = (e) => {
    setFilter(e.target.value)
    if (!e.target.value) setPagination({ ...pagination, filter: '' })
  }

  const handleFieldChange = (e) => {
    setFilterField(e.target.id)
  }

  const handleClick = (e) => {
    e.preventDefault()
    setPagination({ ...pagination, filter, filterField, curPage: 1 })
  }

  const { rows } = customers
  const totPages = Math.ceil(pagination.totRecords / pagination.limit)

  return (
    <>
      {showConfirm && (
        <Confirm
          title="Desactivando cliente"
          question={`¿Desea desactivar cliente ${selected.name}?`}
          okButton="Desactivar"
          cancelButton="Cancelar"
          cancelDelete={() => setShowConfirm(false)}
          confirmDelete={() => confirmDelete()}
        />
      )}
      {redirect && <Redirect to={redirect} />}
      <div className="container-fluid">
        <h3>Clientes</h3>
        <TableHeader
          filterFields={filterFields}
          onChange={handleChange}
          onFieldChange={handleFieldChange}
          filter={filter}
          filterField={filterField}
          handleClick={handleClick}
          totPages={totPages}
          pagination={pagination}
          changePage={changePage}
          handleRestore={handleRestore}
        />
        <table className="table table-sm table-responsive">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Paciente</th>
              <th scope="col">Domicilio</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Observaciones</th>
              <th scope="col" colSpan="3">
                {!readOnly() && (
                  <button
                    type="button"
                    className="btn btn-primary my-1 float-right text-nowrap"
                    onClick={() => handleAdd()}
                  >
                    Agregar Cliente
                  </button>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((record, index) => (
              <Customer
                key={record.id}
                indice={index + 1}
                data={record}
                deleteCustomer={() => handleDelete(record)}
                editCustomer={() => handleEdit(record)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Customers
