import React from 'react'
import { useHistory } from 'react-router-dom'

import "./Register.css"

export default function Register({ register, formData, setFormData }) {

  const history = useHistory()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    register()
    setFormData({
      email: '',
      username: '',
      password: ''
    })
    history.push('/add-todo')
  }
  return (
    <div className="register-main">

      <form className="register-form" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="register-title">Register</h1>
        <input
          className="register-input"
          type="text"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange(e)}
          placeholder="email"
        />
        <input
          className="register-input"
          type="text"
          name="username"
          value={formData.username}
          onChange={(e) => handleChange(e)}
          placeholder="username"
        />
        <input
          className="register-input password"
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) => handleChange(e)}
          placeholder="password"
        />
        <input className="register-btn" type="submit" value="Register" />
      </form>
    </div>
  )
}
