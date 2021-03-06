import React from 'react'
import Pagination from '../Pagination'
import { readOnly } from '../../services/utils'
import './TableHeader.css'

export default function TableHeader({ handleChange, filter, handleClick, totPages, pagination, changePage, handleRestore }) {
  const smallDevice = (window.innerWidth < 768)
  return (
    <div className="table-header">
      <div>
        <input
          className="form-control"
          type="search"
          aria-label="Search"
          onChange={e => handleChange(e)}
          value={filter}
        />
      </div>
      <div>
        <button
          className="btn btn-warning"
          onClick={e => handleClick(e)}
        >Buscar</button>
      </div>
      {!smallDevice &&
        <div>
          {totPages > 1 && <Pagination pagination={pagination} changePage={changePage} />}
        </div>
      }

      {!readOnly() && handleRestore &&
        <div>
          <button
            className="btn btn-outline-secondary"
            onClick={() => handleRestore()}>
            Restaurar
            </button>
        </div>
      }
    </div>
  )
}
