import { useEffect, useState } from 'react'
import { Route, useHistory } from 'react-router-dom'
import axios from 'axios'

import { todoBaseURL, usersBaseURL, config } from './services/index'
import { api } from './services/apiConfig'

import { gifs } from './data/gifImages'

import './App.css'

import TodoList from './components/TodoList'
import TodoDetails from './components/TodoDetails'
import AddTodo from './components/AddTodo'
import User from './components/User'
import Nav from './components/Nav'
import CompletedList from './components/CompletedList'


function App() {

  const [gif, setGif] = useState('')
  const [todos, updateTodos] = useState([])
  const [completed, updateCompleted] = useState([])
  const [refresh, triggerRefresh] = useState(false)
  const [registrationCred, setRegCred] = useState({
    email: '',
    username: '',
    password: ''
  })
  const [currentUser, setCurrUser] = useState({ fields: null })
  const [unauthorized, setUnauthorized] = useState(false)
  const history = useHistory()


  // GET REQUEST - Todo
  const getToDoData = async () => {
    const email = currentUser.fields && currentUser.fields.email
    const res = await axios.get(`${todoBaseURL}?filterByFormula=FIND(%22${email}%22%2C+%7Bemail%7D)`, config)
    const todoTasks = res.data.records.filter(todo => !todo.fields.complete)
    const completedTasks = res.data.records.filter(todo => todo.fields.complete)
    console.log(todoTasks)
    updateTodos(todoTasks)
    updateCompleted(completedTasks)
  }

  // POST REQUEST - Todo
  const postToDoData = async (fields) => {
    await axios.post(todoBaseURL, { fields }, config)
    triggerRefresh(!refresh)
  }

  // DELETE REQUEST - Todo
  const deleteToDoItem = async (itemID) => {
    await axios.delete(`${todoBaseURL}/${itemID}`, config)
    triggerRefresh(!refresh)
  }

  // PUT REQUEST - Todo
  const updateToDoItem = async (itemID, fields) => {
    await axios.put(`${todoBaseURL}/${itemID}`, { fields }, config)
    triggerRefresh(!refresh)
  }

  // POST REQUEST - Password Digest & 
  // POST REQUEST - User Registration
  const register = async () => {
    const res = await api.post('/users', { registrationCred })
    const password_digest = res.data.password_digest
    localStorage.setItem('token', res.data.token)

    const fields = {
      email: registrationCred.email,
      username: registrationCred.username,
      password: password_digest
    }
    const resp = await axios.post(usersBaseURL, { fields }, config)

    setCurrUser(resp.data)
    triggerRefresh(!refresh)
    history.push('/add-todo')
  }

  // GET REQUEST - Find One User &
  // POST REQUEST - User Login
  const login = async (loginCred) => {

    const email = loginCred.email
    // gets user data from the email in airtable
    const res = await axios.get(`${usersBaseURL}?filterByFormula=FIND(%22${email}%22%2C+%7Bemail%7D)`, config)
    const user = res.data.records[0]

    if (user) {
      const password_digest = user.fields.password

      const loginAuth = {
        email,
        password: loginCred.password,
        password_digest
      }

      // verifies the password typed in is the same as the password_digest
      const resp = await api.post('/sign-in', { loginAuth })
      if (resp.data.user) {
        setUnauthorized(false)
        localStorage.setItem('token', resp.data.token)
        setCurrUser(user)
        triggerRefresh(!refresh)
        history.push('/')
      } else {
        setUnauthorized(true)
      }

    } else {
      setUnauthorized(true)
    }

  }

  // GET REQUEST - Verify User (Auth) //
  const verifyUser = async () => {
    const token = localStorage.getItem('token')

    if (token) {
      const header = {
        headers: { 'Authorization': `Bearer ${token}` }
      }
      // verifies decoded token from localStorage 
      // is the same as user email who signed-in / registered
      const res = await api.get('/verify', header)
      const email = res.data

      // gets user data from the email signature
      const resp = await axios.get(`${usersBaseURL}?filterByFormula=FIND(%22${email}%22%2C+%7Bemail%7D)`, config)
      const user = resp.data.records[0]

      setCurrUser(user)
      triggerRefresh(!refresh)
    }
  }

  // LOGOUT
  const logout = () => {
    localStorage.removeItem('token')
    setCurrUser({})
    triggerRefresh(!refresh)
  }


  useEffect(() => {
    getToDoData()
    // eslint-disable-next-line
  }, [refresh])


  useEffect(() => {
    verifyUser()
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <Nav
        currentUser={currentUser}
        logout={logout}
        completed={completed}
      />

      <Route exact path="/">
        <TodoList
          currentUser={currentUser}
          todos={todos}
          updateToDoItem={updateToDoItem}
          deleteToDoItem={deleteToDoItem}
          gif={gif}
          setGif={setGif}
          gifs={gifs}
        />
      </Route>

      <Route path="/items/:itemID">
        <TodoDetails
          currentUser={currentUser}
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
        />
      </Route>

      <Route path="/register-login">
        <User
          login={login}
          register={register}
          unauthorized={unauthorized}
          formData={registrationCred}
          setFormData={setRegCred}
        />
      </Route>

      <Route path="/completed-tasks">
        <CompletedList completed={completed} />
      </Route>

    </div>
  );
}

export default App;
