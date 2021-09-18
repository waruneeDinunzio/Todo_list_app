import React, { useState, useRef, useEffect }from 'react';
import TodoList from './components/TodosList';
import { nanoid } from 'nanoid';
import './App.css'
const LOCAL_STORAGE_KEY = 'todoApp.todos'
function App() {
  const key = nanoid()
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos)setTodos(storedTodos)
  }, [])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])
  
  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if(name === '') return
    console.log(name)
    setTodos(prevTodos => {
      return [...prevTodos, {id: key, name:name, complete: false}]
      
    })
    console.log(todos.id)
    // set value to empty the input box

    todoNameRef.current.value = null
  }
  return(
    <>
      <TodoList index= {todos.id} todos = {todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Complete</button>
      <div>{todos.filter(todo=> !todo.complete).length} left to do</div>
    </>
  )
}

export default App;