import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import Consultation from './Consultation'
import Confirm from '../../Confirm'
import PDFGenerator from './PDFGenerator'
import {
  getConsultationsByPet,
  deleteConsultation
} from '../../../services/consultations'
import {
  getVaccinationsByPet,
  deleteVaccination
} from '../../../services/vaccinations'
import {
  getDewormingsByPet,
  deleteDeworming
} from '../../../services/dewormings'
import {
  getDocumentsByPet,
  deleteDocument,
  deleteFile
} from '../../../services/documents'

import { formatDate } from '../../../helpers'

function Consultations({ customer, pet, current }) {
  const [redirect, setRedirect] = useState('')
  const [selected, setSelected] = useState({})
  const [showConfirm, setShowConfirm] = useState(false)
  const [records, setRecords] = useState({ rows: [], count: 0 })
  const [isDocument, setIsDocument] = useState(false)

  useEffect(() => {
    const getData = async () => {
      let rec
      setIsDocument(false)
      switch (current) {
        case 'consultas':
          rec = await getConsultationsByPet(pet.id)
          setRecords(rec)
          break
        case 'vacunaciones':
          rec = await getVaccinationsByPet(pet.id)
          setRecords(rec)
          break
        case 'desparasitaciones':
          rec = await getDewormingsByPet(pet.id)
          setRecords(rec)
          break
        case 'documentos':
          rec = await getDocumentsByPet(pet.id)
          setRecords(rec)
          setIsDocument(true)
          break
        case 'descarga-historial-medico': {
          const consultas = await getConsultationsByPet(pet.id)
          const vacunaciones = await getVaccinationsByPet(pet.id)
          const desparasitaciones = await getDewormingsByPet(pet.id)
          rec = { consultas, vacunaciones, desparasitaciones }
          setRecords(rec)
          break
        }
        default:
      }
    }
    getData()
  }, [pet.id, current])

  const handleEditConsultation = (id) => {
    let pathName = ''
    switch (current) {
      case 'consultas':
        pathName = `/edit-consulta/${id}`
        break
      case 'vacunaciones':
        pathName = `/edit-vacunacion/${id}`
        break
      case 'desparasitaciones':
        pathName = `/edit-desparasitacion/${id}`
        break
      default:
    }

    setRedirect({
      pathname: pathName,
      state: {
        from: `/clientes/${pet.customerId}/${pet.id}`
      }
    })
  }

  const handleDeleteConsultation = (consultation) => {
    setSelected(consultation)
    setShowConfirm(true)
  }
  const fileName = `${pet.id}-${selected.id}.pdf`

  const confirmDelete = () => {
    switch (current) {
      case 'consultas':
        deleteConsultation(selected).then(() =>
          getConsultationsByPet(pet.id).then((rec) => {
            setRecords(rec)
            setShowConfirm(false)
          })
        )
        break
      case 'vacunaciones':
        deleteVaccination(selected).then(() =>
          getVaccinationsByPet(pet.id).then((rec) => {
            setRecords(rec)
            setShowConfirm(false)
          })
        )
        break
      case 'desparasitaciones':
        deleteDeworming(selected).then(() =>
          getDewormingsByPet(pet.id).then((rec) => {
            setRecords(rec)
            setShowConfirm(false)
          })
        )
        break
      case 'documentos':
        deleteFile(fileName).then(() =>
          deleteDocument(selected).then(() =>
            getDocumentsByPet(pet.id).then((rec) => {
              setRecords(rec)
              setShowConfirm(false)
            })
          )
        )
        break
      default:
    }
  }

  const { count, rows } = records

  return (
    <>
      {redirect && <Redirect to={redirect} />}

      <div className="consultations">
        {showConfirm && (
          <Confirm
            title="Desactivando visita"
            question={`¿Desea desactivar visita del ${formatDate(
              selected.date
            )} del paciente ${pet.name}?`}
            okButton="Desactivar"
            cancelButton="Cancelar"
            cancelDelete={() => setShowConfirm(false)}
            confirmDelete={() => confirmDelete()}
          />
        )}
        {current === 'descarga-historial-medico' ? (
          <PDFGenerator data={records} pet={pet} customer={customer} />
        ) : (
          !count &&
          current && (
            <div className="container text-center">
              <div className="alert alert-warning">{`El paciente no registra ${current}`}</div>
            </div>
          )
        )}
        <div className="consultations-list overflow-auto">
          {rows &&
            rows.map((consultation) => (
              <Consultation
                key={consultation.id}
                consultation={consultation}
                editConsultation={!isDocument ? handleEditConsultation : null}
                deleteConsultation={handleDeleteConsultation}
                deleteLabel={isDocument ? 'Eliminar' : null}
              />
            ))}
        </div>
      </div>
    </>
  )
}

Consultations.propTypes = {
  customer: PropTypes.instanceOf(Object).isRequired,
  pet: PropTypes.instanceOf(Object).isRequired,
  current: PropTypes.string.isRequired
}

export default Consultations
