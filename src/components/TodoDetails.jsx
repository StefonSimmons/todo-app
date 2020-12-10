import React from 'react'
import { useParams } from 'react-router-dom'

import './TodoDetails.css'

export default function TodoDetails(props) {

  const { itemID } = useParams()

  // console.log('detailssss ', props)
  // console.log(itemID)
  const todoItem = props.todos.find(item => item.id === itemID)

  // console.log(todoItem)
  return (
    <div className="todo-details-main">
      <section className="todo-details-back">
        <section className="todo-details">
          {todoItem &&
            <>
              <h6 className="todo-details-name">{todoItem.fields.name}</h6>
              <h5>Description:</h5>
              <p className="todo-details-description">{todoItem.fields.description}</p>
            </>
          }
        </section>
      </section>
    </div>
  )
}
