import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import CompletionModal from './CompletionModal'
import DeletionModal from './DeletionModal'
import TodoItems from './TodoItems'

import './TodoList.css'

export default function TodoList(props) {

  const redirect = !props.currentUser.fields && !localStorage.getItem('token') && <Redirect to='/register-login' />

  const [formData, setFormData] = useState()
  const [deletionItemID, setDeletionItemID] = useState(null)
  const [completionItemID, setCompletionItemID] = useState(null)

  const [moving, updateMove] = useState(false)
  const [task, holdTask] = useState({})
  const [draggedIDX, setDragged] = useState(false)
  const [readyToSave, setReadyToSave] = useState(false)
  const [saved, setSaved] = useState(false)

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

  return (
    <div className="todo-list-main">
      {redirect}
      <section className="todo-list-back">
        <h1 className="todo-list-title">Will-Do LIST</h1>
        <button className={`todo-list-save ${readyToSave && 'save-me'} `}
          onClick={() => {
            setPriority()
            setReadyToSave(false)
            setSaved(true)
            setTimeout(() => setSaved(false), 1000)
          }}>SAVE NEW ORDER
        </button>
        {props.todos.length ?
          <div>
            {props.todos.map((item, idx) => {
              return (
                <TodoItems
                  item={item}
                  idx={idx}
                  setFormData={setFormData}
                  saved={saved}
                  onDrag={onDrag}
                  onDragOver={onDragOver}
                  draggedIDX={draggedIDX}
                  setDragged={setDragged}
                  setReadyToSave={setReadyToSave}
                  setDeletionItemID={setDeletionItemID}
                  setCompletionItemID={setCompletionItemID}
                  currentUser={props.currentUser}
                  gifs={props.gifs}
                  setGif={props.setGif}
                />
              )
            })}
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

