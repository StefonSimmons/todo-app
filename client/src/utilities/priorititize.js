export const onDragOver = (e, item, updateTodos, todos, task, updateMove, moving, setDragged) => {
  e.preventDefault()
  updateTodos(prevTodos => {
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
  setDragged(todos.indexOf(task))
}

export const setPriority = (todos, updatePriorities) => {
  const priorities = todos.map((item, idx, arr) => {
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
  updatePriorities(priorities)
}