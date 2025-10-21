"use client";
import { useState } from "react";
import { useTodos } from "@/store/todos";

const Todos = () => {
  const {
    todos,
    toggleTodoCompleted,
    handleDeleteTodo,
    deleteAllTodos,
    deleteAtOnce,
  } = useTodos();

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="max-w-xl mx-auto mt-10 p-5 bg-gray-50 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-5 text-center text-gray-800">
        My Todos 
      </h1>

      <div className="flex justify-center gap-3 mb-5">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Completed
        </button>
        <button
          onClick={deleteAtOnce}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          DeletAtOnce
        </button>
      </div>

      <div className="flex justify-center mb-5">
        <button
          onClick={deleteAllTodos}
          className="bg-red-500 text-white px-5 py-2 rounded-2xl hover:bg-red-600 transition"
        >
          Delete All Completed
        </button>
      </div>

      <ul className="space-y-3">
        {filteredTodos.map((todo, index) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
          >
            <span>{index + 1}</span>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id={`todo-${todo.id}`}
                checked={todo.completed}
                onChange={() => toggleTodoCompleted(todo.id)}
                className="w-5 h-5"
              />
              <label
                htmlFor={`todo-${todo.id}`}
                className={`font-medium ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.task}
              </label>
            </div>

            {todo.completed && (
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="text-red-500 font-semibold hover:text-red-700"
              >
                Delete
              </button>
            )}
          </li>
        ))}
        {filteredTodos.length === 0 && (
          <li className="text-center text-gray-500 py-3">No todos here!</li>
        )}
      </ul>
    </div>
  );
};

export default Todos;
