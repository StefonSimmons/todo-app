import { useEffect, useState } from 'react'
import { Route, Link } from 'react-router-dom'
import axios from 'axios'

import { todoBaseURL, usersBaseURL, config } from './services/index'
import { api } from './services/apiConfig'

import { gifs } from './data/gifImages'

import './App.css'

import TodoList from './components/TodoList'
import TodoDetails from './components/TodoDetails'
import AddTodo from './components/AddTodo'
import Register from './components/Register'


function App() {

  const [gif, setGif] = useState('')
  const [todos, updateTodos] = useState([])
  const [refresh, triggerRefresh] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  })

  // GET REQUEST
  const getToDoData = async () => {
    const res = await axios.get(todoBaseURL, config)
    updateTodos(res.data.records)
  }

  // POST REQUEST - Todo
  const postToDoData = async (formData) => {
    await axios.post(todoBaseURL, { fields: formData }, config)
  }

  // DELETE REQUEST 
  const deleteToDoItem = async (itemID) => {
    await axios.delete(`${todoBaseURL}/${itemID}`, config)
  }

  // PUT REQUEST
  const updateToDoItem = async (itemID, fields) => {
    await axios.put(`${todoBaseURL}/${itemID}`, { fields }, config)
  }

  // POST REQUEST - User Registration
  const register = async () => {
    const res = await api.post('/users', { formData })
    const password_digest = res.data
    const fields = {
      email: formData.email,
      username: formData.username,
      password: password_digest
    }
    await axios.post(usersBaseURL, { fields }, config)
  }

  useEffect(() => {
    getToDoData()
  }, [refresh])


  return (
    <div>
      <nav className="nav-container">
        <Link to='/'>Home</Link>
        <Link to="/add-todo">New Item</Link>
        <Link to="/register">Register</Link>
      </nav>

      <Route exact path="/">
        <TodoList
          todos={todos}
          deleteToDoItem={deleteToDoItem}
          triggerRefresh={triggerRefresh}
          refresh={refresh}
          gif={gif}
          setGif={setGif}
          gifs={gifs}
        />
      </Route>

      <Route path="/items/:itemID">
        <TodoDetails
          todos={todos}
          updateToDoItem={updateToDoItem}
          triggerRefresh={triggerRefresh}
          refresh={refresh}
        />
      </Route>

      <Route path="/add-todo">
        <AddTodo
          postToDoData={postToDoData}
          triggerRefresh={triggerRefresh}
          refresh={refresh}
        />
      </Route>

      <Route path="/register">
        <Register
          register={register}
          formData={formData}
          setFormData={setFormData}
        />
      </Route>

    </div>
  );
}

export default App;
