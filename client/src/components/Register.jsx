import React from 'react'


export default function Register({ register, formData, setFormData }) {

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }


  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={(e) => {
        e.preventDefault()
        register()
        setFormData({
          email: '',
          username: '',
          password: ''
        })
      }
      }>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange(e)}
          placeholder="email"
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={(e) => handleChange(e)}
          placeholder="username"
        />
        <input
          type="text"
          name="password"
          value={formData.password}
          onChange={(e) => handleChange(e)}
          placeholder="password"
        />
        <input type="submit" value="Register" />
      </form>
    </div>
  )
}
