

function TodoList() {

    const todoList = [
    { id: 1, title: "Learn JavaScript" },
    { id: 2, title: "Learn React" },
    { id: 3, title: "Build a Todo List" }
  ];

    return (  
    
    <ul>
      {todoList.map(todo => <li key={todo.id}>{todo.title}</li>)}
    </ul>
    
    );
}

export default TodoList
