import {client} from "../../api/client";
import {addTodo, todosLoading} from "../../actions";
import {createSelector} from 'reselect'
import {StatusFilters} from "../filters/filtersSlice";

const initialState = {
  status: 'idle',
  entities: []
}

function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
  return maxId + 1
}

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'todos/todoAdded': {
      return {
        ...state,
        entities: [...state.entities, action.payload]
      }
    }
    case 'todos/todoToggled': {
      return {
        ...state,
        entities: state.map((todo) => {
          if (todo.id !== action.payload) {
            return todo
          }
          return {
            ...todo,
            completed: !todo.completed,
          }
        })
      }
    }
    case
    'todos/colorSelected': {
      const {color, todoId} = action.payload
      return state.map((todo) => {
        if (todo.id !== todoId) {
          return todo
        }
        return {
          ...todo,
          color,
        }
      })
    }
    case 'todos/todoDeleted': {
      return state.filter((todo) => todo.id !== action.payload)
    }
    case
    'todos/allCompleted': {
      return state.map((todo) => {
        return {...todo, completed: true}
      })
    }
    case
    'todos/completedCleared': {
      return state.filter((todo) => !todo.completed)
    }
    case 'todos/todosLoading': {
      return {
        ...state,
        status: 'loading'
      }
    }
    case
    'todos/todosLoaded': {
      return {
        ...state,
        status: 'idle',
        entities: action.payload
      }
    }
    default:
      return state
  }
}

export const fetchTodos = () => async (dispatch, getState) => {
  dispatch(todosLoading())
  const response = await client.get('/fakeApi/todos')
  dispatch({type: 'todos/todosLoaded', payload: response.todos})
}

export function saveNewTodo(text) {
  return async function saveNewTodoThunk(dispatch, getState) {
    const initialTodo = {text};
    const response = await client.post('/fakeApi/todos', {todo: initialTodo})
    dispatch(addTodo(response.todo))
  }
}

export const selectTodos = state => state.todos.entities

export const selectTodoIds = createSelector(
  state => state.todos,
  todos => todos.map(todo => todo.id)
)

export const selectFilteredTodos = createSelector(
  selectTodos,
  state => state.filters,

  (todos, filters) => {
    const {status, colors} = filters
    const showAllCompletions = status === StatusFilters.All
    if (showAllCompletions && colors.length === 0) {
      return todos
    }

    const completedStatus = status === StatusFilters.Completed
    return todos.filter(todo => {
      const statusMatches = showAllCompletions || todo.completed === completedStatus
      const colorMatches = colors.length === 0 || colors.includes(todo.color)
      return statusMatches && colorMatches
    })
  },
)

export const selectFilteredTodoIds = createSelector(
  selectFilteredTodos,
  filteredTodos => filteredTodos.map(todo => todo.id)
)
