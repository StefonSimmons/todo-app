import { useEffect, useState } from 'react'
import { Route, Link, useHistory } from 'react-router-dom'
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
  const history = useHistory()

  // GET REQUEST
  const getToDoData = async () => {
    console.log('2: ', currentUser)
    const email = currentUser.fields && currentUser.fields.email
    console.log('2b: ', email)
    const res = await axios.get(`${todoBaseURL}?filterByFormula=FIND(%22${email}%22%2C+%7Bemail%7D)`, config)
    updateTodos(res.data.records)
    console.log('2c: ', res)
  }

  // POST REQUEST - Todo
  const postToDoData = async (formData) => {
    console.log(formData)
    await axios.post(todoBaseURL, { fields: formData }, config)
    triggerRefresh(!refresh)
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
    // gets user data from the email
    const res = await axios.get(`${usersBaseURL}?filterByFormula=FIND(%22${email}%22%2C+%7Bemail%7D)`, config)
    const user = res.data.records[0]
    const password_digest = user.fields.password

    const loginAuth = {
      email,
      password: loginCred.password,
      password_digest
    }
    // verifies the password typed in is the same as the password_digest
    const resp = await api.post('/sign-in', { loginAuth })

    if (resp.data.user) {
      setCurrUser(user)
      triggerRefresh(!refresh)
      history.push('/')
    }
  }

  // GET REQUEST - Verify User (Auth) //
  //needed so that when we 
  const verifyUser = async () => {
    const token = localStorage.getItem('token')

    if (token) {
      const header = {
        headers: { 'Authorization': `Bearer ${token}` }
      }
      // verifies user email/id from token
      const res = await api.get('/verify', header)
      const email = res.data

      // gets user data from the email
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
  }, [refresh])


  useEffect(() => {
    verifyUser()
  }, [])

  return (
    <div>
      <nav className="nav-container">
        <Link to='/'>List</Link>
        <Link to="/add-todo">New Item</Link>
        {currentUser.fields ?
          <>
            <Link to="/register-login" onClick={logout}>Logout</Link>
            <h1>Hi, {currentUser.fields.username}</h1>
          </>
          :
          <Link to="/register-login">Register / Login</Link>
        }
      </nav>
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
          formData={registrationCred}
          setFormData={setRegCred}
        />
      </Route>

    </div>
  );
}

export default App;
