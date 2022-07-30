import React from 'react'
import PropTypes from 'prop-types'
import Balance from './Balance'
import {
  formatDate,
  getTreatmentStage,
  formatDateFull,
  readOnly
} from '../../../helpers'

function Consultation({ consultation, editConsultation, deleteConsultation }) {
  const {
    id,
    date,
    anamnesis,
    clinicalExamination,
    diagnosis,
    treatment,
    nextAppointment,
    amount,
    paid,
    vaccination,
    deworming,
    treatmentStage,
    userName,
    updatedAt
  } = consultation

  return (
    <div className="card consultation pb-2">
      <div className="card-body">
        <div className="float-right text-capitalize small">
          <div>{userName || ''}</div>
          <div>{formatDateFull(updatedAt)}</div>
        </div>
        {!readOnly() && amount > 0 && <Balance amount={amount} paid={paid} />}
        <h6 className="card-title">{formatDate(date)}</h6>
        {anamnesis && (
          <p className="card-text">
            <b>Anamnesis</b>: {anamnesis}
          </p>
        )}
        {clinicalExamination && (
          <p className="card-text">
            <b>Examen Clinico</b>: {clinicalExamination}
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
          <button
            type="button"
            className="btn btn-info m-1"
            onClick={() => editConsultation(id)}
          >
            Modificar
          </button>
          <button
            type="button"
            className="btn btn-danger m-1 float-right"
            onClick={() => deleteConsultation(consultation)}
          >
            Desactivar
          </button>
        </div>
      )}
    </div>
  )
}

Consultation.propTypes = {
  consultation: PropTypes.shape({
    id: PropTypes.number,
    date: PropTypes.string,
    anamnesis: PropTypes.string,
    clinicalExamination: PropTypes.string,
    diagnosis: PropTypes.string,
    treatment: PropTypes.string,
    nextAppointment: PropTypes.string,
    amount: PropTypes.number,
    paid: PropTypes.number,
    vaccination: PropTypes.string,
    deworming: PropTypes.string,
    treatmentStage: PropTypes.string,
    userName: PropTypes.string,
    updatedAt: PropTypes.string
  }).isRequired,
  editConsultation: PropTypes.func.isRequired,
  deleteConsultation: PropTypes.func.isRequired
}

export default Consultation
