import React from 'react'
import PropTypes from 'prop-types'
import { readOnly } from '../../helpers'

function TableActions({ data, actionDelete, actionEdit }) {
  if (readOnly()) return null
  return (
    <>
      <td style={{ width: '120px' }}>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => actionDelete(data)}
        >
          Desactivar
        </button>
      </td>
      <td style={{ width: '120px' }}>
        <button
          type="button"
          className="btn btn-info"
          onClick={() => actionEdit(data)}
        >
          Modificar
        </button>
      </td>
    </>
  )
}

TableActions.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  actionDelete: PropTypes.func.isRequired,
  actionEdit: PropTypes.func.isRequired
}

export default React.memo(TableActions)
