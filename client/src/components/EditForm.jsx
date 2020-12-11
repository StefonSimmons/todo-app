import React, { useEffect, useState } from 'react'

export default function EditForm(props) {

  const [fields, setFields] = useState({})

  useEffect(() => {
    if (props.todoItem) {
      setFields({
        name: props.todoItem.fields.name,
        description: props.todoItem.fields.description,
        email: [props.currentUser.id]
      })
    }
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
    <form onSubmit={() => {
      props.updateToDoItem(props.itemID, fields)
      props.showEditForm(false)
      props.triggerRefresh(!props.refresh)
    }
    }>
      <input
        className="todo-details-name"
        name="name"
        value={fields.name}
        onChange={(e) => handleChange(e)}
      />
      <h5>Description:</h5>
      <input
        className="todo-details-description"
        name="description"
        value={fields.description}
        onChange={(e) => handleChange(e)}
      />
      <input type="submit" value="submit"/>
    </form>
  )
}
