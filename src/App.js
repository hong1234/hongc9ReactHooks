import React, { useReducer} from 'react';
import ToDoList from './ToDoList'

function todosReducer(state, action){ 
  switch(action.type){     
    case 'get':     
      return {...state,todos:action.payload}    
    case 'add':      
      const addedToDos = [...state.todos,action.payload]
      return {...state,todos:addedToDos}
    case 'delete':
      const filteredTodoState = state.todos.filter( todo => todo.id !== action.payload.id)
      return {...state, todos: filteredTodoState}      
    default:
      return todosInitialState
  }
}

const todosInitialState = { 
  todos:[]
};

export const TodosContext = React.createContext()

function App (){
  const [state, dispatch] = useReducer(todosReducer,todosInitialState)

  return (
    <TodosContext.Provider value={{state,dispatch}}>      
      <ToDoList />
    </TodosContext.Provider>    
  )
}

export default App;
