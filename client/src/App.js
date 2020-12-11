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
import User from './components/User'


function App() {

  const [gif, setGif] = useState('')
  const [todos, updateTodos] = useState([])
  const [refresh, triggerRefresh] = useState(false)
  const [registrationCred, setRegCred] = useState({
    email: '',
    username: '',
    password: ''
  })
  const [currentUser, setCurrUser] = useState({})

  // GET REQUEST
  const getToDoData = async () => {
    const email = currentUser.fields && currentUser.fields.email
    const res = await axios.get(`${todoBaseURL}?filterByFormula=FIND(%22${email}%22%2C+%7Bemail%7D)`, config)
    updateTodos(res.data.records)
    console.log(res)
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

  // POST REQUEST - Password Digest & 
  // POST REQUEST - User Registration
  const register = async () => {
    const res = await api.post('/users', { registrationCred })
    const password_digest = res.data
    const fields = {
      email: registrationCred.email,
      username: registrationCred.username,
      password: password_digest
    }
    await axios.post(usersBaseURL, { fields }, config)
  }

  // GET REQUEST - Find One User &
  // POST REQUEST - User Login
  const login = async (loginCred) => {
    const email = loginCred.email
    const res = await axios.get(`${usersBaseURL}?filterByFormula=FIND(%22${email}%22%2C+%7Bemail%7D)`, config)
    const password_digest = res.data.records[0].fields.password
    const loginAuth = {
      email: loginCred.email,
      password: loginCred.password,
      password_digest
    }
    const authorized = await api.post('/sign-in', { loginAuth })
    const user = res.data.records[0]
    if (authorized.data.user) setCurrUser(user)
  }

  useEffect(() => {
    getToDoData()
    console.log('heeeerre')
  }, [refresh])


  return (
    <div>
      <nav className="nav-container">
        <Link to='/'>List</Link>
        <Link to="/add-todo">New Item</Link>
        <Link to="/register-login">Register / Login</Link>
        {currentUser.fields && <h1>{currentUser.fields.username}</h1>}
      </nav>
      {console.log(todos)}
      <Route exact path="/">
        <TodoList
          currentUser={currentUser}
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
          currentUser={currentUser}
          postToDoData={postToDoData}
          triggerRefresh={triggerRefresh}
          refresh={refresh}
        />
      </Route>

      <Route path="/register-login">
        <User
          login={login}
          register={register}
          formData={registrationCred}
          setFormData={setRegCred}
          triggerRefresh={triggerRefresh}
          refresh={refresh}
        />
      </Route>

    </div>
  );
}

export default App;
