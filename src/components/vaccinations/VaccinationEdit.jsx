import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import FormFooter from '../FormFooter'
import FormActions from '../FormActions'
import Checkbox from '../Checkbox'
import { getPet } from '../../services/pets'
import { saveVaccination, getVaccination } from '../../services/vaccinations'
import { vaccinesList } from '../../helpers'
import './VaccinationForm.css'

function VaccinationEdit(props) {
  const [redirect, setRedirect] = useState('')
  const [error, setError] = useState('')
  const [pet, setPet] = useState({})
  const vaccinesState = vaccinesList.map((vaccine) => ({
    ...vaccine,
    checked: false
  }))
  const [form, setForm] = useState({
    id: '',
    customerId: '',
    petId: '',
    date: '',
    nextAppointment: '',
    amount: '',
    vaccinesState
  })

  useEffect(() => {
    const {
      match: {
        params: { id }
      }
    } = props || {}
    getVaccination(id).then((vac) => {
      const vaccinesUsed = vac.vaccination.split(', ')
      const newVaccinesState = vaccinesState.map((vaccine) => ({
        ...vaccine,
        checked: Boolean(vaccinesUsed.find((name) => name === vaccine.name))
      }))
      setForm({ ...vac, vaccinesState: newVaccinesState })
      getPet(vac.petId).then((newPet) => setPet(newPet))
    })
    // eslint-disable-next-line
  }, [props.match.params.vaccinationId])

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

  const goBack = () => {
    const {
      location: { state }
    } = props || {}
    setRedirect({
      pathname: `${state?.from}`,
      state: { current: 'vacunaciones' }
    })
  }

  const handleSave = (e) => {
    e.preventDefault()
    const vac = form.vaccinesState
      .filter((vaccine) => vaccine.checked)
      .map((vaccine) => vaccine.name)
    if (!vac.length) {
      return setError('Debe seleccionar por lo menos una vacuna')
    }
    form.vaccination = vac.join(', ')
    return saveVaccination(form)
      .then(() => goBack())
      .catch((err) => {
        setError(err.response.data.error)
      })
  }
  if (redirect) {
    return <Redirect to={redirect} />
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="container">
          <h5 className="my-3">
            Editando Vacunación de
            {pet.name}
          </h5>
          <form>
            <div className="form-container card p-3 mb-3">
              <div className="form-group row">
                <div className="col-sm-2 col-form-label">Vacunas</div>
                <div className="col-sm-10">
                  {vaccinesList.map((vac) => (
                    <Checkbox
                      key={vac.id}
                      id={vac.id}
                      label={vac.name}
                      handleChange={handleCheckbox}
                      checked={
                        form.vaccinesState.find((v) => v.id === vac.id).checked
                      }
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
  )
}

export default VaccinationEdit
