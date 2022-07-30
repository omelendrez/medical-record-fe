import React from 'react'
import PropTypes from 'prop-types'

function Pagination({ pagination, changePage }) {
  const { curPage, totRecords, limit } = pagination
  const totPages = Math.ceil(totRecords / limit) || 1

  const canGoBackward = curPage > 1
  const canGoForward = curPage < totPages

  const pages = []
  for (let i = 1; i <= totPages; i += 1) {
    pages.push(i)
  }

  const handleChangePage = (page) => {
    changePage(page)
  }

  return (
    <nav aria-label="...">
      <ul className="pagination pagination-sm  justify-content-center">
        <li className={`page-item ${canGoBackward ? '' : 'disabled'}`}>
          <button
            type="button"
            className="page-link"
            onClick={() => handleChangePage(1)}
          >
            {'<<'}
          </button>
        </li>
        <li className={`page-item ${canGoBackward ? '' : 'disabled'}`}>
          <button
            type="button"
            className="page-link"
            onClick={() => handleChangePage(curPage - 1)}
          >
            {'<'}
          </button>
        </li>
        <li className="page-item disabled">
          <button type="button" className="page-link">
            {`Página ${curPage} de ${totPages}`}
          </button>
        </li>
        <li className={`page-item ${canGoForward ? '' : 'disabled'}`}>
          <button
            type="button"
            className="page-link"
            onClick={() => handleChangePage(curPage + 1)}
          >
            {'>'}
          </button>
        </li>
        <li className={`page-item ${canGoForward ? '' : 'disabled'}`}>
          <button
            type="button"
            className="page-link"
            onClick={() => handleChangePage(totPages)}
          >
            {'>>'}
          </button>
        </li>
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  pagination: PropTypes.instanceOf(Object).isRequired,
  changePage: PropTypes.func.isRequired
}

export default Pagination
