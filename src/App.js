import React, { useState, useEffect } from 'react';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState(null);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await fetchTodos();
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    getTodos();
  }, []);

  const handleCreateTodo = async () => {
    if (newTodo.trim() === '') return;
    try {
      const response = await createTodo({ item: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleEditTodo = (id, item) => {
    setIsEditing(true);
    setCurrentTodoId(id);
    setNewTodo(item);
  };

  const handleUpdateTodo = async () => {
    if (newTodo.trim() === '') return;
    try {
      const response = await updateTodo(currentTodoId, { item: newTodo });
      const updatedTodos = todos.map((todo) =>
        todo.id === currentTodoId ? response.data : todo
      );
      setTodos(updatedTodos);
      setNewTodo('');
      setIsEditing(false);
      setCurrentTodoId(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };


  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={isEditing ? handleUpdateTodo : handleCreateTodo}>
        {isEditing ? 'Update Todo' : 'Add Todo'}
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.attributes.item}
            <button onClick={() => handleEditTodo(todo.id, todo.attributes.item)}>Edit</button>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
