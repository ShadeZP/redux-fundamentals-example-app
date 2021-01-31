import React from 'react'
import TodoListItem from './TodoListItem'
import {useSelector} from 'react-redux'

const selectTodos = state => state.todos.map(todo => todo.id)

const TodoList = () => {
  const todoIds = useSelector(selectTodos)

  const renderedListItems = todoIds.map((id) => {
    return <TodoListItem key={id} id={id}/>
  })

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList
