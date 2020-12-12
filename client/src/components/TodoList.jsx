import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import CompletionModal from './CompletionModal'
import PopOver from './PopOver'

import './TodoList.css'
import deleteIcon from '../images/delete.png'

export default function TodoList(props) {

  const redirect = !props.currentUser.fields && !localStorage.getItem('token') && <Redirect to='/register-login' />

  const [itemID, setItemID] = useState(null)
  const [popOver, togglePopOver] = useState(false)

  const items = props.todos.map(item => {
    return (
      <div key={item.id} className="todo-list-item">
        <li>{item.fields.name}</li>
        <section className="todo-list-options">
          <Link to={`/items/${item.id}`} className="todo-list-link">Details</Link>
          <img
            src={deleteIcon} alt="delete"
            className="todo-list-delete"
            
          />
          <input
            id="complete"
            type="checkbox"
            onMouseOver={(e) => togglePopOver(e.target.value)}
            onMouseLeave={() => togglePopOver(false)}
            onClick={(e) => {
              if (e.target.checked) {
                const randoIdx = Math.floor(Math.random() * props.gifs.length)
                props.setGif(props.gifs[randoIdx])
                setItemID(item.id)
              }
            }}
            value={item.id}
          />
          {popOver === item.id && <PopOver/>}
        </section>
      </div>
    )
  })

  return (
    <div className="todo-list-main">
      {redirect}
      <section className="todo-list-back">
        <h1 className="todo-list-title">Will-Do LIST</h1>
        {props.todos.length ?
          <ol>
            {items}
          </ol>
          :
          <>
            <h4>Nothing Here Yet</h4>
            <Link to='/add-todo'>Let's Get to Work</Link>
          </>
        }
      </section>

      { itemID &&
        <CompletionModal
          gif={props.gif}
          setItemID={setItemID}
          itemID={itemID}
          deleteToDoItem={props.deleteToDoItem}
        />
      }

    </div>
  )
}

