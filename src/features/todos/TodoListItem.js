import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {ReactComponent as TimesSolid} from './times-solid.svg'

import {availableColors, capitalize} from '../filters/colors'
import {selectColor, toggleTodo} from "../../actions";
import {selectTodos} from "./todosSlice";

const selectById = (state, todoId) => {
  return selectTodos(state).find(todo => todo.id === todoId)
}

const TodoListItem = ({id}) => {
  const todo = useSelector(state => selectById(state, id))
  const {text, completed, color} = todo

  const dispatch = useDispatch()

  const handleCompletedChanged = () => {
    dispatch(toggleTodo(id))
  }

  const handleColorChanged = (e) => {
    const color = e.target.value
    dispatch(selectColor(todo.id, color))
  }

  const colorOptions = availableColors.map((c) => (
    <option key={c} value={c}>
      {capitalize(c)}
    </option>
  ))

  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChanged}
          />
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment buttons">
          <select
            className="colorPicker"
            value={color}
            style={{color}}
            onChange={handleColorChanged}
          >
            <option value=""></option>
            {colorOptions}
          </select>
          <button className="destroy">
            <TimesSolid/>
          </button>
        </div>
      </div>
    </li>
  )
}

export default TodoListItem
