import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import Nav from './components/Nav'
import Routes from './components/Routes'

import { todoBaseURL, usersBaseURL, config } from './services/index'
import { api } from './services/apiConfig'

import './App.css'
import MobileMenu from './components/MobileMenu'

function App() {

  const [myTasks, updateMyTasks] = useState([])
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

  const [mobileMenu, showMobileMenu] = useState(false)

  // ============================================
  //      API CALLS TO AIRTABLE AND EXPRESS
  // ============================================

  // GET REQUEST - Todo
  const getToDoData = async () => {
    const email = currentUser.fields && currentUser.fields.email
    const res = await axios.get(`${todoBaseURL}?filterByFormula=FIND(%22${email}%22%2C+%7Bemail%7D)`, config)
    updateMyTasks(res.data.records)
    const todoTasks = res.data.records.filter(todo => !todo.fields.complete)
    const prioritizedTasks = todoTasks.sort((a, b) => b.fields.priority - a.fields.priority)
    const completedTasks = res.data.records.filter(todo => todo.fields.complete)

    updateTodos(prioritizedTasks)
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

  // PUT REQUEST - Todo ITEMS (ALL) Reprioritized
  const updatePriorities = async (records) => {
    await axios.put(todoBaseURL, { records }, config)
    triggerRefresh(!refresh)
  }

  // ======= R E G I S T E R =========
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

  // ======= L O G I N =========
  // GET REQUEST - Find One User &
  // POST REQUEST - User Login
  const login = async (loginCred) => {

    const email = loginCred.email
    const res = await axios.get(`${usersBaseURL}?filterByFormula=FIND(%22${email}%22%2C+%7Bemail%7D)`, config)
    const user = res.data.records[0]

    // verifies the password typed in is the same as the password_digest
    if (user) {
      const password_digest = user.fields.password

      const loginAuth = {
        email,
        password: loginCred.password,
        password_digest
      }

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

  // ======= V E R I F Y =========
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

      // gets user data from the email signature / token
      const resp = await axios.get(`${usersBaseURL}?filterByFormula=FIND(%22${email}%22%2C+%7Bemail%7D)`, config)
      const user = resp.data.records[0]

      setCurrUser(user)
      triggerRefresh(!refresh)
    }
  }

  // ======= L O G O U T =========
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
        mobileMenu={mobileMenu}
        showMobileMenu={showMobileMenu}
      />

      <Routes
        currentUser={currentUser}
        todos={todos}
        updateTodos={updateTodos}
        updateToDoItem={updateToDoItem}
        deleteToDoItem={deleteToDoItem}
        updatePriorities={updatePriorities}
        myTasks={myTasks}
        postToDoData={postToDoData}
        login={login}
        register={register}
        unauthorized={unauthorized}
        formData={registrationCred}
        setFormData={setRegCred}
        completed={completed}
      />
      <MobileMenu
        mobileMenu={mobileMenu}
        currentUser={currentUser}
        logout={logout}
        completed={completed}
      />
    </div>
  );
}

export default App;
