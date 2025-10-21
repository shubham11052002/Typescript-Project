"use client";

import { createContext, ReactNode, useContext, useState } from "react";

export type Todo = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
};
export type TodoContext = {
  todos: Todo[];
  handleAddTodo: (task: string) => void;
  toggleTodoCompleted: (id: string) => void;
  handleDeleteTodo: (id: string) => void;
  deleteAllTodos: () => void;
  deleteAtOnce: () => void;
};

export const todosContext = createContext<TodoContext | null>(null);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (task: string) => {
    setTodos((prev) => {
      const newTodos: Todo[] = [
        {
          id: Math.random().toString(),
          task,
          completed: false,
          createdAt: new Date(),
        },
        ...prev,
      ];
      return newTodos;
    });
  };

  const toggleTodoCompleted = (id: string) => {
    setTodos((prev) => {
      const newTodos = prev.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      return newTodos;
    });
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const deleteAllTodos = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const deleteAtOnce = () => {
    alert("Are you for deleteAllTodos...");
    setTodos([]);
  };

  return (
    <todosContext.Provider
      value={{
        todos,
        handleAddTodo,
        toggleTodoCompleted,
        handleDeleteTodo,
        deleteAllTodos,
        deleteAtOnce,
      }}
    >
      {children}
    </todosContext.Provider>
  );
};

// api
export function useTodos() {
  const todosContextValue = useContext(todosContext);
  if (!todosContextValue) {
    throw new Error("usetodos used outside of provider");
  }
  return todosContextValue;
}
