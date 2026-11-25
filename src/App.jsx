
import './App.css';
import { useState } from 'react';
import TodosPage from './features/Todos/TodosPage.jsx';
import Logon from './features/Logon.jsx';

function App() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  return (
    <div>
      <h1>Todo List</h1>

      {token ? (
        <TodosPage token={token} />
      ) : (
        <Logon
          onSetEmail={setEmail}
          onSetToken={setToken}
        />
      )}
    </div>
  );
}

export default App;
