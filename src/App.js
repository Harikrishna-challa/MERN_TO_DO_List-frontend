import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Fetch Todos
  useEffect(() => {
    axios
      .get("http://localhost:5000/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("❌ Error fetching todos:", err));
  }, []);

  // Add Todo
  const addTodo = () => {
    if (!newTodo.trim()) return;
    axios
      .post("http://localhost:5000/todos", { text: newTodo })
      .then((res) => {
        setTodos([...todos, res.data]);
        setNewTodo("");
      })
      .catch((err) => console.error("❌ Error adding todo:", err));
  };

  // Delete Todo
  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/todos/${id}`)
      .then(() => setTodos(todos.filter((todo) => todo._id !== id)))
      .catch((err) => console.error("❌ Error deleting todo:", err));
  };

  return (
    <div className="todo-container">
      <h2>📝 To-Do List</h2>
      <input
        className="todo-input"
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter a task..."
      />
      <button className="add-btn" onClick={addTodo}>
        Add Task
      </button>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className="todo-item">
            {todo.text}
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;