import { createContext, useReducer,useState, useEffect } from "react";
import reducer, { ACTIONS } from "../reducer-context/reducer";
import {v4 as uuid} from 'uuid'


export const TodoContext = createContext(reducer)


const getInitialData = () => {
  const data = JSON.parse(localStorage.getItem('todos'));
  return data && data.todos ? data : { todos: [] };
};

 export default function TodoProvider({children}){
    const [state, dispatch] = useReducer(reducer, getInitialData());
    const [filter, setFilter] = useState('all')

    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(state));
    }, [state]);

    const applyFilter = () => {
      switch (filter) {
        case 'active':
          return state.todos.filter((todo) => !todo.status);
        case 'completed':
          return state.todos.filter((todo) => todo.status);
        default:
          return state.todos;
      }
    };

  const addTodo = (todoText) => {
    dispatch({
        type: ACTIONS.ADD_TODO,
        payload: {
          id: uuid(),
          name: todoText,
          status: false,
        },
      });
  };

  const deleteTodo = (todoId) => {
    dispatch({
      type: ACTIONS.DELETE_TODO,
      payload: {
        id: todoId
      }
    })
  }
  const deleteAllTodo = () => {
    dispatch({
      type: ACTIONS.DELETE_ALL_TODO,
    
    })
  }

  const toggleTodo = (todoId) => {
    dispatch({
      type: ACTIONS.TOGGLE_TODO_STATUS,
      payload:{
        id: todoId
      }
    })
  }
  const toggleAllTodo = () => {
    dispatch({
      type: ACTIONS.TOGGLE_ALL_STATUS,
    })
  }

const editTodo = (todoId, todoText) => {
  dispatch({
    type: ACTIONS.EDIT_TODO,
    payload:{
      id: todoId,
      name: todoText
    }
  })
}

  const clearTodo = () => {
    dispatch({
      type: ACTIONS.CLEAR_COMPLETED
    })
  }


    

  return(
        <TodoContext.Provider value={{ deleteAllTodo, state, addTodo, deleteTodo,toggleAllTodo, toggleTodo, editTodo, clearTodo, filter, setFilter, filteredTodos: applyFilter()}}>
            {children}
        </TodoContext.Provider>
  )

}