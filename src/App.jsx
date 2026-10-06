import './App.css'

function App() {

  const todoList = [
    { id: 1, title: "Learn JavaScript" },
    { id: 2, title: "Learn React" },
    { id: 3, title: "Build a Todo List" }
  ];

  return (
    <div>
     <h1>Todo List</h1>
    <ul>
      {todoList.map(todo => <li key={todo.id}>{todo.title}</li>)}
    </ul>
    </div>
  )
}

export default App
