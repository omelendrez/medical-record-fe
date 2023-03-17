import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TableHeader from '../table/TableHeader'
import TableFooter from '../table/TableFooter'
import Modal from '../Modal'
import { getDebtors } from '../../services/customers'
import { savePayment } from '../../services/accounts'
import { formatAmount, paymentMethods, setToday } from '../../helpers'

function Debtors() {
  const [filter, setFilter] = useState('')
  const paginationDefault = {
    curPage: 1,
    totRecords: 0,
    limit: 10,
    filter
  }

  const [debtors, setDebtors] = useState({ rows: [] })
  const [pagination, setPagination] = useState(paginationDefault)
  const [showModal, setShowModal] = useState(false)
  const [debtor, setDebtor] = useState({})
  const [form, setForm] = useState({ credit: 0, date: '' })
  const [error, setError] = useState('')
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const updateState = () => {
      const pag = pagination
      getDebtors(pagination).then((dbts) => {
        pag.totRecords = dbts.count.length
        const newTotal = dbts.rows.reduce((acc, dbt) => acc + dbt.balance, 0)
        setTotal(newTotal)
        setPagination(pag)
        setDebtors(dbts)
      })
    }
    updateState()
  }, [pagination])

  const handleChange = (e) => {
    setFilter(e.target.value)
    if (!e.target.value) setPagination({ ...pagination, filter: '' })
  }

  const handleClick = (e) => {
    e.preventDefault()
    setPagination({ ...pagination, filter, curPage: 1 })
  }

  const changePage = (page) => {
    setPagination({ ...pagination, curPage: page })
  }

  const registerPayment = (e, dbt) => {
    e.preventDefault()
    setDebtor(dbt)
    setForm({
      customerId: dbt.id,
      balance: dbt.balance,
      credit: 0,
      paymentMethod: 0,
      date: setToday()
    })
    setShowModal(!showModal)
  }

  const toggleModal = (e) => {
    e.preventDefault()
    setError('')
    setShowModal(!showModal)
  }

  const handleChangeForm = (e) => {
    e.preventDefault()
    setError('')
    const { id, value } = e.target
    setForm({
      ...form,
      [id]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.credit < 1) {
      setError('Importe pagado no puede ser 0')
      return
    }
    if (form.paymentMethod === 0) {
      setError('Debe elegir un método de pago')
      return
    }

    if (form.credit > form.balance) {
      setError('El importe pagado no debe ser mayor que el importe a pagar')
      return
    }

    savePayment(form).then(() => {
      const pag = pagination
      getDebtors(pagination).then((dbts) => {
        pag.totRecords = dbts.count.length
        setPagination(pag)
        setDebtors(dbts)
      })
    })

    setShowModal(!showModal)
  }

  const totPages = Math.ceil(pagination.totRecords / pagination.limit)
  const { rows } = debtors

  return (
    <>
      <div className="container-fluid">
        <h3>Deudores</h3>
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
              <th scope="col">Nombre</th>
              <th scope="col">Paciente</th>
              <th scope="col">Domicilio</th>
              <th scope="col">Teléfono</th>
              <th scope="col" className="text-right">
                Deuda
              </th>
              <th scope="col" style={{ minWidth: '120px' }} colSpan="2">
                &nbsp;
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((dbt) => (
              <tr key={dbt.id}>
                <td className="name text-uppercase">
                  <Link
                    to={{
                      pathname: `/clientes/${dbt.id}`,
                      state: { from: '/deudores' }
                    }}
                  >
                    {dbt.name}
                  </Link>
                </td>
                <td className="text-uppercase">
                  {dbt.pets.map((pet) => pet.name).join(', ')}
                </td>
                <td>{dbt.address}</td>
                <td>{dbt.phone}</td>
                <td className="text-right">{formatAmount(dbt.balance)}</td>
                <td className="text-right">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={(e) => registerPayment(e, dbt)}
                  >
                    Registrar pago
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <TableFooter total={total} />
        </table>
      </div>

      <Modal
        show={showModal}
        toggleModal={toggleModal}
        title={`Registro de pago de ${debtor.name}`}
        onSubmit={handleSubmit}
        error={error}
      >
        <div className="col-12 col-sm">
          <div className="form-group row">
            <label htmlFor="amount" className="col-sm-5 col-form-label">
              Total adeudado
              <div className="col-sm-7">
                <input
                  type="number"
                  className="form-control text-right"
                  readOnly
                  id="amount"
                  onChange={(e) => handleChangeForm(e)}
                  value={parseFloat(form.balance).toFixed(2)}
                />
              </div>
            </label>
          </div>
        </div>
        <div className="col-12 col-sm">
          <div className="form-group row">
            <label htmlFor="credit" className="col-sm-5 col-form-label">
              Importe a pagar
              <div className="col-sm-7">
                <input
                  type="number"
                  className="form-control text-right"
                  id="credit"
                  onChange={(e) => handleChangeForm(e)}
                  value={parseFloat(form.credit)}
                />
              </div>
            </label>
          </div>
        </div>
        <div className="col-12 col-sm">
          <div className="form-group row">
            <label htmlFor="paymentMethod" className="col-sm-5 col-form-label">
              Forma de pago
              <div className="col-sm-7">
                <select
                  className="form-control"
                  id="paymentMethod"
                  onChange={(e) => handleChangeForm(e)}
                  value={form.paymentMethod}
                >
                  {paymentMethods.map((method) => (
                    <option key={method.id} value={method.id}>
                      {' '}
                      {method.name}
                    </option>
                  ))}
                </select>
              </div>
            </label>
          </div>
        </div>
        <div className="col-12 col-sm">
          <div className="form-group row">
            <label htmlFor="date" className="col-sm-5 col-form-label">
              Fecha de pago
              <div className="col-sm-7">
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  onChange={(e) => handleChangeForm(e)}
                  value={form.date}
                />
              </div>
            </label>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Debtors
