
import { useState, useEffect } from 'react';
import TodoList from './TodoList/TodoList.jsx';
import TodoForm from './TodoForm.jsx';

function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState('');
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);

  // Fetch existing todos when the user logs in
  useEffect(function () {
    async function fetchTodos() {
      setIsTodoListLoading(true);
      setError('');

      try {
        const response = await fetch('/api/tasks?page=0&limit=99', {
          headers: {
            'X-CSRF-TOKEN': token,
          },
          credentials: 'include',
        });

        if (response.status === 401) {
          throw new Error('Unauthorized. Please log in again.');
        }

        if (!response.ok) {
          throw new Error('Failed to fetch todos.');
        }

        const data = await response.json();
        setTodoList(data.tasks);

      } catch (error) {
        setError(error.message);

      } finally {
        setIsTodoListLoading(false);
      }
    }

    if (token) {
      fetchTodos();
    }
  }, [token]);

  // Add a new todo
  async function addTodo(todoTitle) {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };

    setTodoList(function (previousTodos) {
      return [newTodo, ...previousTodos];
    });

    setError('');

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({
          title: todoTitle,
          isCompleted: false,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Failed to add todo.');
      }

      const savedTodo = data.task || data.todo || data;

      setTodoList(function (previousTodos) {
        return previousTodos.map(function (todo) {
          return todo.id === newTodo.id ? savedTodo : todo;
        });
      });

    } catch (error) {
      setTodoList(function (previousTodos) {
        return previousTodos.filter(function (todo) {
          return todo.id !== newTodo.id;
        });
      });

      setError(error.message);
    }
  }

  // Complete an existing todo
  async function completeTodo(id) {
    const originalTodo = todoList.find(function (todo) {
      return todo.id === id;
    });

    if (!originalTodo) {
      return;
    }

    setTodoList(function (previousTodos) {
      return previousTodos.map(function (todo) {
        return todo.id === id
          ? { ...todo, isCompleted: true }
          : todo;
      });
    });

    setError('');

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({
          isCompleted: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to complete todo.');
      }

    } catch (error) {
      setTodoList(function (previousTodos) {
        return previousTodos.map(function (todo) {
          return todo.id === id ? originalTodo : todo;
        });
      });

      setError(error.message);
    }
  }

  // Update an existing todo
  async function updateTodo(editedTodo) {
    const originalTodo = todoList.find(function (todo) {
      return todo.id === editedTodo.id;
    });

    if (!originalTodo) {
      return;
    }

    setTodoList(function (previousTodos) {
      return previousTodos.map(function (todo) {
        return todo.id === editedTodo.id ? editedTodo : todo;
      });
    });

    setError('');

    try {
      const response = await fetch(`/api/tasks/${editedTodo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({
          title: editedTodo.title,
          isCompleted: editedTodo.isCompleted,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo.');
      }

    } catch (error) {
      setTodoList(function (previousTodos) {
        return previousTodos.map(function (todo) {
          return todo.id === editedTodo.id ? originalTodo : todo;
        });
      });

      setError(error.message);
    }
  }

  return (
    <div>
      {error && (
        <div>
          <p>{error}</p>
          <button type="button" onClick={function () {
            setError('');
          }}>
            Clear Error
          </button>
        </div>
      )}

      {isTodoListLoading && <p>Loading todos...</p>}

      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      />

      <TodoForm onAddTodo={addTodo} />
    </div>
  );
}

export default TodosPage;
