import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Pet from './Pet'
import Confirm from '../Confirm'
import Pagination from '../Pagination'
import Loading from '../Loading'
import { getPets, deletePet } from '../../services/pets'

const Pets = () => {
  const [filter, setFilter] = useState('')

  const paginationDefault = {
    curPage: 1,
    totRecords: 0,
    limit: 10,
    filter
  }

  const [pets, setPets] = useState({ rows: [] })
  const [showConfirm, setShowConfirm] = useState(false)
  const [selected, setSelected] = useState({})
  const [redirect, setRedirect] = useState('')
  const [pagination, setPagination] = useState(paginationDefault)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    updateState()
  }, [pagination])

  const updateState = () => {
    setLoading(true)
    const pag = pagination
    getPets(pagination)
      .then(pets => {
        pag.totRecords = pets.count
        setPagination(pag)
        setPets(pets)
        setLoading(false)
      })
  }

  const changePage = page => {
    setPagination({ ...pagination, curPage: page })
  }

  const handleDelete = pet => {
    setSelected(pet)
    setShowConfirm(true)
  }

  const confirmDelete = () => {
    deletePet(selected)
      .then(() => getPets(pagination)
        .then(pets => {
          setPets(pets)
          setShowConfirm(false)
        })
      )
  }

  const handleEdit = pet => {
    setRedirect(`./edit-paciente/${pet.id}`)
  }

  const handleRestore = () => {
    setRedirect('/restaurar/pacientes')
  }

  const handleChange = e => {
    setFilter(e.target.value)
  }

  const handleClick = (e) => {
    e.preventDefault()
    setPagination({ ...pagination, filter })
  }


  const { rows } = pets
  const totPages = Math.ceil(pagination.totRecords / pagination.limit)

  if (loading) return <Loading />

  return (
    <>
      {showConfirm &&
        <Confirm
          title="Eliminando paciente"
          question={`Desea eliminar paciente ${selected.name}?`}
          okButton="Eliminar"
          cancelButton="Cancelar"
          cancelDelete={() => setShowConfirm(false)}
          confirmDelete={() => confirmDelete()}
        />
      }
      {redirect && <Redirect to={redirect} />}
      <div className="container-fluid">
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col" style={{ width: '150px' }}>Nombre</th>
              <th scope="col" style={{ width: '250px' }}>Cliente</th>
              <th scope="col" style={{ width: '150px' }}>Tipo</th>
              <th scope="col" style={{ width: '200px' }}>Raza</th>
              <th scope="col" style={{ width: '100px' }}>Sexo</th>
              <th scope="col" >Observaciones</th>
              <th scope="col" colSpan="2"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((record, index) =>
              <Pet
                key={index}
                indice={index + 1}
                data={record}
                deletePet={() => handleDelete(record)}
                editPet={() => handleEdit(record)}
              />
            )}
          </tbody>
        </table>
        <div className="row">
          <div className="col-4">
            <form className="form-inline">
              <input
                className="form-control mr-sm-2"
                type="search"
                aria-label="Search"
                onChange={e => handleChange(e)}
              />
              <button
                className="btn btn-warning"
                onClick={e => handleClick(e)}
              >Buscar</button>
            </form>
          </div>
          <div className="col-4">
            {totPages > 1 && <Pagination pagination={pagination} changePage={changePage} />}
          </div>
          <div className="col-4">
            <div className="float-right">
              <button
                className="btn btn-outline-secondary"
                onClick={() => handleRestore()}
              >
                Restaurar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Pets