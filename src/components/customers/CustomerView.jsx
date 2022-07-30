import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import Customer from './customer-view/Customer'
import Consultations from './customer-view/Consultations'
import { getCustomer, getDebt } from '../../services/customers'
import { getPet } from '../../services/pets'
import { readOnly } from '../../helpers'
import './CustomerView.css'

function TabItem({ option, title, current, setCurrent, className }) {
  return (
    <li className={`nav-item ${className}`}>
      <a
        href="/"
        className={`nav-link ${option === current ? 'active' : ''}`}
        onClick={(e) => {
          e.preventDefault()
          setCurrent(option)
        }}
      >
        {title}
      </a>
    </li>
  )
}

function CustomerView(props) {
  const [redirect, setRedirect] = useState('')
  const [customer, setCustomer] = useState({ pets: [] })
  const [pet, setPet] = useState({})
  const [debt, setDebt] = useState({})
  const {
    location: { state },
    match: {
      params: { petId, id }
    }
  } = props || {}
  const [current, setCurrent] = useState('consultas')

  const setBack = () => {
    if (state) return setRedirect(state.from)
    setPet({})
    if (!petId) {
      return setRedirect('/clientes')
    }
    return setRedirect(`/clientes/${customer.id}`)
  }

  const loadPet = (p) => {
    setRedirect(`/clientes/${customer.id}/${p.id}`)
  }

  const selectPet = (p) => {
    getPet(p.id).then((newPet) => setPet(newPet))
  }

  useEffect(() => {
    if (state && state.current) {
      setCurrent(state.current)
    } else {
      setCurrent('consultas')
    }

    getCustomer(id).then((cust) => {
      setCustomer(cust)
      const p = { id: petId }
      if (petId) {
        selectPet(p)
      }
    })
  }, [props])

  useEffect(() => {
    getDebt(id).then((dbt) => setDebt(dbt))
  }, [id])

  const handleAddConsultation = () => {
    setRedirect({
      pathname: `/nueva-consulta/${customer.id}/${pet.id}`,
      state: {
        from: `/clientes/${customer.id}/${pet.id}`
      }
    })
  }

  const handleAddVaccination = () => {
    setRedirect({
      pathname: `/nueva-vacunacion/${customer.id}/${pet.id}`,
      state: {
        from: `/clientes/${customer.id}/${pet.id}`
      }
    })
  }

  const handleAddDeworming = () => {
    setRedirect({
      pathname: `/nueva-desparasitacion/${customer.id}/${pet.id}`,
      state: {
        from: `/clientes/${customer.id}/${pet.id}`
      }
    })
  }

  const handleAddPet = (e) => {
    e.preventDefault()
    setRedirect(`/nuevo-paciente/${customer.id}`)
  }

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <div className="main-container">
        <Customer
          customer={customer}
          pet={pet}
          handleAddPet={handleAddPet}
          loadPet={loadPet}
          setBack={setBack}
          debt={debt}
          current={current}
        />
        {pet.id && (
          <div className="m-1 w-100">
            <div className="d-flex justify-content-between">
              <ul className="nav nav-tabs">
                <TabItem
                  option="consultas"
                  title="Consultas"
                  current={current}
                  setCurrent={setCurrent}
                />
                <TabItem
                  option="vacunaciones"
                  title="Vacunaciones"
                  current={current}
                  setCurrent={setCurrent}
                />
                <TabItem
                  option="desparasitaciones"
                  title="Desparasitaciones"
                  current={current}
                  setCurrent={setCurrent}
                />
                <TabItem
                  className="d-none d-sm-block"
                  option="descarga-historial-medico"
                  title="Historial Clínico"
                  current={current}
                  setCurrent={setCurrent}
                />
              </ul>
              {!readOnly() && (
                <div className="flex-last">
                  {current === 'consultas' && (
                    <button
                      type="button"
                      className="btn btn-primary btn-block"
                      onClick={(e) => handleAddConsultation(e)}
                    >
                      + Consulta
                    </button>
                  )}
                  {current === 'vacunaciones' && (
                    <button
                      type="button"
                      className="btn btn-primary btn-block"
                      onClick={(e) => handleAddVaccination(e)}
                    >
                      + Vacunación
                    </button>
                  )}
                  {current === 'desparasitaciones' && (
                    <button
                      type="button"
                      className="btn btn-primary btn-block"
                      onClick={(e) => handleAddDeworming(e)}
                    >
                      + Desparasitación
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="mt-1">
              <Consultations pet={pet} current={current} customer={customer} />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

TabItem.propTypes = {
  option: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  current: PropTypes.string.isRequired,
  setCurrent: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired
}

export default CustomerView
