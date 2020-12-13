import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import CompletionModal from './CompletionModal'
import DeletionModal from './DeletionModal'
import HoverPopOver from './HoverPopOver'

import './TodoList.css'
import deleteIcon from '../images/delete-blk.png'

export default function TodoList(props) {

  const redirect = !props.currentUser.fields && !localStorage.getItem('token') && <Redirect to='/register-login' />

  const [formData, setFormData] = useState()
  const [deletionItemID, setDeletionItemID] = useState(null)
  const [completionItemID, setCompletionItemID] = useState(null)
  const [popOver, togglePopOver] = useState(false)

  const [moving, updateMove] = useState(false)
  const [task, holdTask] = useState({})
  const [draggedIDX, setDragged] = useState(false)
  const [readyToSave, setReady] = useState(false)

  const onDrag = (e, item) => {
    e.preventDefault()
    holdTask(item)
  }

  const onDragOver = (e, item) => {
    e.preventDefault()

    props.updateTodos(prevTodos => {
      if (prevTodos.indexOf(item) < prevTodos.indexOf(task)) {
        prevTodos.splice(prevTodos.indexOf(item), 0, task)
        prevTodos.splice(prevTodos.lastIndexOf(task), 1)
      } else {
        prevTodos.splice(prevTodos.indexOf(item) + 1, 0, task)
        prevTodos.splice(prevTodos.indexOf(task), 1)
      }
      return prevTodos
    })
    updateMove(!moving)
    setDragged(props.todos.indexOf(task))
  }

  const setPriority = () => {
    const priorities = props.todos.map((item, idx, arr) => {
      const record = {
        id: item.id,
        fields: {
          name: item.fields.name,
          description: item.fields.description,
          email: [item.fields.email[0]],
          complete: false,
          priority: arr.length - idx
        }
      }
      return record
    })
    props.updatePriorities(priorities)
  }

  const items = props.todos.map((item, idx) => {
    return (
      <div
        key={item.id}
        className={`todo-list-item ${draggedIDX === idx && 'dragged-item'}`}
        value={item.fields.name}
        draggable
        onDrag={(e) => onDrag(e, item)}
        onDragOver={(e) => onDragOver(e, item)}
        onDrop={() => {
          setTimeout(() => setDragged(false), 1000)
          setTimeout(() => setReady(true), 500)
        }}
      >
        <section className="todo-list-idx-wrapper">
          <span>{`${idx + 1}.`}</span>
          <h4>{item.fields.name}</h4>
        </section>
        <section className="todo-list-options">
          <Link to={`/items/${item.id}`} className="todo-list-link">Details</Link>
          <img
            src={deleteIcon} alt="delete"
            className="todo-list-delete"
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
                const randoIdx = Math.floor(Math.random() * props.gifs.length)
                props.setGif(props.gifs[randoIdx])
                setCompletionItemID(item.id)
                setFormData({
                  name: item.fields.name,
                  description: item.fields.description,
                  priority: 0,
                  email: [props.currentUser.id],
                  complete: true
                })
              }
            }}
          />
          {popOver === item.id && <HoverPopOver />}
        </section>
      </div>
    )
  })

  return (
    <div className="todo-list-main">
      {redirect}
      <section className="todo-list-back">
        <h1 className="todo-list-title">Will-Do LIST</h1>
        <button className={`todo-list-save ${readyToSave && 'save-me'} `}
          onClick={() => {
            setPriority()
            setReady(false)
          }}>SAVE NEW ORDER
        </button>
        {props.todos.length ?
          <div>
            {items}
          </div>
          :
          <>
            <h4>Nothing Here Yet</h4>
            <Link to='/add-todo'>Let's Get to Work</Link>
          </>
        }
      </section>

      { completionItemID &&
        <CompletionModal
          gif={props.gif}
          setCompletionItemID={setCompletionItemID}
          completionItemID={completionItemID}
          updateToDoItem={props.updateToDoItem}
          formData={formData}
        />
      }
      { deletionItemID &&
        <DeletionModal
          setDeletionItemID={setDeletionItemID}
          deletionItemID={deletionItemID}
          deleteToDoItem={props.deleteToDoItem}
        />
      }

    </div>
  )
}

