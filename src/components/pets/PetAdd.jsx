import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { savePet } from '../../services/pets'
import {
  sexList,
  getDateFromDays,
  getDateFromMonths,
  getDateFromYears
} from '../../helpers'
import FormActions from '../FormActions'

function PetForm(props) {
  const [back, setBack] = useState(false)
  const [error, setError] = useState('')
  const {
    match: {
      params: { id }
    }
  } = props || {}
  const [form, setForm] = useState({
    customerId: id,
    name: '',
    type: '',
    sex: '',
    breed: '',
    observations: '',
    days: ''
  })

  const handleChange = (e) => {
    e.preventDefault()
    if (error) {
      setError(false)
    }
    setForm({
      ...form,
      [e.target.id]: e.target.value
    })
  }

  const handleYearsChange = (e) => {
    e.preventDefault()
    const birthDate = getDateFromYears(e.target.value)
    setForm({
      ...form,
      birthDate,
      years: e.target.value,
      months: '',
      days: ''
    })
  }

  const handleMonthsChange = (e) => {
    e.preventDefault()
    const birthDate = getDateFromMonths(e.target.value)
    setForm({
      ...form,
      birthDate,
      years: '',
      months: e.target.value,
      days: ''
    })
  }

  const handleDaysChange = (e) => {
    e.preventDefault()
    const birthDate = getDateFromDays(e.target.value)
    setForm({
      ...form,
      birthDate,
      years: '',
      months: '',
      days: e.target.value
    })
  }

  const handleSave = (e) => {
    e.preventDefault()
    savePet(form)
      .then(() => setBack(true))
      .catch((err) => {
        setError(err.response.data.error)
      })
  }
  if (back) {
    return <Redirect to={`/clientes/${id}`} />
  }

  return (
    <div className="container">
      <div className="row">
        <div className="container col-lg-8">
          <h1 className="my-3">Nuevo Paciente</h1>
          <form>
            <div className="form-row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="name">Nombre del Paciente</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={(e) => handleChange(e)}
                    value={form.name}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="type">Tipo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="type"
                    onChange={(e) => handleChange(e)}
                    value={form.type}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="breed">Raza</label>
                  <input
                    type="text"
                    className="form-control"
                    id="breed"
                    onChange={(e) => handleChange(e)}
                    value={form.breed}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="sex">Sexo</label>
                  <select
                    className="form-control"
                    id="sex"
                    onChange={(e) => handleChange(e)}
                    value={form.sex}
                  >
                    {sexList.map((sex) => (
                      <option key={sex.id} value={sex.id}>
                        {sex.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="weight">Peso</label>
                  <input
                    type="text"
                    className="form-control"
                    id="weight"
                    onChange={(e) => handleChange(e)}
                    value={form.weight}
                    required
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="birthDate">Nacimiento</label>
                  <input
                    type="date"
                    className="form-control"
                    id="birthDate"
                    onChange={(e) => handleChange(e)}
                    value={form.birthDate}
                    required
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <label htmlFor="years">Edad en años</label>
                  <input
                    type="number"
                    id="years"
                    className="form-control"
                    value={form.years}
                    onChange={(e) => handleYearsChange(e)}
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <label htmlFor="months">Edad en meses</label>
                  <input
                    type="number"
                    id="months"
                    className="form-control"
                    value={form.months}
                    onChange={(e) => handleMonthsChange(e)}
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <label htmlFor="days">Edad en días</label>
                  <input
                    type="number"
                    id="days"
                    className="form-control"
                    value={form.days}
                    onChange={(e) => handleDaysChange(e)}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="observations">Observaciones</label>
              <textarea
                className="form-control"
                id="observations"
                onChange={(e) => handleChange(e)}
                value={form.observations}
              />
            </div>

            <FormActions
              doSave={(e) => handleSave(e)}
              cancelSave={() => setBack(true)}
              error={error}
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default PetForm
