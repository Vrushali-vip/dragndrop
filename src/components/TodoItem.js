import React from "react";

const TodoItem = ({ todo }) => {
  return (
    <div className="todo-card">
      <h3>{todo.title}</h3>
    </div>
  );
};

export default TodoItem;
