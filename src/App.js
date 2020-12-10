import { useEffect, useState } from 'react'
import { Route, Link } from 'react-router-dom'
import axios from 'axios'

import { baseURL, config } from './services/index'

import './App.css'

import TodoList from './components/TodoList'
import TodoDetails from './components/TodoDetails'
import AddTodo from './components/AddTodo'


function App() {

  const gifs = ['https://media.giphy.com/media/26u4lOMA8JKSnL9Uk/giphy.gif',
    'https://media.giphy.com/media/py2UYwTIX5SXm/giphy.gif',
    'https://media.giphy.com/media/l0Iyl55kTeh71nTXy/giphy.gif',
    'https://media.giphy.com/media/8JW82ndaYfmNoYAekM/giphy.gif',
    'https://media.giphy.com/media/3o7qDEq2bMbcbPRQ2c/giphy.gif',
    'https://media.giphy.com/media/8UF0EXzsc0Ckg/giphy.gif',
    'https://media.giphy.com/media/d2Z4rTi11c9LRita/giphy.gif',
    'https://media.giphy.com/media/Rk8wCrJCrjRJ2MyLrb/giphy.gif'
  ]
  const [gif, setGif] = useState('')
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

  // PUT REQUEST
  const updateToDoItem = async (itemID, fields) => {
    await axios.put(`${baseURL}/${itemID}`, { fields }, config)
  }

  useEffect(() => {
    getToDoData()
  }, [refresh])


  return (
    <div>
      <nav className="nav-container">
        <Link to='/'>Home</Link>
        <Link to="/add-todo">New Item</Link>
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


    </div>
  );
}

export default App;
