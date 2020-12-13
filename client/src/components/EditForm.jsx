import React, { useEffect, useState } from 'react'

import './EditForm.css'

export default function EditForm(props) {

  const [fields, setFields] = useState({})

  useEffect(() => {
    if (props.myTask) {
      setFields({
        name: props.myTask.fields.name,
        description: props.myTask.fields.description,
        email: [props.currentUser.id]
      })
    }
    // eslint-disable-next-line
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    e.preventDefault()
    setFields({
      ...fields,
      [name]: value
    })
  }

  return (
    <form className="edit-form" onSubmit={() => {
      props.updateToDoItem(props.itemID, fields)
      props.showEditForm(false)
      props.triggerRefresh(!props.refresh)
    }
    }>
      <h1 className="edit-title">Edit Form</h1>
      <h5>Task:</h5>
      <textarea
        className="todo-details-name"
        name="name"
        value={fields.name}
        onChange={(e) => handleChange(e)}
      />
      <h5>Description:</h5>
      <textarea
        className="todo-details-description edit-description"
        name="description"
        value={fields.description}
        onChange={(e) => handleChange(e)}
      />
      <input className="edit-btn" type="submit" value="Submit" />
    </form>
  )
}
