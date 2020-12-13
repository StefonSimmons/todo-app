import React, { useState } from 'react'

import eyeSee from '../images/eye-see.png'
import noSee from '../images/no-see.png'

import "./Register.css"

export default function Register({ register, formData, setFormData }) {

  const [visible, showPW] = useState(false)

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
  }
  return (

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
      <section className="register-pw-wrapper">
        <input
          className="register-input password"
          type={`${visible ? "text" : "password"}`}
          name="password"
          value={formData.password}
          onChange={(e) => handleChange(e)}
          placeholder="password"
        />
        {!visible ?
          <span onClick={() => showPW(true)}><img src={eyeSee} alt="password seen" /></span>
          :
          <span onClick={() => showPW(false)}><img src={noSee} alt="password hidden" /></span>
        }
      </section>
      <input className="register-btn" type="submit" value="Register" />
    </form>
  )
}
