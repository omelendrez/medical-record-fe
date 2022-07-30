import React from 'react'
import PropTypes from 'prop-types'

function FormActions({ doSave, cancelSave, error }) {
  return (
    <>
      <button type="submit" className="btn btn-primary" onClick={doSave}>
        Guardar
      </button>

      <button
        type="button"
        className="btn btn-danger float-right"
        onClick={cancelSave}
      >
        Volver
      </button>

      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}
    </>
  )
}

FormActions.propTypes = {
  doSave: PropTypes.func.isRequired,
  cancelSave: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired
}

export default FormActions
