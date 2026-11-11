import { useRef, useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel.jsx';
import { isValidTodoTitle } from '../utils/todoValidation.js';

function TodoForm({ onAddTodo }) {

  const [workingTodoTitle, setWorkingTodoTitle] = useState('');

  const inputRef = useRef(null);

  const handleTitleChange = (event) => {
    setWorkingTodoTitle(event.target.value);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();

    const todoTitle = workingTodoTitle.trim();
    if (todoTitle) {
      onAddTodo(todoTitle);
      setWorkingTodoTitle('');
      inputRef.current.focus();
      
    
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        ref={inputRef}
        elementId="todoTitle"
        labelText="Todo"
        name="todoTitle"
        placeholder="Todo text"
        required
        value={workingTodoTitle}
        onChange={handleTitleChange}
      />
      <button type="submit" disabled={!isValidTodoTitle(workingTodoTitle)}>
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;