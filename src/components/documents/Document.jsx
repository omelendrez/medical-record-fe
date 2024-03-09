import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { formatDate, formatDateFull } from '../../helpers'
import TableActions from '../table/TableActions'
import './document.css'

function Document({
  data,
  deleteDocument,
  editDocument,
  deleteLabel,
  editLabel
}) {
  const {
    id,
    date,
    petName,
    customerName,
    description,
    petId,
    customerId,
    ext,
    updatedAt,
    userName
  } = data

  const fileName = `${customerId}-${petId}-${id}.${ext}`

  const url = `${process.env.REACT_APP_DOCUMENTS_URL}/additional-tests/${fileName}`

  return (
    <tr className="document-row">
      <td className="text-nowrap">{formatDate(date)}</td>
      <td className="text-uppercase">{customerName}</td>
      <td className="text-uppercase">
        <Link
          to={{
            pathname: `/clientes/${customerId}/${petId}`,
            state: { current: 'consultas' }
          }}
        >
          {petName}
        </Link>
      </td>
      <td className="file-name">{fileName}</td>
      <td>{description}</td>

      <td>
        <a href={url} target="_blank" rel="noreferrer">
          <span className="material-icons view-pdf" title="Ver">
            visibility
          </span>
        </a>
      </td>

      <td className="text-center text-capitalize small">
        <div>{userName || ''}</div>
        <div>{formatDateFull(updatedAt)}</div>
      </td>
      <TableActions
        actionDelete={deleteDocument}
        deleteLabel={deleteLabel}
        actionEdit={editDocument}
        editLabel={editLabel}
        data={data}
      />
    </tr>
  )
}

Document.defaultProps = {
  deleteDocument: undefined,
  editDocument: undefined,
  deleteLabel: undefined,
  editLabel: undefined
}

Document.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  deleteDocument: PropTypes.func,
  editDocument: PropTypes.func,
  deleteLabel: PropTypes.string,
  editLabel: PropTypes.string
}

export default React.memo(Document)
