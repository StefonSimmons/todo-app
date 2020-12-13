import React, { useState } from 'react'
import { Route } from 'react-router-dom'

import TodoList from './TodoList'
import TodoDetails from './TodoDetails'
import AddTodo from './AddTodo'
import User from './User'
import CompletedList from './CompletedList'

import { gifs } from '../data/gifImages'

export default function Routes({
  currentUser, todos, updateTodos, updateToDoItem, deleteToDoItem, updatePriorities,
  myTasks, postToDoData, login, register, unauthorized, formData, setFormData,
  completed
}) {

  const [gif, setGif] = useState('')

  return (
    <div>
      <Route exact path="/">
        <TodoList
          currentUser={currentUser}
          todos={todos}
          updateTodos={updateTodos}
          updateToDoItem={updateToDoItem}
          deleteToDoItem={deleteToDoItem}
          gif={gif}
          setGif={setGif}
          gifs={gifs}
          updatePriorities={updatePriorities}
        />
      </Route>

      <Route path="/items/:itemID">
        <TodoDetails
          currentUser={currentUser}
          myTasks={myTasks}
          updateToDoItem={updateToDoItem}
        />
      </Route>

      <Route path="/add-todo">
        <AddTodo
          currentUser={currentUser}
          todos={todos}
          postToDoData={postToDoData}
        />
      </Route>

      <Route path="/register-login">
        <User
          login={login}
          register={register}
          unauthorized={unauthorized}
          formData={formData}
          setFormData={setFormData}
        />
      </Route>

      <Route path="/completed-tasks">
        <CompletedList
          completed={completed}
          myTasks={myTasks}
          currentUser={currentUser}
          deleteToDoItem={deleteToDoItem}
          updateToDoItem={updateToDoItem}
          gif={gif}
          setGif={setGif}
          gifs={gifs}
        />
      </Route>
    </div>
  )
}
