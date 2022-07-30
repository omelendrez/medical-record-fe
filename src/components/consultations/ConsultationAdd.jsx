import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import FormFooter from '../FormFooter'
import { getPet } from '../../services/pets'
import { saveConsultation } from '../../services/consultations'
import { treatmentStage, setToday } from '../../helpers'

import FormActions from '../FormActions'
import './ConsultationForm.css'

function ConsultationForm(props) {
  const {
    location: { state },
    match: {
      params: { petId, customerId }
    }
  } = props || {}
  const [redirect, setRedirect] = useState('')
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    customerId,
    petId,
    date: setToday(),
    anamnesis: '',
    clinicalExamination: '',
    diagnosis: '',
    treatment: '',
    treatmentStage: 1,
    nextAppointment: '',
    amount: '0.00'
  })

  const [pet, setPet] = useState({})

  const goBack = () => {
    setRedirect({ pathname: `${state.from}`, state: { current: 'consultas' } })
  }

  useEffect(() => {
    getPet(petId).then((p) => setPet(p))
  }, [petId])

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

  const handleSave = (e) => {
    e.preventDefault()
    saveConsultation(form)
      .then(() => goBack())
      .catch((err) => {
        setError(err.response.data.error)
      })
  }
  if (redirect) {
    return <Redirect to={redirect} />
  }

  return (
    <div className="container-fluid  mb-3">
      <div className="row">
        <div className="container">
          <h5 className="my-3">Agregando Consulta de {pet.name}</h5>
          <form>
            <div className="form-container card p-3 mb-3">
              <div className="form-group row">
                <label htmlFor="anamnesis" className="col-sm-2 col-form-label">
                  Anamnesis
                </label>
                <div className="col-sm-10">
                  <textarea
                    className="form-control"
                    id="anamnesis"
                    onChange={(e) => handleChange(e)}
                    value={form.anamnesis}
                    rows="1"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="clinicalExamination"
                  className="col-sm-2 col-form-label"
                >
                  Examen clínico
                </label>
                <div className="col-sm-10">
                  <textarea
                    className="form-control"
                    id="clinicalExamination"
                    onChange={(e) => handleChange(e)}
                    value={form.clinicalExamination}
                    rows="1"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="diagnosis" className="col-sm-2 col-form-label">
                  Diagnóstico
                </label>
                <div className="col-sm-10">
                  <textarea
                    className="form-control"
                    id="diagnosis"
                    onChange={(e) => handleChange(e)}
                    value={form.diagnosis}
                    rows="1"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="treatment" className="col-sm-2 col-form-label">
                  Tratamiento
                </label>
                <div className="col-sm-10">
                  <textarea
                    className="form-control"
                    id="treatment"
                    onChange={(e) => handleChange(e)}
                    value={form.treatment}
                    rows="2"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="treatmentStage"
                  className="col-sm-2 col-form-label"
                >
                  Etapa tratamiento
                </label>
                <div className="col-sm-10">
                  <select
                    className="form-control"
                    id="treatmentStage"
                    onChange={(e) => handleChange(e)}
                    value={form.treatmentStage}
                  >
                    {treatmentStage.map((stage) => (
                      <option key={stage.id} value={stage.id}>
                        {stage.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <FormFooter form={form} handleChange={handleChange} />

            <FormActions
              doSave={(e) => handleSave(e)}
              cancelSave={() => goBack()}
              error={error}
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default ConsultationForm
