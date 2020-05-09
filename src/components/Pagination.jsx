import React from 'react'

const Pagination = ({ pagination, changePage }) => {
  const { curPage, totRecords, limit } = pagination
  const totPages = Math.ceil(totRecords / limit)

  const canGoBackward = curPage > 1
  const canGoForward = curPage < totPages

  const handleChangePage = page => {
    changePage(page)
  }

  return (
    <nav aria-label="..." className="float-left">
      <ul className="pagination">
        <li className={`page-item ${canGoBackward ? '' : 'disabled'}`}>
          <button className="page-link" onClick={() => handleChangePage(1)}>
            {'<<'}
          </button>
        </li>
        <li className={`page-item ${canGoBackward ? '' : 'disabled'}`}>
          <button className="page-link" onClick={() => handleChangePage(curPage - 1)}>
            {'<'}
          </button>
        </li>
        <li className="page-item disabled">
          <button className="page-link" >
            {`Página ${curPage} de ${totPages}`}
          </button>
        </li>
        <li className={`page-item ${canGoForward ? '' : 'disabled'}`}>
          <button className="page-link" onClick={() => handleChangePage(curPage + 1)}>
            {'>'}
          </button>
        </li>
        <li className={`page-item ${canGoForward ? '' : 'disabled'}`}>
          <button className="page-link" onClick={() => handleChangePage(totPages)}>
            {'>>'}
          </button>
        </li>
        <div className="m-1 ml-3">
          <p className="text-secondary">{`${totRecords} registros`}</p>
        </div>
      </ul >
    </nav >
  )
}

export default Pagination