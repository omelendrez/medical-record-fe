import React from 'react'
import PropTypes from 'prop-types'
import Balance from './Balance'
import {
  formatDate,
  getTreatmentStage,
  formatDateFull,
  readOnly,
  getMimeType
} from '../../../helpers'

import './consultation.css'

function Consultation({
  consultation,
  editConsultation,
  deleteConsultation,
  editLabel,
  deleteLabel
}) {
  const {
    id,
    date,
    anamnesis,
    clinicalExamination,
    diagnosis,
    treatment,
    additionalExams,
    nextAppointment,
    amount,
    paid,
    vaccination,
    deworming,
    treatmentStage,
    customerId,
    petId,
    ext,
    description,
    userName,
    updatedAt
  } = consultation

  const fileName = `${customerId}-${petId}-${id}.${ext}`

  const url = `${process.env.REACT_APP_DOCUMENTS_URL}/additional-tests/${fileName}`

  const mimeType = ext ? getMimeType(ext) : null

  return (
    <div className="card consultation pb-2">
      <div className="card-body">
        <div className="float-right text-capitalize small">
          <div>{userName || ''}</div>
          <div>{formatDateFull(updatedAt)}</div>
        </div>
        {!readOnly() && amount > 0 && <Balance amount={amount} paid={paid} />}
        <h6 className="card-title">{formatDate(date)}</h6>
        {description && (
          <p className="card-text">
            <b>Documento</b>: {fileName}
          </p>
        )}

        {description && (
          <p className="card-text">
            <b>Descripción</b>: {description}
          </p>
        )}
        {description && (
          <figure>
            <object data={url} type={mimeType} className="document-preview">
              <embed src={url} type={mimeType} className="document-preview" />
            </object>
          </figure>
        )}
        {anamnesis && (
          <p className="card-text">
            <b>Anamnesis</b>: {anamnesis}
          </p>
        )}
        {clinicalExamination && (
          <p className="card-text">
            <b>Examen Clínico</b>: {clinicalExamination}
          </p>
        )}
        {diagnosis && (
          <p className="card-text">
            <b>Diagnóstico</b>: {diagnosis}
          </p>
        )}
        {treatment && (
          <p className="card-text">
            <b>Tratamiento</b>: {treatment}
          </p>
        )}
        {additionalExams && (
          <p className="card-text">
            <b>Estudios complementarios</b>: {additionalExams}
          </p>
        )}
        {vaccination && (
          <p className="card-text">
            <b>Vacunación</b>: {vaccination}
          </p>
        )}
        {deworming && (
          <p className="card-text">
            <b>Desparasitación</b>: {deworming}
          </p>
        )}
        {treatmentStage && (
          <p className="card-text">
            <b>Etapa tratamiento</b>: {getTreatmentStage(treatmentStage)}
          </p>
        )}
        {nextAppointment && (
          <h6 className="card-text">
            Próximo turno: <b>{formatDate(nextAppointment)}</b>
          </h6>
        )}
      </div>
      {!readOnly() && (
        <div className="mx-3">
          {!description && (
            <button
              type="button"
              className="btn btn-info m-1"
              onClick={() => editConsultation(id)}
            >
              {editLabel || 'Modificar'}
            </button>
          )}
          <button
            type="button"
            className="btn btn-danger m-1 float-right"
            onClick={() => deleteConsultation(consultation)}
          >
            {deleteLabel || 'Desactivar'}
          </button>
        </div>
      )}
    </div>
  )
}

Consultation.defaultProps = {
  editConsultation: undefined,
  deleteConsultation: undefined,
  editLabel: undefined,
  deleteLabel: undefined
}

Consultation.propTypes = {
  consultation: PropTypes.shape({
    id: PropTypes.number,
    customerId: PropTypes.number,
    petId: PropTypes.number,
    date: PropTypes.string,
    ext: PropTypes.string,
    description: PropTypes.string,
    anamnesis: PropTypes.string,
    clinicalExamination: PropTypes.string,
    diagnosis: PropTypes.string,
    treatment: PropTypes.string,
    additionalExams: PropTypes.string,
    nextAppointment: PropTypes.string,
    amount: PropTypes.number,
    paid: PropTypes.number,
    vaccination: PropTypes.string,
    deworming: PropTypes.string,
    treatmentStage: PropTypes.string,
    userName: PropTypes.string,
    updatedAt: PropTypes.string
  }).isRequired,
  editConsultation: PropTypes.func,
  deleteConsultation: PropTypes.func,
  editLabel: PropTypes.string,
  deleteLabel: PropTypes.string
}

export default Consultation
