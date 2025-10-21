"use client";
import { FormEvent, useState } from "react";
import { useTodos } from "@/store/todos";

const TodoAdd = () => {
  const [todo, setTodo] = useState("");
  const { handleAddTodo } = useTodos();
  const [error, setError] = useState<string>();
  const handleFSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todo.trim()) {
      setError("Todo cannot be empty!"); 
      return;
    }

    handleAddTodo(todo);
    setTodo("");
  };
  const handleInputChange = (value: string) => {
    setTodo(value);
    if (value.trim()) setError("");
  };

  return (
    <div className="mt-5 flex justify-center">
      <form onSubmit={handleFSubmit}>
        <input
          type="text"
          placeholder="Enter your todo"
          className="border p-2 bg-white rounded-xl"
          value={todo}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <button
          type="submit"
          className="bg-amber-600 border rounded-xl block p-2 pr-10 pl-10 ml-10 mt-2 border-none hover:bg-amber-500 transition all 0.3s"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default TodoAdd;
