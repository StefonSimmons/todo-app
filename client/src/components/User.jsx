import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'

import './User.css'

export default function User({ formData, login, register, setFormData }) {

  const [tab, updateTab] = useState(true)

  return (
    <div className="register-login-main">
      <div className="user-tabs">
        <h1 id={tab ? 'small' : null} onClick={() => updateTab(true)}>Register</h1>
        <h1 id={!tab ? 'small' : null} onClick={() => updateTab(false)}>Login</h1>
      </div>
      { tab ?
        <Register
          register={register}
          formData={formData}
          setFormData={setFormData}
        />
        :
        <Login
          login={login}
        />
      }
    </div>
  )
}
