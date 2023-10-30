import React, { useContext, useState, useEffect } from 'react'
import { TodosContext } from './App'
import { Table, Form, Button } from 'react-bootstrap'
import useAPI from './useAPI'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';


function ToDoList(){
    const {state, dispatch} = useContext(TodosContext); 

    const [todoText, setTodoText] = useState("")    

    const endpoint = "http://localhost:3000/todos/"
    
    const savedTodos = useAPI(endpoint)

    useEffect(() => {
        dispatch({type: "get", payload: savedTodos})
        // eslint-disable-next-line
    }, [savedTodos])

    const handleSubmit = async event => {
        event.preventDefault();
        const newToDo = {id: uuidv4(), text: todoText}
        await axios.post(endpoint, newToDo)
        dispatch({type: 'add', payload: newToDo})        
        setTodoText("")
    }
      
    return(
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">                
                    <Form.Control 
                        type="text" 
                        placeholder="Enter To Do" 
                        onChange={event => setTodoText(event.target.value)}
                        value={todoText}
                    />
                </Form.Group> 
                <Button variant="primary" type="submit">Add</Button>
            </Form>

            <Table striped bordered hover>
            <thead>
                <tr>                
                <th>To Do</th>
                <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {state.todos.map(todo =>(
                    <tr key={todo.id}>                        
                        <td>{todo.text}</td>
                        <td onClick={async () => {                            
                            await axios.delete(endpoint + todo.id)                           
                            dispatch({type:'delete', payload:todo})
                        }}>
                            <Button variant="link">Delete</Button>
                        </td>
                    </tr>
                ))}                
            </tbody>
            </Table>            
        </div>
    )
}

export default ToDoList;
