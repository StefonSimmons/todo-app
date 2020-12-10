import { useEffect, useState } from 'react'
import { Route, Link } from 'react-router-dom'
import axios from 'axios'

import { baseURL, config } from './services/index'

import './App.css'

import TodoList from './components/TodoList'
import TodoDetails from './components/TodoDetails'
import AddTodo from './components/AddTodo'


function App() {

  const [todos, updateTodos] = useState([])
  const [refresh, triggerRefresh] = useState(false)

  // GET REQUEST
  const getToDoData = async () => {
    const res = await axios.get(baseURL, config)
    updateTodos(res.data.records)
  }

  // POST REQUEST
  const postToDoData = async (formData) => {
    await axios.post(baseURL, { fields: formData }, config)
  }

  // DELETE REQUEST 
  const deleteToDoItem = async (itemID) => {
    await axios.delete(`${baseURL}/${itemID}`, config)

  }

  useEffect(() => {
    getToDoData()
  }, [refresh])


  return (
    <div>
      <nav className="nav-container">
        <Link to='/'>Home</Link>
        <Link to="/add-todo">Add To-Do</Link>
      </nav>
      {/* <hr /> */}

      <Route exact path="/">
        <TodoList
          todos={todos}
          deleteToDoItem={deleteToDoItem}
          triggerRefresh={triggerRefresh}
          refresh={refresh}
        />
      </Route>

      <Route path="/items/:itemID">
        <TodoDetails todos={todos} />
      </Route>

      <Route path="/add-todo">
        <AddTodo
          postToDoData={postToDoData}
          triggerRefresh={triggerRefresh}
          refresh={refresh}
        />
      </Route>


    </div>
  );
}

export default App;
