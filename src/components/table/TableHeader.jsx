import React from 'react'
import PropTypes from 'prop-types'
import Pagination from '../Pagination'
import { readOnly } from '../../helpers'
import './TableHeader.css'

export default function TableHeader({
  handleChange,
  filter,
  handleClick,
  pagination,
  changePage,
  handleRestore
}) {
  const smallDevice = window.innerWidth < 768
  return (
    <div className="table-header">
      <div>
        <input
          className="form-control"
          type="search"
          aria-label="Search"
          onChange={(e) => handleChange(e)}
          value={filter}
        />
      </div>
      <div>
        <button
          type="submit"
          className="btn btn-warning"
          onClick={(e) => handleClick(e)}
        >
          Buscar
        </button>
      </div>
      {!smallDevice && (
        <div>
          <Pagination pagination={pagination} changePage={changePage} />
        </div>
      )}

      {!readOnly() && handleRestore && (
        <div>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => handleRestore()}
          >
            Restaurar
          </button>
        </div>
      )}
    </div>
  )
}

TableHeader.defaultProps = {
  handleRestore: null
}

TableHeader.propTypes = {
  handleChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  pagination: PropTypes.instanceOf(Object).isRequired,
  changePage: PropTypes.func.isRequired,
  handleRestore: PropTypes.func
}
