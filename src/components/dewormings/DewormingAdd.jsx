import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import FormFooter from '../FormFooter'
import { getPet } from '../../services/pets'
import { saveDeworming } from '../../services/dewormings'
import { setToday } from '../../helpers'
import FormActions from '../FormActions'
import './DewormingForm.css'

function DewormingForm(props) {
  const {
    location,
    match: {
      params: { customerId, petId }
    }
  } = props || {}
  const [redirect, setRedirect] = useState('')
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    customerId,
    petId,
    date: setToday(),
    deworming: '',
    nextAppointment: '',
    amount: '0.00'
  })
  const [pet, setPet] = useState({})

  const goBack = () => {
    const { state } = location
    setRedirect({
      pathname: `${state.from}`,
      state: { current: 'desparasitaciones' }
    })
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
    saveDeworming(form)
      .then(() => goBack())
      .catch((err) => {
        setError(err.response.data.error)
      })
  }

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <div className="container-fluid">
        <div className="row">
          <div className="container">
            <h5 className="my-3">{`Agregando Desparasitación de ${pet.name}`}</h5>
            <form>
              <div className="form-container card p-3 mb-3">
                <div className="form-group row">
                  <label
                    htmlFor="deworming"
                    className="col-sm-2 col-form-label"
                  >
                    Desparasitación
                  </label>
                  <div className="col-sm-10">
                    <textarea
                      className="form-control"
                      id="deworming"
                      onChange={(e) => handleChange(e)}
                      value={form.deworming}
                      rows="2"
                    />
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
    </>
  )
}

export default DewormingForm
