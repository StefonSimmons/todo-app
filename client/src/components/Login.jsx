import React, { useState } from 'react'

export default function Login({ login, triggerRefresh, refresh }) {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login(formData)
    setFormData({
      email: '',
      password: ''
    })
  }

  return (

    <form className="register-form" onSubmit={(e) => handleSubmit(e)}>
      <h1 className="register-title">Login</h1>
      <input
        className="register-input"
        type="text"
        name="email"
        value={formData.email}
        onChange={(e) => handleChange(e)}
        placeholder="email"
      />
      <input
        className="register-input password"
        type="password"
        name="password"
        value={formData.password}
        onChange={(e) => handleChange(e)}
        placeholder="password"
      />
      <input className="register-btn" type="submit" value="Login" />
    </form>
  )
}
