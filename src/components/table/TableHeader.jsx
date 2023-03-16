import React from 'react'
import PropTypes from 'prop-types'
import Pagination from '../Pagination'
import { readOnly } from '../../helpers'
import './TableHeader.css'

export default function TableHeader({
  filterFields,
  onChange,
  onFieldChange,
  filter,
  filterField,
  handleClick,
  pagination,
  changePage,
  handleRestore
}) {
  const smallDevice = window.innerWidth < 768

  const handleFilterChange = (e) => {
    onChange(e)
  }

  const handleFilterFieldChange = (e) => {
    onFieldChange(e)
  }

  return (
    <div className="table-header">
      <div className="form-inline">
        {filterFields.length > 0 && (
          <div className="input-group-prepend">
            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Buscar por </button>
            <div className="dropdown-menu" onClick={handleFilterFieldChange}>
              {filterFields.map((fld) => (
                <button type="button" key={fld.id} id={fld.id} className={`dropdown-item ${fld.id === filterField ? 'active' : ''}`}>{fld.label}</button>
              ))}
            </div>
          </div>
        )}
        <input
          className="form-control"
          type="search"
          aria-label="Search"
          onChange={handleFilterChange}
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
      {
        !smallDevice && (
          <div>
            <Pagination pagination={pagination} changePage={changePage} />
          </div>
        )
      }

      {
        !readOnly() && handleRestore && (
          <div>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => handleRestore()}
            >
              Restaurar
            </button>
          </div>
        )
      }
    </div>
  )
}

TableHeader.defaultProps = {
  handleRestore: null,
  onFieldChange: null,
  filterFields: [],
  filterField: ''
}

TableHeader.propTypes = {
  filterFields: PropTypes.instanceOf(Array),
  onChange: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func,
  filter: PropTypes.string.isRequired,
  filterField: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  pagination: PropTypes.instanceOf(Object).isRequired,
  changePage: PropTypes.func.isRequired,
  handleRestore: PropTypes.func
}
