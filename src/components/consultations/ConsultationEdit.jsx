import React, { useState, useEffect } from 'react'
import FormFooter from '../FormFooter'
import { getPet } from '../../services/pets'
import { Redirect } from 'react-router-dom'
import { saveConsultation, getConsultation } from '../../services/consultations'
import { treatmentStage } from '../../services/utils'
import FormActions from '../FormActions'
import './ConsultationForm.css'

const ConsultationForm = props => {
  const [redirect, setRedirect] = useState('')
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    id: '',
    customerId: '',
    petId: '',
    date: '',
    anamnesis: '',
    diagnosis: '',
    treatment: '',
    treatmentStage: '{}',
    nextAppointment: '',
    amount: ''
  })

  const [pet, setPet] = useState({})

  useEffect(() => {
    getConsultation(props.match.params.consultationId)
      .then(consultation => {
        setForm(consultation)
        getPet(consultation.petId)
          .then(pet => setPet(pet))
      })
  }, [props.match.params.consultationId])


  const handleChange = (e => {
    e.preventDefault()
    error && setError(false)
    let { id, value } = e.target
    setForm({
      ...form,
      [id]: value
    })
  })

  const handleSave = (e => {
    e.preventDefault()
    saveConsultation(form)
      .then(() => goBack())
      .catch(err => {
        setError(err.response.data.error)
      })
  })

  const goBack = () => {
    const { state } = props.location
    setRedirect({ pathname: `${state.from}`, state: { current: 'consultas' } })
  }

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <div className="container-fluid">
        <div className="row">
          <div className="container">
            <h5 className="my-3">Editando Historia Clínica de {pet.name}</h5>
            <form>

              <div className="form-container card p-3 mb-3">
                <div className="form-group row">
                  <label htmlFor="anamnesis" className="col-sm-2 col-form-label">Anamnesis</label>
                  <div className="col-sm-10">
                    <textarea
                      className="form-control"
                      id="anamnesis"
                      onChange={e => handleChange(e)}
                      value={form.anamnesis}
                      rows="1"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="clinicalExamination" className="col-sm-2 col-form-label">Examen clínico</label>
                  <div className="col-sm-10">
                    <textarea
                      className="form-control"
                      id="clinicalExamination"
                      onChange={e => handleChange(e)}
                      value={form.clinicalExamination}
                      rows="1"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="diagnosis" className="col-sm-2 col-form-label">Diagnóstico</label>
                  <div className="col-sm-10">
                    <textarea
                      className="form-control"
                      id="diagnosis"
                      onChange={e => handleChange(e)}
                      value={form.diagnosis}
                      rows="1"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="treatment" className="col-sm-2 col-form-label">Tratamiento</label>
                  <div className="col-sm-10">
                    <textarea
                      className="form-control"
                      id="treatment"
                      onChange={e => handleChange(e)}
                      value={form.treatment}
                      rows="2"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="treatmentStage" className="col-sm-2 col-form-label">Etapa tratamiento</label>
                  <div className="col-sm-10">
                    <select
                      className="form-control"
                      id="treatmentStage"
                      onChange={e => handleChange(e)}
                      value={form.treatmentStage}
                    >
                      {treatmentStage.map(treatmentStage => {
                        return (
                          <option key={treatmentStage.id} value={treatmentStage.id}>
                            {treatmentStage.name}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>
              </div>

              <FormFooter form={form} handleChange={handleChange} />

              <FormActions
                doSave={e => handleSave(e)}
                cancelSave={() => goBack()}
                error={error}
              />

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConsultationForm
