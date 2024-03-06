import React from 'react'
import PropTypes from 'prop-types'
import { readOnly } from '../../helpers'

function TableActions({
  data,
  actionDelete,
  deleteLabel,
  actionEdit,
  editLabel
}) {
  if (readOnly()) return null
  return (
    <>
      <td style={{ width: '120px', paddingLeft: '1rem' }}>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => actionDelete(data)}
        >
          {deleteLabel || 'Desactivar'}
        </button>
      </td>
      <td style={{ width: '120px' }}>
        {actionEdit && (
          <button
            type="button"
            className="btn btn-info"
            onClick={() => actionEdit(data)}
          >
            {editLabel || 'Modificar'}
          </button>
        )}{' '}
      </td>
    </>
  )
}

TableActions.defaultProps = {
  deleteLabel: undefined,
  actionDelete: undefined,
  editLabel: undefined,
  actionEdit: undefined
}

TableActions.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  actionDelete: PropTypes.func,
  deleteLabel: PropTypes.string,
  actionEdit: PropTypes.func,
  editLabel: PropTypes.string
}

export default React.memo(TableActions)
