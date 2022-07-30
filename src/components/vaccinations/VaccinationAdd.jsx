import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import FormFooter from '../FormFooter'
import FormActions from '../FormActions'
import Checkbox from '../Checkbox'
import { getPet } from '../../services/pets'
import { saveVaccination } from '../../services/vaccinations'
import { vaccinesList, setToday } from '../../helpers'
import './VaccinationForm.css'

function VaccinationAdd(props) {
  const [redirect, setRedirect] = useState('')
  const [error, setError] = useState('')
  const [pet, setPet] = useState({})
  const {
    match: {
      params: { customerId, petId }
    }
  } = props || {}
  const vaccinesState = vaccinesList.map((vac) => {
    const newVac = { ...vac, checked: false }
    return newVac
  })
  const [form, setForm] = useState({
    customerId,
    petId,
    date: setToday(),
    nextAppointment: '',
    amount: '0.00',
    vaccinesState
  })

  const goBack = () => {
    const {
      location: { state }
    } = props || {}
    setRedirect({
      pathname: `${state.from}`,
      state: { current: 'vacunaciones' }
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
    const { id, value } = e.target
    setForm({
      ...form,
      [id]: value
    })
  }

  const handleCheckbox = (e) => {
    if (error) {
      setError(false)
    }
    const { id } = e.target
    const { vaccinesState: newVaccinesState } = form
    const newState = newVaccinesState.map((vac) => ({
      ...vac,
      checked: vac.id === parseInt(id, 10) ? !vac.checked : vac.checked
    }))
    setForm({
      ...form,
      vaccinesState: newState
    })
  }

  const handleSave = (e) => {
    e.preventDefault()
    const vaccines = form.vaccinesState
      .filter((vac) => vac.checked)
      .map((vac) => vac.name)
    if (!vaccines.length) {
      return setError('Debe seleccionar por lo menos una vacuna')
    }
    form.vaccination = vaccines.join(', ')
    return saveVaccination(form)
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
            <h5 className="my-3">{`Agregando Vacunación para ${pet.name}`}</h5>
            <form>
              <div className="form-container card p-3 mb-3">
                <div className="form-group row">
                  <div className="col-sm-2 col-form-label">Vacunas</div>
                  <div className="col-sm-10">
                    {vaccinesList.map((vaccine) => (
                      <Checkbox
                        key={vaccine.id}
                        id={vaccine.id}
                        label={vaccine.name}
                        handleChange={handleCheckbox}
                      />
                    ))}
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

export default VaccinationAdd
