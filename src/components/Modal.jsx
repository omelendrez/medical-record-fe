import React from 'react'
import PropTypes from 'prop-types'
import './Modal.css'

function Modal(props) {
  const {
    show,
    toggleModal,
    title,
    onSubmit,
    onCancel,
    error,
    children,
    okLabel,
    cancelLabel
  } = props
  const style = { display: show ? 'block' : 'none' }

  return (
    <div className="local-modal" style={style}>
      <div className="local-modal-content p-4  col-lg-8">
        <div className="local-modal-header">
          <span className="close" onClick={toggleModal}>
            &times;
          </span>
          <h5>{title}</h5>
        </div>
        <div className="local-modal-body my-5">{children}</div>
        <div className="local-modal-footer">
          <button type="button" className="btn btn-primary" onClick={onSubmit}>
            {okLabel}
          </button>
          <button
            type="button"
            className="btn btn-danger float-right ml-1"
            onClick={onCancel || toggleModal}
          >
            {cancelLabel}
          </button>
        </div>
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}

Modal.defaultProps = {
  okLabel: 'Guardar',
  cancelLabel: 'Volver',
  onCancel: null
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  error: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  okLabel: PropTypes.string,
  cancelLabel: PropTypes.string
}

export default Modal
