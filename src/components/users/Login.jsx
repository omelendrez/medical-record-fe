import React, { useState } from 'react'
import { login } from '../../services/users'
import { saveUser } from '../../helpers'

function Login() {
  const user = {
    name: '',
    password: ''
  }
  const [form, setForm] = useState(user)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    e.preventDefault()
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handlelogin = (e) => {
    e.preventDefault()
    setError('')
    login(form)
      .then((u) => {
        saveUser(u)
        window.location.href = '/'
      })
      .catch((err) => setError(err.response.data.error))
  }

  return (
    <div className="container">
      <form>
        <div className="row">
          <div className="col" />
          <div className="col-12 col-sm-8 col-md-6 col-lg-4 mt-5 p-5 card">
            <h3>Login</h3>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Usuario
                <input
                  className="form-control"
                  type="text"
                  autoComplete="new-password"
                  id="name"
                  onChange={(e) => handleChange(e)}
                  value={form.name}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
                <input
                  className="form-control"
                  type="password"
                  autoComplete="new-password"
                  id="password"
                  onChange={(e) => handleChange(e)}
                  value={form.password}
                />
              </label>
            </div>
            <button
              className="btn btn-primary"
              type="button"
              onClick={(e) => handlelogin(e)}
            >
              Login
            </button>
            {error.length > 0 && (
              <div className="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}
          </div>
          <div className="col" />
        </div>
      </form>
    </div>
  )
}

export default Login
