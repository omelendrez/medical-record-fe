import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import { getPet } from '../../services/pets'
import { saveDocument, uploadDocument } from '../../services/documents'
import { MIME_TYPES, setToday } from '../../helpers'

import FormActions from '../FormActions'
import './DocumentForm.css'

function DocumentAdd(props) {
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
    description: '',
    ext: ''
  })

  const [pet, setPet] = useState({})
  const [selectedFile, setSelectedFile] = useState(null)

  const goBack = () => {
    setRedirect({ pathname: `${state.from}`, state: { current: 'documentos' } })
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

  const handleFileChange = (e) => {
    e.preventDefault()
    if (e.target.files) {
      const file = e.target.files[0]
      setSelectedFile(file)
      const ext = file.name.split('.').pop()
      setForm((f) => ({ ...f, ext }))
    }
  }

  const handleSave = (e) => {
    e.preventDefault()

    saveDocument(form)
      .then((res) => {
        const { id } = res.record
        const name = `${customerId}-${petId}-${id}`

        const formData = new FormData()
        formData.append('file', selectedFile)
        formData.append('name', name)

        uploadDocument(formData)
          .then(() => {
            goBack()
          })
          .catch((err) => {
            setError(err.response.data.error)
          })
      })
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
          <h5 className="my-3">
            Agregando Examen Complementario de {pet.name}
          </h5>
          <form>
            <div className="form-container card p-3 mb-3">
              <div className="form-group row">
                <label
                  htmlFor="description"
                  className="col-sm-2 col-form-label"
                >
                  Descripción del documento
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    style={{ width: '60%' }}
                    id="description"
                    onChange={(e) => handleChange(e)}
                    value={form.description}
                  />
                  <input
                    disabled={!form.description}
                    onChange={(e) => handleFileChange(e)}
                    type="file"
                    accept={MIME_TYPES.map((m) => m.type).join(',')}
                    className="mt-3"
                  />
                </div>
              </div>
            </div>

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

export default DocumentAdd
