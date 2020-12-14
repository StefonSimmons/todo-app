import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import CompletionModal from './CompletionModal'
import DeletionModal from './DeletionModal'
import OptionsModal from './OptionsModal'
import TodoItems from './TodoItems'

import { setPriority } from '../utilities/priorititize'

import './TodoList.css'

export default function TodoList(props) {

  const redirect = !props.currentUser.fields && !localStorage.getItem('token') && <Redirect to='/register-login' />

  const [formData, setFormData] = useState()
  const [deletionItemID, setDeletionItemID] = useState(null)
  const [completionItemID, setCompletionItemID] = useState(null)
  const [moreOptionsItemID, showMoreOptions] = useState(null)

  const [draggedIDX, setDragged] = useState(false)
  const [readyToSave, setReadyToSave] = useState(false)
  const [saved, setSaved] = useState(false)

  const [task, holdTask] = useState({})

  const onDrag = (e, item) => {
    e.preventDefault()
    holdTask(item)
  }

  return (
    <div className="todo-list-main">
      {redirect}
      <section className="todo-list-back">
        <h1 className="todo-list-title">Will-Do LIST</h1>
        <button className={`todo-list-save ${readyToSave && 'save-me'} `}
          onClick={() => {
            setPriority(props.todos, props.updatePriorities)
            setReadyToSave(false)
            setSaved(true)
            setTimeout(() => setSaved(false), 1000)
          }}>SAVE NEW ORDER
        </button>
        {props.todos.length ?
          <div>
            {props.todos.map((item, idx) => {
              return (
                <React.Fragment key={idx}>
                  <TodoItems
                    item={item}
                    idx={idx}
                    setFormData={setFormData}
                    saved={saved}
                    updateTodos={props.updateTodos}
                    todos={props.todos}
                    task={task}
                    onDrag={onDrag}
                    draggedIDX={draggedIDX}
                    setDragged={setDragged}
                    setReadyToSave={setReadyToSave}
                    setDeletionItemID={setDeletionItemID}
                    setCompletionItemID={setCompletionItemID}
                    showMoreOptions={showMoreOptions}
                    currentUser={props.currentUser}
                    gifs={props.gifs}
                    setGif={props.setGif}
                  />
                </React.Fragment>
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
      {
        moreOptionsItemID &&
        <OptionsModal
          setDeletionItemID={setDeletionItemID}
          showMoreOptions={showMoreOptions}
          moreOptionsItemID={moreOptionsItemID}
        />
      }

    </div>
  )
}

