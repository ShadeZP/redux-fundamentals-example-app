import React from 'react'
import TodoListItem from './TodoListItem'
import {useSelector} from 'react-redux'
import {selectFilteredTodoIds} from "./todosSlice";


const TodoList = () => {
  const todoIds = useSelector(selectFilteredTodoIds)
  const loadingStatus = useSelector(state => state.todos.status)
  if (loadingStatus === 'loading') {
    return (
      <div className="todo-list">
        <div className="loader" />
      </div>
    )
  }
  const renderedListItems = todoIds.map((id) => {
    return <TodoListItem key={id} id={id}/>
  })

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList
