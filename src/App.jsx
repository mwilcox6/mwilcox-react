import './App.css'
import TodoList from './TodoList.jsx';
import TodoForm from './TodoForm.jsx';
import { useState } from 'react';

function App() {

  const [todoList, setTodoList] = useState([]);

  function addTodo(todoTitle) {
 
  const newTodo = {
    id: Date.now(),
    title: todoTitle,
    isCompleted: false  
  }

  setTodoList(previous => [newTodo, ...previous]);

};

function completeTodo(id) {

const updatedTodoList = todoList.map(todo =>

todo.id === id ?

{ ...todo, isCompleted: true } : todo

);

setTodoList(updatedTodoList);

}

  return (

    <div>
     <h1>Todo List</h1>

     <TodoList todoList={todoList} 
      onCompleteTodo={completeTodo}
     />


     <TodoForm onAddTodo={addTodo} />

    </div>
  );

}



export default App
