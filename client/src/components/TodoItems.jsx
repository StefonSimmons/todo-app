import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import HoverPopOver from './HoverPopOver'

import { onDragOver } from '../utilities/priorititize'

import deleteIcon from '../images/delete-blk.png'
import moreOptions from '../images/more-options-blk.png'
import './TodoItems.css'

export default function TodoItems({
  item, idx, setFormData, saved, draggedIDX, setDragged, onDrag, task, updateTodos, todos, setReadyToSave,
  setDeletionItemID, setCompletionItemID,showMoreOptions, gifs, setGif, currentUser
}) {

  const [moving, updateMove] = useState(false)
  const [popOver, togglePopOver] = useState(false)


  return (
    <div
      key={item.id}
      className={`todo-item 
        ${draggedIDX === idx && 'dragged-item'}
        ${saved && 'saved'}
        `}
      value={item.fields.name}
      draggable
      onDrag={(e) => onDrag(e, item)}
      onDragOver={(e) => onDragOver(e, item, updateTodos, todos, task, updateMove, moving, setDragged)}
      onDrop={() => {
        setTimeout(() => setDragged(false), 1000)
        setTimeout(() => setReadyToSave(true), 500)
      }}
    >
      <section className="todo-item-idx-wrapper">
        <span>{`${idx + 1}.`}</span>
        <h4>{item.fields.name}</h4>
      </section>
      <section className="todo-item-options">
        <img src={moreOptions} alt="more"
          className="todo-item-more"
          onClick={() => showMoreOptions(item.id)}
        />
        <Link to={`/items/${item.id}`} className="todo-item-link">Details</Link>
        <img
          src={deleteIcon} alt="delete"
          className="todo-item-delete"
          onClick={() => setDeletionItemID(item.id)}
        />
        <input
          id="complete"
          type="checkbox"
          value={item.id}
          onMouseOver={(e) => togglePopOver(e.target.value)}
          onMouseLeave={() => togglePopOver(false)}
          onClick={(e) => {
            if (e.target.checked) {
              const randoIdx = Math.floor(Math.random() * gifs.length)
              setGif(gifs[randoIdx])
              setCompletionItemID(item.id)
              setFormData({
                name: item.fields.name,
                description: item.fields.description,
                priority: 0,
                email: [currentUser.id],
                complete: true
              })
            }
          }}
        />
        {popOver === item.id && <HoverPopOver />}
      </section>
    </div>
  )
}
