import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './TodoList.css'
import deleteIcon from '../images/delete.png'
import closeIcon from '../images/clear.png'

export default function TodoList(props) {
  const gifs = ['https://media.giphy.com/media/26u4lOMA8JKSnL9Uk/giphy.gif',
    'https://media.giphy.com/media/py2UYwTIX5SXm/giphy.gif',
    'https://media.giphy.com/media/l0Iyl55kTeh71nTXy/giphy.gif',
    'https://media.giphy.com/media/8JW82ndaYfmNoYAekM/giphy.gif',
    'https://media.giphy.com/media/3o7qDEq2bMbcbPRQ2c/giphy.gif',
    'https://media.giphy.com/media/8UF0EXzsc0Ckg/giphy.gif',
    'https://media.giphy.com/media/d2Z4rTi11c9LRita/giphy.gif',
    'https://media.giphy.com/media/Rk8wCrJCrjRJ2MyLrb/giphy.gif'
  ]
  const [gif, setGif] = useState('')
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
              const randoIdx = Math.floor(Math.random() * gifs.length)
              setGif(gifs[randoIdx])
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
        <h1 className="todo-list-title">TO DO LIST</h1>

        <ol>
          {items}
        </ol>
      </section>
      { itemID &&
        <section className="delete-modal-back">
          <div>
            <span onClick={() => setItemID(null)}>
              <img src={closeIcon} alt="close" className="delete-modal-close" />
            </span>
            <section className="delete-modal-content">
              <h5 className="delete-modal-text">Nice! So, you did the thing!?</h5>
              <img src={gif} alt="done" className="delete-modal-gif" />
              <button
                className="delete-modal-btn"
                onClick={() => {
                  props.deleteToDoItem(itemID)
                  props.triggerRefresh(!props.refresh)
                  setItemID(null)
                }}>YES!</button>
            </section>
          </div>
        </section>
      }
    </div>
  )
}

