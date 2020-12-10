import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import "./AddTodo.css"

export default function AddTodo(props) {

  const history = useHistory()

  const [formData, setFormData] = useState({
    name: "",
    description: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = () => {
    props.postToDoData(formData)
    history.push('/') // goes home
    props.triggerRefresh(!props.refresh)
  }


  return (
    <div className="main">
      <section className="create-form-back">
        <h2 className="create-title">Add A New To-Do Item</h2>
        <form onSubmit={handleSubmit} className="create-form">
          <input
            className="create-input"
            type="text"
            placeholder="Todo Name"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange(e)}
          />
          <input
            className="create-input"
            type="text"
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={(e) => handleChange(e)}
          />
          <input className="create-btn" type="submit" value="Submit" />
        </form>
      </section>
    </div>
  )
}
