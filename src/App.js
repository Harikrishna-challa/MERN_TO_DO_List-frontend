import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// ✅ Define your backend URL here
const API_URL = "https://mern-to-do-list-backend.onrender.com/todos";  // Update this with your actual backend URL

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // ✅ Fetch Todos from Backend
  useEffect(() => {
    axios
      .get(API_URL)   // Use backend URL
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("❌ Error fetching todos:", err));
  }, []);

  // ✅ Add a new Todo
  const addTodo = () => {
    if (!newTodo.trim()) return;
    axios
      .post(API_URL, { text: newTodo })   // Use backend URL
      .then((res) => {
        setTodos([...todos, res.data]);
        setNewTodo("");
      })
      .catch((err) => console.error("❌ Error adding todo:", err));
  };

  // ✅ Delete a Todo
  const deleteTodo = (id) => {
    axios
      .delete(`${API_URL}/${id}`)   // Use backend URL
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
