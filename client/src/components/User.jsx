import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'

import './User.css'

export default function User({ formData, login, register, setFormData, triggerRefresh, refresh }) {

  const [tab, updateTab] = useState(true)

  return (
    <div className="register-login-main">
      <div className="user-tabs">
        <h1 onClick={() => updateTab(true)}>Register</h1>
        <h1 onClick={() => updateTab(false)}>Login</h1>
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
          triggerRefresh={triggerRefresh}
          refresh={refresh}
        />
      }
    </div>
  )
}
