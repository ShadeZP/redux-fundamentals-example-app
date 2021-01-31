export const addTodo = (todoText) => ({type: 'todos/todoAdded', payload: todoText})
export const toggleTodo = (todoId) => ({type: 'todos/todoToggled', payload: todoId})
export const selectColor = (todoId, color) => ({type: 'todos/colorSelected', payload: {todoId, color}});
export const deleteTodo = (todoId) =>  ({type: 'todos/todoDeleted', payload: todoId})
export const completeAllTodo = () =>  ({type: 'todos/allCompleted'})
export const clearCompleteTodo =  () =>  ({type: 'todos/completedCleared'})
export const changeStatusFilter = (filterValue) =>  ({type: 'filters/statusFilterChanged', payload: filterValue})
export const changeColorFilter = (color, changeType) => ({type: 'filters/colorFilterChanged', payload: {color, changeType}})