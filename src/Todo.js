import React from "react";

function Todo({ todo, onDelete }) {
  return (
    <li>
      {todo.text}
      <button onClick={() => onDelete(todo._id)}>Delete</button>
    </li>
  );
}

export default Todo;
