import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DeleteModal from './DeleteModal'

import './TodoList.css'
import deleteIcon from '../images/delete.png'

export default function TodoList(props) {

  const [itemID, setItemID] = useState(null)

  const items = props.todos.map(item => {
    return (
      <div key={item.id} className="todo-list-item">
        <li>{item.fields.name}</li>
        <section className="todo-list-options">
          <Link to={`/items/${item.id}`} className="todo-list-link">Details</Link>
          <img
            src={deleteIcon} alt="delete"
            className="todo-list-delete"
            onClick={() => {
              const randoIdx = Math.floor(Math.random() * props.gifs.length)
              props.setGif(props.gifs[randoIdx])
              setItemID(item.id)
            }}
          />
        </section>
      </div>
    )
  })

  return (
    <div className="todo-list-main">

      <section className="todo-list-back">
        <h1 className="todo-list-title">TO-DO LIST</h1>
        { props.todos.length ?
          <ol>
            {items}
          </ol>
          :
          <Link to='/add-todo'>Nothing Here Yet</Link>
        }
      </section>

      { itemID &&
        <DeleteModal
          gif={props.gif}
          setItemID={setItemID}
          itemID={itemID}
          deleteToDoItem={props.deleteToDoItem}
          triggerRefresh={props.triggerRefresh}
          refresh={props.refresh}
        />
      }

    </div>
  )
}
